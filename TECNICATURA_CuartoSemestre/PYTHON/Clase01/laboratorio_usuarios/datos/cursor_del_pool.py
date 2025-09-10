from datos.conexion import Conexion
from utilidades.logger_base import logger

class CursorDelPool:
    def __enter__(self):
        self._conexion = Conexion.obtener_conexion()
        self._cursor = self._conexion.cursor()
        return self._cursor

    def __exit__(self, tipo_excepcion, valor_excepcion, traceback):
        if valor_excepcion:
            self._conexion.rollback()
            logger.error(f"Rollback por excepción: {tipo_excepcion, valor_excepcion, traceback}")
        else:
            self._conexion.commit()
            logger.debug("Commit exitoso.")
        self._cursor.close()
        Conexion.liberar_conexion(self._conexion)