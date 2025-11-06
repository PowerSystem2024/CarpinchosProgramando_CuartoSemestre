package ar.com.utnfrsr.todoapp.model.dto.request;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TaskRequestDTO {
    @NotNull
    private String title;

    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    @NotNull
    @JsonFormat(pattern = "HH:mm")
    private LocalTime time;
}