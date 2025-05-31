package Candidate.demo.repository;

import Candidate.demo.entity.AllApprovalRequest;
import Candidate.demo.entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllApprovalRequestRepository extends JpaRepository<AllApprovalRequest, Long> {
    static AllApprovalRequest findByNic(String nic) {
        return null;
    }

    AllApprovalRequest findBySignup(Signup signup);
}
