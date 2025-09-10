import psycopg2
from psycopg2 import pool
from utilidades.logger_base import logger

class Conexion:
    _DATABASE = 'test_bd'
    _USERNAME = 'postgres'
    _PASSWORD = 'admin'
    _HOST = 'localhost'
    _PORT = '5432'
    _MIN_CON = 1
    _MAX_CON = 5
    _pool = None

    @classmethod
    def obtener_pool(cls):
        if cls._pool is None:
            try:
                cls._pool = pool.SimpleConnectionPool(
                    cls._MIN_CON, cls._MAX_CON,
                    database=cls._DATABASE,
                    user=cls._USERNAME,
                    password=cls._PASSWORD,
                    host=cls._HOST,
                    port=cls._PORT
                )
                logger.debug("Pool de conexiones creado exitosamente.")
            except Exception as e:
                logger.error(f"Error al crear el pool: {e}")
                raise
        return cls._pool

    @classmethod
    def obtener_conexion(cls):
        return cls.obtener_pool().getconn()

    @classmethod
    def liberar_conexion(cls, conexion):
        cls.obtener_pool().putconn(conexion)

    @classmethod
    def cerrar_conexiones(cls):
        cls.obtener_pool().closeall()