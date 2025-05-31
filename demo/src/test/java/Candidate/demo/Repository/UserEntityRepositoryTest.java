//package Candidate.demo.Repository;
//
//import Candidate.demo.entity.UserEntity;
//import Candidate.demo.entity.UserEntity.AccountStatus;
//import Candidate.demo.repository.UserRepository;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.time.LocalDateTime;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@DataJpaTest
//public class UserEntityRepositoryTest {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Test
//    void testSaveAndRetrieveUser() {
//        // Arrange
//        UserEntity user = new UserEntity();
//        user.setFullName("Hariharan");
//        user.setEmail("hari@example.com");
//        user.setMobileNumber("0771234567");
//        user.setPassword("secure123");
//        user.setAccountStatus(AccountStatus.ACTIVE);
//        user.setCreatedAt(LocalDateTime.now());
//
//        // Act
//        UserEntity saved = userRepository.save(user);
//        UserEntity fetched = userRepository.findById(saved.getId()).orElse(null);
//
//        // Assert
//        assertNotNull(fetched);
//        assertEquals("Hariharan", fetched.getFullName());
//        assertEquals("hari@example.com", fetched.getEmail());
//        assertEquals(AccountStatus.ACTIVE, fetched.getAccountStatus());
//    }
//
//    @Test
//    void testFindByEmail() {
//        // Arrange
//        UserEntity user = new UserEntity();
//        user.setFullName("Arigaran");
//        user.setEmail("arigaran@example.com");
//        user.setMobileNumber("0779876543");
//        user.setPassword("pass456");
//        user.setAccountStatus(AccountStatus.PENDING);
//        user.setCreatedAt(LocalDateTime.now());
//
//        userRepository.save(user);
//
//        // Act
//        UserEntity found = userRepository.findByEmail("arigaran@example.com");
//
//        // Assert
//        assertNotNull(found);
//        assertEquals("Arigaran", found.getFullName());
//        assertEquals(AccountStatus.PENDING, found.getAccountStatus());
//    }
//}
