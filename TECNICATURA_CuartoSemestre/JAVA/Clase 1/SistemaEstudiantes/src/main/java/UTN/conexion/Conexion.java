package src.main.java.UTN.conexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    public static Connection getConnection() {
        Connection conexion = null;

        var baseDatos = "Estudiantes2025"; // Nombre de la base de datos
        var url = "jdbc:postgresql://localhost:5433/" + baseDatos; // URL de conexión JDBC con el puerto y nombre de la base
        var usuario = "postgres"; // Usuario de la base de datos
        var password = "1234";    // Contraseña del usuario
        // Cargamos el driver en la memoria

        try {
            Class.forName("org.postgresql.Driver");
            conexion = DriverManager.getConnection(url, usuario, password);
        } catch (ClassNotFoundException | SQLException e) {
            System.out.println("Ocurrio un error con la conexion: " + e.getMessage());
         e.printStackTrace();
        }
        return conexion;
    }
}
