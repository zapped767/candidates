package Candidate.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class AllApprovalRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate lPermitDate;
    private String drivingSchoolName;
    private String lPermitPath;
    private String medicalFrontPath;
    private String medicalBackPath;

    @ManyToOne
    @JoinColumn(name = "nic", referencedColumnName = "nic")
    private Signup signup;

    public AllApprovalRequest() {}

    public AllApprovalRequest(TrailRequest request) {
        this.lPermitDate = request.getLPermitDate();
        this.drivingSchoolName = request.getDrivingSchoolName();
        this.lPermitPath = request.getLPermitPath();
        this.medicalFrontPath = request.getMedicalFrontPath();
        this.medicalBackPath = request.getMedicalBackPath();
    }
}
