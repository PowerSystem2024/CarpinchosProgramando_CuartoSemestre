package UTN.presentacion;

import UTN.conexion.Conexion;
import UTN.datos.EstudianteDao;
import UTN.dominio.Estudiante;
import java.util.Scanner;


public class SistemaEstudianteApp {
    public static void main(String[] args) {
        var salir = false;
        var consola = new Scanner(System.in); //para leer info de la consola
        //creamos una instancia de la clase servicio, fuera del ciclo
        var estudianteDao = new EstudianteDao();
        while (!salir) {
            try {
                mostrarMenu(); //metodo que devolvera booleano
                salir = ejecutarOpciones(consola, estudianteDao); //arroja una exception
            } catch (Exception e) {
                System.out.println("Ocurrió un error al ejecutar la operación: " + e.getMessage());
            }
        } //fin while
    } //fin main

    private static void mostrarMenu() {
        System.out.print("""
                ***** Sistema de Estudiantes *****
                1. Listar estudiantes
                2. Buscar estudiantes
                3. Agregar estudiante
                4. Moificar estudiante
                5. Eliminar estudiante
                6. Salir
                Elige una opción:
                """);
    }
//Metodo para ejecutar las opciones, regresa un booleano

    private static boolean ejecutarOpciones(Scanner consola, EstudianteDao estudianteDao) {
        var opcion = Integer.parseInt(consola.nextLine());
        var salir = false;
        switch (opcion) {
            case 1 -> { //listar estudiantes
                System.out.println("Listado de estudiantes");
                var estudiantes = estudianteDao.listarEstudiantes();
                estudiantes.forEach(System.out::println); //para imprimir la lista
            } //fin caso 1
            case 2 -> { //buscar estudiante por id
                System.out.println("Ingresa id de estudiante a buscar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var encontrado = estudianteDao.buscarEstudiantePorId(estudiante);
                if (encontrado)
                    System.out.println(" Estudiante encontrado: " + estudiante);
                else
                    System.out.println("Estudiante no encontrado: " + estudiante);
            } //fin caso 2
            case 3 -> {  //agregar estudiante
                System.out.println("Agregar estudiante: ");
                System.out.println("Nombre: ");
                var nombre = consola.nextLine();
                System.out.println("Apellido: ");
                var apellido = consola.nextLine();
                System.out.println("Teléfono: ");
                var telefono = consola.nextLine();
                System.out.println("Email: ");
                var email = consola.nextLine();
                //crear objeto estudiante(sin id)
                var estudiante = new Estudiante(nombre, apellido, telefono, email);
                var agregado = estudianteDao.agregarEstudiante(estudiante);
                if (agregado)
                    System.out.println("Estudiante agregado: " + estudiante);
                else
                    System.out.println("Estudiante no agregado: " + estudiante);
            } //fin caso 3
            case 4 -> { //modificar estudiante
                System.out.println("Modificar estudiante: ");
                System.out.println("Id Estudiante: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                System.out.println("Nombre: ");
                var nombre = consola.nextLine();
                System.out.println("Apellido: ");
                var apellido = consola.nextLine();
                System.out.println("Teléfono: ");
                var telefono = consola.nextLine();
                System.out.println("Email: ");
                var email = consola.nextLine();
                //crea el objeto estudiante a modificar
                var estudiante =
                        new Estudiante(idEstudiante, nombre, apellido, telefono, email);
                var modificado = estudianteDao.modificarEstudiante(estudiante);
                if (modificado)
                    System.out.println("Estudiante modificado: " + estudiante);
                else
                    System.out.println("Estudiante no modificado: " + estudiante);
            } //fin caso 4
            case 5 -> { //eliminar estudiante
                System.out.println("Eliminar estudiante: ");
                System.out.println("Id estudiante: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var eliminado = estudianteDao.eliminarEstudiante(estudiante);
                if (eliminado)
                    System.out.println("Estudiante eliminado: " + estudiante);
                else System.out.println("Estudiante no eliminado: " + estudiante);
            } //fin caso 5
            case 6 -> { //salir
                System.out.println("Chau!");
                salir = true;
            } //fin caso 6
            default -> System.out.println("Ingrese opción válida");
        } //fin switch
        return salir;
    }
}



















