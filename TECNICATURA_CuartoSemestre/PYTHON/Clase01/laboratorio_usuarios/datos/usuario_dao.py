from modelos.usuario import Usuario
from datos.cursor_del_pool import CursorDelPool
from utilidades.logger_base import logger

class UsuarioDao:
    _SELECCIONAR = 'SELECT id_usuario, username, password FROM usuario ORDER BY id_usuario'
    _INSERTAR = 'INSERT INTO usuario(username, password) VALUES (%s, %s)'
    _ACTUALIZAR = 'UPDATE usuario SET username=%s, password=%s WHERE id_usuario=%s'
    _ELIMINAR = 'DELETE FROM usuario WHERE id_usuario=%s'

    @classmethod
    def seleccionar(cls):
        with CursorDelPool() as cursor:
            cursor.execute(cls._SELECCIONAR)
            registros = cursor.fetchall()
            usuarios = [Usuario(*registro) for registro in registros]
            logger.debug(f"Usuarios seleccionados: {usuarios}")
            return usuarios

    @classmethod
    def insertar(cls, usuario):
        with CursorDelPool() as cursor:
            valores = (usuario.username, usuario.password)
            cursor.execute(cls._INSERTAR, valores)
            logger.debug(f"Usuario insertado: {usuario}")

    @classmethod
    def actualizar(cls, usuario):
        with CursorDelPool() as cursor:
            valores = (usuario.username, usuario.password, usuario.id_usuario)
            cursor.execute(cls._ACTUALIZAR, valores)
            logger.debug(f"Usuario actualizado: {usuario}")

    @classmethod
    def eliminar(cls, usuario):
        with CursorDelPool() as cursor:
            cursor.execute(cls._ELIMINAR, (usuario.id_usuario,))
            logger.debug(f"Usuario eliminado: {usuario}")