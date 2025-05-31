package Candidate.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String candidateName;

    private String email;

    private LocalDate date;

    private LocalTime time;

    private String location;

    private Double amount;


    @Lob
    private String paymentSlipPath;

    private String status;
}
