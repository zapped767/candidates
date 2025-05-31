package Candidate.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Result")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidate_name;

    private String candidate_id;

    private String videoPath; // store file path instead of blob

    
}
