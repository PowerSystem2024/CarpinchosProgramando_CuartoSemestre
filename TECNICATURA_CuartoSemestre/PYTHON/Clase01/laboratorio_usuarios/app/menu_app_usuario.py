from modelos.usuario import Usuario
from datos.usuario_dao import UsuarioDao
from utilidades.logger_base import logger

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
                
                usuarios = UsuarioDao.seleccionar()
                usuario_actual = next((u for u in usuarios if u.id_usuario == id_usuario_var), None)

                if not usuario_actual:
                    print("No se encontró el usuario con ese ID.")
                    return

                print("\n¿Qué desea modificar?")
                print("1. Username")
                print("2. Password")
                print("3. Ambos")
                opcion_modificacion = input("Seleccione una opción (1/2/3): ")

                username_var = None
                password_var = None

                if opcion_modificacion == '1':
                    username_var = input("Ingrese el nuevo nombre de usuario: ")
                elif opcion_modificacion == '2':
                    password_var = input("Ingrese la nueva contraseña: ")
                elif opcion_modificacion == '3':
                    username_var = input("Ingrese el nuevo nombre de usuario: ")
                    password_var = input("Ingrese la nueva contraseña: ")
                else:
                    print("Opción inválida. No se realizó ninguna modificación.")
                    return

                nuevo_username = username_var if username_var is not None else usuario_actual.username
                nuevo_password = password_var if password_var is not None else usuario_actual.password

                usuario = Usuario(id_usuario=id_usuario_var, username=nuevo_username, password=nuevo_password)
                usuario_actualizado = UsuarioDao.actualizar(usuario)

                logger.info(f"Usuario actualizado correctamente: {usuario_actualizado}")
                print("✅ Usuario actualizado correctamente")

            except Exception as e:
                print("❌ Error al actualizar usuario:", e)
                logger.error(f"Error al actualizar usuario: {e}")
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
                raise Exception("Opción inválida") # Si ingresa una opción que no es 1, 2, 3 o 4 lo informa
            except Exception as e:
                print("Error al seleccionar una opcion: {e}")