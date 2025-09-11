package UTN.datos; //paquete donde están las clases de acceso a datos

import UTN.dominio.Estudiante; //clase modelo que representa a un estudiante
import static UTN.conexion.Conexion.getConnection; //metodo estático de la clase Conexion
import java.sql.Connection; //clase JDBC para conectar y ejecutar sql
import java.sql.PreparedStatement; //clase JDBC para conectar y ejecutar sql
import java.sql.ResultSet; //clase JDBC para conectar y ejecutar sql
import java.util.ArrayList; //para manejar listas de estudiantes
import java.util.List; //para manejar listas de estudiantes

public class EstudianteDao {
//la clase EstudianteDao es el puente entre la aplicación Java y la base de datos MySQL

    // Metodo listarEstudiantes
    public List<Estudiante> listarEstudiantes() {
        List<Estudiante> estudiantes = new ArrayList<>();

        //Creamos objetos que son necesarios para comunicarnos con la base de datos

        PreparedStatement ps; //Para preparar la sentencia sql
        ResultSet rs; //Almacena el resultado obtenido desde la base de datos

        //Creamos un objeto conexion
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes1 ORDER BY id_estudiante";
        try {
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("id_estudiante"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                //Agregamos a la lista de estudiantes ↑
                estudiantes.add(estudiante);
            }
        } catch (Exception e) {
            System.out.println("Ocurrió un error al seleccionar los datos. " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Ocurrió un error al cerrar la conexion. " + e.getMessage());
            }
        } //fin metodo listar
        return estudiantes;
    }

    //Metodo buscar por id = find by id
    public boolean buscarEstudiantePorId(Estudiante estudiante) {
        PreparedStatement ps; //Para preparar la sentencia sql
        ResultSet rs; //Almacena el resultado obtenido desde la base de datos
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes1 WHERE id_estudiante = ?";
        try {
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            rs = ps.executeQuery();

            if (rs.next()) {
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                return true; //Si se encontró un registro, devuelve verdadero
            } //fin if
        } catch (Exception e) {
            System.out.println("Error al buscar el estudiante. " + e.getMessage());
        } //fin catch
        finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Error al cerrar conexion. " + e.getMessage());
            } //fin catch
        } //fin finally
        return false; //Si no se encontró registro
    }

    //Metodo Agregar nuevo estudiante

    public boolean agregarEstudiante(Estudiante estudiante) {
        PreparedStatement ps; //Para preparar la sentencia sql
        Connection con = getConnection();
        String sql = "INSERT INTO estudiantes1 (nombre, apellido, telefono, email) VALUES(?, ?, ?, ?)";
        try {
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.execute();
            return true; //Se pudo registrar al estudiante
        } catch (Exception e) {
            System.out.println("Error al agregar el estudiante. " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Error al cerrar conexion. " + e.getMessage());
            } //fin catch
        } //fin finally
        return false; //Si no se pudo realizar el registro
    } //fin metodo agregar estudiante

    //Modificar estudiante
    public boolean modificarEstudiante(Estudiante estudiante) {
        PreparedStatement ps; //Para preparar la sentencia sql
        Connection con = getConnection();
        String sql = "UPDATE estudiantes1 SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE id_estudiante = ?";
        try {
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.setInt(5, estudiante.getIdEstudiante());
            ps.execute();
            return true; //Se pudo modificar al estudiante
        } catch (Exception e) {
            System.out.println("Error al modificar el estudiante. " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Error al cerrar conexion. " + e.getMessage());
            } //fin catch
        } //fin finally
        return false; //Si no se pudo realizar el registro
    } //fin metodo modificar estudiante

    public boolean eliminarEstudiante(Estudiante estudiante) {
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "DELETE FROM estudiantes1 WHERE id_estudiante=?";
        try {
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (Exception e) {
            System.out.println("Error al eliminar estudiante: " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Error al cerrar la conexión: " + e.getMessage());
            }
        }
        return false;
    }

    public static void main(String[] args) {
        var estudianteDao = new EstudianteDao();
        //Modificar estudiante
    //    var estudianteModificado = new Estudiante(1, "Juan Carlos", "Juarez", "154332244", "jcjuarez@gmail.com");
    //    var modificado = estudianteDao.modificarEstudiante(estudianteModificado);
    //   if(modificado)
    //        System.out.println("Estudiante moddificado: "+estudianteModificado);
    //    else System.out.println("No se modificó el estudiante: "+estudianteModificado);

        //Agregar estudiante
        //var nuevoEstudiante = new Estudiante("Omar", "Aguilera", "2604300500", "omaragui58@hotmail.com");
        //var agregado = estudianteDao.agregarEstudiante(nuevoEstudiante);
        //if(agregado)
         //   System.out.println("Estudiante agregado: "+nuevoEstudiante);
        //else
        //    System.out.println("No se ha agregado estudiante: "+nuevoEstudiante);


        //eliminar estudiante con id 3
        var estudianteEliminar = new Estudiante(3);
        var eliminado = estudianteDao.eliminarEstudiante(estudianteEliminar);
        if (eliminado)
            System.out.println("Estudiante eliminado: " + estudianteEliminar);
        else System.out.println("No se eliminó estudiante: " + estudianteEliminar);

        //listar los estudiantes
        System.out.println("Listado de estudiantes: ");
        List<Estudiante> estudiantes = estudianteDao.listarEstudiantes();
        estudiantes.forEach(System.out::println);

        //Buscar por ID
   //     var estudiante1 = new Estudiante(1);
    //    System.out.println("Estudiantes antes de la búsqueda: "+estudiante1);
    //    var encontrado = estudianteDao.buscarEstudiantePorId(estudiante1);
   //     if(encontrado)
   //         System.out.println("Estudiante encontrado: "+estudiante1);
   //     else
    //        System.out.println("No se encontró estudiente: "+estudiante1.getIdEstudiante());
    }
}
