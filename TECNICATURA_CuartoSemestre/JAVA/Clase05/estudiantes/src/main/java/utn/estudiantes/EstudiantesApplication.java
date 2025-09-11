
package utn.estudiantes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiantes1;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {

	@Autowired
	private EstudianteServicio estudianteServicio;
	private static final Logger logger = LoggerFactory.getLogger(EstudiantesApplication.class);

	String nl = System.lineSeparator();

	public static void main(String[] args) {
		logger.info("Iniciando la aplicación...");
		SpringApplication.run(EstudiantesApplication.class, args);
		logger.info("Aplicación finalizada.");
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info(nl + "Ejecutando el método run de Spring..." + nl);
		var salir = false;
		var consola = new Scanner(System.in);
		while (!salir) {
			mostrarMenu();
			salir = ejecutarOpciones(consola);
			logger.info(nl);
		}
	}

	private void mostrarMenu() {
		logger.info("""
                ******** Sistema de Estudiantes *******
                1. Listar Estudiantes
                2. Buscar Estudiantes
                3. Agregar Estudiante
                4. Modificar Estudiante
                5. Eliminar Estudiante
                6. Salir
                Elija una opción:""");
	}

	private boolean ejecutarOpciones(Scanner consola) {
		//var opcion = Integer.parseInt(consola.nextLine());
		//var salir = false;

		boolean salir = false;
		int opcion;

		try {
			opcion = Integer.parseInt(consola.nextLine()); // intenta convertir
		} catch (NumberFormatException e) {
			logger.info("Por favor ingrese un número válido del 1 al 6." + nl);
			return false; // vuelve al menú sin romper el programa
		}

		switch (opcion) {
			case 1 -> { // Listar estudiantes
				logger.info(nl + "Listado de estudiantes:" + nl);
				List<Estudiantes1> estudiantes = estudianteServicio.listarEstudiantes();
				estudiantes.forEach(estudiante -> logger.info(estudiante.toString() + nl));
			}
			case 2 -> { // Buscar estudiante por ID
				logger.info("Ingrese el id estudiante a buscar: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes1 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null)
					logger.info("Estudiante encontrado: " + estudiante + nl);
				else
					logger.info("Estudiante no encontrado: " + idEstudiante + nl);
			}
			case 3 -> { // Agregar estudiante
				logger.info("Agregar estudiante:" + nl);
				logger.info("Nombre: ");
				var nombre = consola.nextLine();
				logger.info("Apellido: ");
				var apellido = consola.nextLine();
				logger.info("Teléfono: ");
				var telefono = consola.nextLine();
				logger.info("Email: ");
				var email = consola.nextLine();

				var estudiante = new Estudiantes1(); // ✅ Instancia correcta
				estudiante.setNombre(nombre);
				estudiante.setApellido(apellido);
				estudiante.setTelefono(telefono);
				estudiante.setEmail(email);
				estudianteServicio.guardarEstudiante(estudiante); // ✅ Pasar el objeto

				logger.info("Estudiante agregado: " + estudiante + nl);
			}
			case 4 -> { // Modificar estudiante
				logger.info("Modificar estudiante:" + nl);
				logger.info("Ingrese el id estudiante: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes1 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null) {
					logger.info("Nombre: ");
					var nombre = consola.nextLine();
					logger.info("Apellido: ");
					var apellido = consola.nextLine();
					logger.info("Teléfono: ");
					var telefono = consola.nextLine();
					logger.info("Email: ");
					var email = consola.nextLine();

					estudiante.setNombre(nombre);
					estudiante.setApellido(apellido);
					estudiante.setTelefono(telefono);
					estudiante.setEmail(email);
					estudianteServicio.guardarEstudiante(estudiante);

					logger.info("Estudiante modificado: " + estudiante + nl);
				} else
					logger.info("Estudiante no encontrado con id: " + idEstudiante + nl);
			}
			case 5 -> { // Eliminar estudiante
				logger.info("Eliminar estudiante:" + nl);
				logger.info("Digite el id estudiante: ");
				var idEstudiante = Integer.parseInt(consola.nextLine());
				Estudiantes1 estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
				if (estudiante != null) {
					estudianteServicio.eliminarEstudiante(estudiante);
					logger.info("Estudiante eliminado: " + estudiante + nl);
				} else
					logger.info("Estudiante no encontrado con id: " + idEstudiante + nl);
			}
			case 6 -> { // Salir
				logger.info("Hasta pronto!" + nl + nl);
				salir = true;
			}
			default -> logger.info("Opción desconocida: " + opcion + nl);
		}

		return salir;
	}
}














