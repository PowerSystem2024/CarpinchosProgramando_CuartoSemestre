package utn.tienda_libros;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;
import utn.tienda_libros.vista.LibroForm;

import static java.awt.EventQueue.invokeLater;

@SpringBootApplication
public class TiendaLibrosApplication {

	public static void main(String[] args) {
        ConfigurableApplicationContext contextoSpring =
                new SpringApplicationBuilder(TiendaLibrosApplication.class).headless(false).web(WebApplicationType.NONE).run(args);

        //Ejecutamos el codigo para cargar el formulario
        //El contexto de spring se encarga de crear el formulario y resolver sus dependencias
        //El formulario se mantiene vivo mientras el contexto de spring este activo

        invokeLater(() -> {
            LibroForm libroForm = contextoSpring.getBean(LibroForm.class);
            libroForm.setVisible(true);
        });
	}
}
