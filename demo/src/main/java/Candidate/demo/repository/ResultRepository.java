package Candidate.demo.repository;


import Candidate.demo.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResultRepository extends JpaRepository<Result,Long> {

    @Query(value = "SELECT * FROM result WHERE candidate_id = :candidateId", nativeQuery = true)
    Result findByCandidateId(@Param("candidateId") String candidateId);

}
