package Candidate.demo.service;

//import Candidate.demo.DTO.SignupWithApprovalDTO;
import Candidate.demo.entity.AllApprovalRequest;
import Candidate.demo.entity.Signup;
import Candidate.demo.repository.AllApprovalRequestRepository;
import Candidate.demo.repository.SignupRepository;
import Candidate.demo.repository.TrailRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AllApprovalService {


    @Autowired
    private SignupRepository signupRepository;

    @Autowired
    private AllApprovalRequestRepository approvalRequestRepository;

//    public List<SignupWithApprovalDTO> getAllSignupWithApprovals() {
//        List<Signup> allSignups = signupRepository.findAll();
//
//        return allSignups.stream().map(signup -> {
//            TrailRequestRepository approvalRepository;
//            AllApprovalRequest approval = AllApprovalRequestRepository.findByNic(signup.getNic());
//            return new SignupWithApprovalDTO(
//                    signup.getId(),
//                    signup.getName(),
//                    signup.getNic(),
//                    signup.getEmail(),
//                    approval != null ? approval.getLPermitPath() : null,
//                    approval != null ? approval.getMedicalFrontPath() : null,
//                    approval != null ? approval.getMedicalBackPath() : null
//            );
//        }).collect(Collectors.toList());
    }


