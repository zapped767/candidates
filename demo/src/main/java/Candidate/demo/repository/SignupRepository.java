package Candidate.demo.repository;

import Candidate.demo.entity.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SignupRepository extends JpaRepository<Signup, Long> {
    Optional<Signup> findByName(String name);

    static Optional<Signup> findAll(String id) {
        return null;
    }

    boolean existsByEmail(String email);
    Signup findByNameAndPassword(String name, String password);
}