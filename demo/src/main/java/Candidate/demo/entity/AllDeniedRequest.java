package Candidate.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class AllDeniedRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate lPermitDate;
    private String drivingSchoolName;
    private String lPermitPath;
    private String medicalFrontPath;
    private String medicalBackPath;

    public AllDeniedRequest() {}

    public AllDeniedRequest(TrailRequest request) {
        this.lPermitDate = request.getLPermitDate();
        this.drivingSchoolName = request.getDrivingSchoolName();
        this.lPermitPath = request.getLPermitPath();
        this.medicalFrontPath = request.getMedicalFrontPath();
        this.medicalBackPath = request.getMedicalBackPath();
    }
}
