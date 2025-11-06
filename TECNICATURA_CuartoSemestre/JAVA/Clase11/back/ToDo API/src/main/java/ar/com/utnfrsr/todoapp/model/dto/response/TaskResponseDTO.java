package ar.com.utnfrsr.todoapp.model.dto.response;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TaskResponseDTO {
    private Long id;
    private String title;
    private LocalDate date;
    private LocalTime time;
    private boolean finished;
}