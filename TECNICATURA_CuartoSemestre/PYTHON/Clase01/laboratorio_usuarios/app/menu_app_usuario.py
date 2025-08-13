from modelos.usuario import Usuario
from datos.usuario_dao import UsuarioDao
from utilidades.logger_base import logger
import os

def mostrar_menu():
    while True:
        print("\n--- Menú de Usuarios ---")
        print("1. Listar usuarios")
        print("2. Agregar usuario")
        print("3. Actualizar usuario")
        print("4. Eliminar usuario")
        print("5. Salir")

        opcion = input("\nSelecciona una opción: ")

        if opcion == '1':
            try:
                usuarios = UsuarioDao.seleccionar() # Revisa el archivo de datos que viene de la base de datos
                print("\n--- Usuarios ---")
                for usuario in usuarios: # Itera en cada usuario de la lista de usuarios
                    print(f"\n {usuario}") # Muestra el usuario en la consola
                logger.info("Usuarios listados correctamente") # Informa que los usuarios fueron listados correctamente
            except Exception as e:
                print("Error al listar usuarios:", e) # Si no puedo traer los datos lo informa
        elif opcion == '2':
            try:
                username = input("Ingrese el username: ") # Le pide al usuario que ingrese el username
                password = input("Ahora ingrese el password: ") # Ahora que ingrese la contraseña
                usuario = Usuario(username=username, password=password) # Se crea un objeto de tipo usuario con los datos ingresados
                UsuarioDao.insertar(usuario)  # Se agrega el usuario a la base de datos
                logger.info("Usuario agregado correctamente") # Informa que el usuario fue agregado correctamente
                print("Usuario agregado correctamente")
            except Exception as e:
                print("Error al agregar usuario:", e) # Si no puedo agregar el usuario lo informa
        elif opcion == '3':
            try:
                id_usuario_var = int(input("Ingrese el ID del usuario a actualizar: "))
                username_var = input("Ingrese el nombre del usuario a modificar: ")
                password_var = input("Ingrese la contraseña del usuario a modificar: ")
                usuario = Usuario(id_usuario=id_usuario_var, username=username_var, password=password_var) # Se crea un objeto de tipo usuario
                usuario_actualizado = UsuarioDao.actualizar(usuario) # Se actualiza el usuario por medio del metodo actualizar de usuarioDao
                logger.info(f"Usuario actualizado correctamente: {usuario_actualizado}") # Informa que el usuario fue actualizado correctamente
                print("Usuario actualizado correctamente")
            except Exception as e:
                print("Error al actualizar usuario:", e) # Si no puedo actualizar el usuario lo informa
                logger.info("Error al actualizar usuario:")
        elif opcion == '4':
            try:
                id_usuario_var = int(input("Ingrese el ID del usuario a eliminar: ")) # Se solicita al usuario el id del usuario a eliminar
                usuario = Usuario(id_usuario=id_usuario_var) # Se crea un objeto de tipo usuario con el id del usuario a eliminar
                usuario_eliminado = UsuarioDao.eliminar(usuario)  # Se elimina el usuario de la base de datos
                logger.info(f"Usuario eliminado correctamente {usuario_eliminado}") # Informa que el usuario fue eliminado correctamente
                print("Usuario eliminado ")
            except Exception as e:
                print("Error al eliminar usuario:", e) # Si no se pudo eliminar el usuario lo informa
        elif opcion == '5':
            logger.info("Saliendo...")
            print("Saliendo de la aplicación. Hasta pronto!")
            break
        else:
            try:
                logger.info("Opción inválida") # Si ingresa una opción que no es 1, 2, 3 o 4 lo informa con exception
                raise Exception(f"Opción inválida") # Si ingresa una opción que no es 1, 2, 3 o 4 lo informa con exception
            except Exception as e:
                print("Error al cerrar la aplicación.: {e}")
