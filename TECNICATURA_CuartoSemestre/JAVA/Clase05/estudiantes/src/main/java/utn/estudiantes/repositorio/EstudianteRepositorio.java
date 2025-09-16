package utn.estudiantes.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import utn.estudiantes.modelo.Estudiantes1;

public interface EstudianteRepositorio extends JpaRepository<Estudiantes1, Integer> {
}
