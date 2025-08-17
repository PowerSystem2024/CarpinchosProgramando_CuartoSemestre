package src.main.java.UTN.presentacion;

import src.main.java.UTN.datos.EstudianteDao;
import UTN.dominio.Estudiante;
import java.util.Scanner;

public class SistemaEstudiantesApp {

    public static void main(String[] args) {
        var salir = false;
        var consola = new Scanner(System.in); // Para leer la información de la consola
        //Se crea una instancia de la clase servicio, esto lo hacemos fuera del ciclo
        var estudianteDao = new EstudianteDao(); // Instanciamos una vez
        while (!salir) {
            try {
                mostrarMenu(); //Este método muestra las opciones
                salir = ejecutarOpciones(consola, estudianteDao); //Este método arroja una excepción y devuelve un boolenao
            } catch (Exception e) {
                System.out.println("Ocurrió un error al ejecutar la operación: " + e.getMessage());
            }
        }
    }

    private static void mostrarMenu() {
        System.out.println("""
                               \n**********      Sistema de Estudiantes      **********
                               1. Listar estudiantes.
                               2. Buscar estudiantes.
                               3. Agregar estudiante.
                               4. Modificar estudiante.
                               5. Eliminar estudiante.
                               6. Salir
                               
                               Por favor, elija una opción del menú:
                               """);
    }

    private static boolean ejecutarOpciones(Scanner consola, EstudianteDao estudianteDao) {
        var opcion = Integer.parseInt(consola.nextLine());
        var salir = false;
        switch (opcion) {

            case 1 -> {  //Listar estudiantes
                System.out.println("Listado de Estudiantes: ");
                var estudiantes = estudianteDao.listarEstudiantes(); //Recibe el listado gracias al método listar.
                estudiantes.forEach(System.out::println); //iteramos con la funcion lambda.
            }

            case 2 -> {  //Buscar estudiante por Id
                System.out.println("Introduce el id del estudiante a buscar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine()); //Recibe el id por consola
                var estudiante = new Estudiante(idEstudiante); //Se guarda el estudiante en una instancia de Estudiante con el idEstudiante
                var encontrado = estudianteDao.buscarEstudiantePorId(estudiante); //Se declara encontrado que guarda el estudiante que trae el metodo buscarEstudiante.
                if (encontrado) {
                    System.out.println("Estudiante encontrado: " + estudiante); // Si se encuentra al estudiante, se lo muestra.
                } else {
                    System.out.println("No se pudo encontrar al estudiante: " + estudiante); // Sino, se informa que no se pudo encontrar
                }
            }

            case 3 -> {  //Agregar estudiante
                System.out.println("Agregar estudiante: ");
                System.out.println("Ingrese el nombre: "); //Solicitamos el usuario los datos del nuevo estudiante
                var nombre = consola.nextLine(); // Guardamos cada dato que ingresa por consola en una variable
                System.out.println("Ingrese el apellido: ");
                var apellido = consola.nextLine();
                System.out.println("Ingrese el telefono: ");
                var telefono = consola.nextLine();
                System.out.println("Ingrese el Email: ");
                var email = consola.nextLine();
                var estudiante = new Estudiante(nombre, apellido, telefono, email); //Instanciamos un objeto tipo estudiante y guardamos los datos ingresados por el usuario.
                var agregado = estudianteDao.agregarEstudiante(estudiante); //Por medio del método agregarEstudiante, agregamos el nuevo estudiante.
                if (agregado) {
                    System.out.println("Se agregó el nuevo estudiante: " + estudiante); // Si se agregó el estudiante, lo muestra
                } else {
                    System.out.println("No se pudo agregar el estudiante: " + estudiante);
                }
            }

            case 4 -> {  // Modificar Estudiante
                System.out.println("Modificar estudiante: ");
                System.out.println("Ingrese el id del estudiante a modificar: ");
                var IdEstudiante = Integer.parseInt(consola.nextLine());

                // Creamos el objeto con el id
                Estudiante aModificar = new Estudiante(IdEstudiante);

                var dao = new EstudianteDao(); // Instanciamos un EstudianteDao
                boolean encontrado = dao.buscarEstudiantePorId(aModificar); //Buscamos el estudiante del id ingresado y lo guardamos en encontrado.

                if (!encontrado) { //Si no se encontró el estudiante se informa.
                    System.out.println("Estudiante no encontrado.");
                    break;
                }

                System.out.println("""
                                   ¿Que dato quiere modificar?
                                   1. Nombre.
                                   2. Apellido.
                                   3. Teléfono.
                                   4. Email.
                                   5. Todos los datos.
                                   """); // Le consultamos al usuario que datos quiere modificar.

                var eleccion = Integer.parseInt(consola.nextLine());

                switch (eleccion) {
                    case 1 -> {
                        System.out.println("Ingrese el nuevo nombre: "); // Si solo quiere cambiar el nombre
                        aModificar.setNombre(consola.nextLine());
                    }
                    case 2 -> {
                        System.out.println("Ingrese el nuevo apellido: "); // Si solo quiere cambiar el apellido
                        aModificar.setApellido(consola.nextLine());
                    }
                    case 3 -> {
                        System.out.println("Ingrese el nuevo teléfono: "); // Si solo quiere cambiar el telefono
                        aModificar.setTelefono(consola.nextLine());
                    }
                    case 4 -> {
                        System.out.println("Ingrese el nuevo email: "); // Si solo quiere cambiar el email
                        aModificar.setEmail(consola.nextLine());
                    }
                    case 5 -> {
                        System.out.println("Ingrese el nuevo nombre: "); // Si quiere cambiar todos los datos.
                        aModificar.setNombre(consola.nextLine());
                        System.out.println("Ingrese el nuevo apellido: ");
                        aModificar.setApellido(consola.nextLine());
                        System.out.println("Ingrese el nuevo teléfono: ");
                        aModificar.setTelefono(consola.nextLine());
                        System.out.println("Ingrese el nuevo email: ");
                        aModificar.setEmail(consola.nextLine());
                    }
                    default ->
                        System.out.println("Opción no válida."); // Si ingresa una opcion que no está en el menú
                }

                boolean actualizado = dao.modificarEstudiante(aModificar); // Se guarda el estudiante con los datos actualizados.

                if (actualizado) {
                    System.out.println("Estudiante modificado correctamente.");
                } else {
                    System.out.println("Error al modificar el estudiante.");
                }
            }

            case 5 -> {  //Eliminar estudiante: ");
                System.out.println("Eliminar estudiante: ");
                System.out.println("Ingrese el id del estudiante: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var eliminado = estudianteDao.eliminarEstudiante(estudiante); // Se elimina el estudiante con el metodo eliminarEstudiante.
                if (eliminado) {
                    System.out.println("Estudiante eliminado: " + estudiante); // Si se pudo eliminar, se muestran los datos.
                } else {
                    System.out.println("No se pudo eliminar el estudiante: " + estudiante); //Si no, se informa.
                }
            }

            case 6 -> {  //Salir
                System.out.println("Programa finalizado. ¡Hasta pronto! ");
                salir = true; // Cambiamos la variable a true para salir del bucle. 
            }
            default -> {
                System.out.println("Opción errónea. Intente nuevamente: "); // Si se selecciona una opcion que no está en el menú.
            }
        }
        return salir;
    }
}
