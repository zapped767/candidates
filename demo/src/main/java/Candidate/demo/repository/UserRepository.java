package Candidate.demo.repository;

import Candidate.demo.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    List<UserEntity> findAllByOrderByCreatedAtDesc();

    UserEntity findByEmail(String email);
}