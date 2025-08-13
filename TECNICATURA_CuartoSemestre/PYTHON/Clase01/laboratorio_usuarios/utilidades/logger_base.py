import logging

# Configuración básica del logging
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s: %(levelname)s [%(filename)s:%(lineno)s] %(message)s",
    datefmt="%I:%M:%S %p",
    handlers=[
        logging.FileHandler("laboratorio_usuarios.log", encoding="utf-8"),
        logging.StreamHandler(),
    ],
)

# Creamos el logger para exportar
logger = logging.getLogger(__name__)

# Bloque de prueba opcional
if __name__ == "__main__":
    logger.debug("Prueba de mensaje de debug")
    logger.info("Prueba de mensaje de info")
    logger.warning("Prueba de mensaje de warning")
    logger.error("Prueba de mensaje de error")
    logger.critical("Prueba de mensaje de critical")
