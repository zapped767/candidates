package Candidate.demo.repository;

import Candidate.demo.entity.TrailRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrailRequestRepository extends JpaRepository<TrailRequest, Long> {
    List<TrailRequest> findByNic(String nic);


}