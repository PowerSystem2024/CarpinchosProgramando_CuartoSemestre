package utn.estudiantes.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utn.estudiantes.modelo.Estudiantes1;
import utn.estudiantes.repositorio.EstudianteRepositorio;

import java.util.List;

@Service
public class EstudianteServicio implements IEstudianteServicio {

    @Autowired
    private EstudianteRepositorio estudianteRepositorio;

    @Override
    public List<Estudiantes1> listarEstudiantes() {
        return estudianteRepositorio.findAll();
    }

    @Override
    public Estudiantes1 buscarEstudiantePorId(Integer idEstudiante) {
        return estudianteRepositorio.findById(idEstudiante).orElse(null);
    }

    @Override
    public void guardarEstudiante(Estudiantes1 estudiante) {
        estudianteRepositorio.save(estudiante);
    }

    @Override
    public void eliminarEstudiante(Estudiantes1 estudiante) {
        estudianteRepositorio.delete(estudiante);
    }
}
