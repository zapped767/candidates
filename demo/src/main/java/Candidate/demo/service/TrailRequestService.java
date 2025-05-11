package Candidate.demo.service;

import Candidate.demo.entity.AllApprovalRequest;
import Candidate.demo.entity.AllDeniedRequest;
import Candidate.demo.entity.TrailRequest;
import Candidate.demo.repository.AllApprovalRequestRepository;
import Candidate.demo.repository.AllDeniedRequestRepository;
import Candidate.demo.repository.TrailRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrailRequestService {

    @Autowired
    private TrailRequestRepository repository;

    @Autowired
    private AllApprovalRequestRepository approvalRepository;


    @Autowired
    private AllDeniedRequestRepository deniedRepository;

    public TrailRequest save(TrailRequest request) {
        return repository.save(request);
    }

    public List<TrailRequest> getAll() {
        return repository.findAll();
    }
    public List<AllApprovalRequest> getApprovedRequests() {
        return approvalRepository.findAll(); // This uses your existing AllApprovalRequestRepository

    }
    public List<AllDeniedRequest> getDeniedRequests() {
        return deniedRepository.findAll();
    }
    public String approve(Long id) {
        TrailRequest request = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Update the status of the original request
        request.setStatus("approved");
        repository.save(request);

        // Create a copy in the approval repository
        approvalRepository.save(new AllApprovalRequest(request));

        return "Request approved and moved to AllApprovalRequest";
    }

    public String deny(Long id) {
        TrailRequest request = repository.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        deniedRepository.save(new AllDeniedRequest(request));
        repository.deleteById(id);
        return "Request denied and moved to AllDeniedRequest";
    }
}
