package utn.estudiantes.servicio;

import utn.estudiantes.modelo.Estudiantes1;

import java.util.List;

public interface IEstudianteServicio {
    public List<Estudiantes1> listarEstudiantes();
    public Estudiantes1 buscarEstudiantePorId(Integer idEstudiante);
    public void guardarEstudiante(Estudiantes1 estudiante);
    public void eliminarEstudiante(Estudiantes1 estudiante);
}
