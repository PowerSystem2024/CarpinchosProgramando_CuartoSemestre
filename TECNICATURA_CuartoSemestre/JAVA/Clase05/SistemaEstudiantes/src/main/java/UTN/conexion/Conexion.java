package UTN.conexion;

import java.sql.Connection; //conexión a la bdd
import java.sql.DriverManager; //se usa para obtener la conexión
import java.sql.SQLException; //exepción que ocurre cuando hay errores en la base de datos

public class Conexion {
    public static Connection getConnection() {
        Connection conexion = null;

        var baseDatos = "estudiantes";
        var url = "jdbc:mysql://localhost:3306/" + baseDatos;
        var usuario = "root";
        var pass = "mariana";

        // Cargamos el driver en la memoria

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conexion = DriverManager.getConnection(url, usuario, pass);
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Ocurrio un error con la conexion: " + e.getMessage());
        }
        return conexion;
    }
}
