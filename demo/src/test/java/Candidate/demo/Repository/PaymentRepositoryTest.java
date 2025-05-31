//package Candidate.demo.Repository;
//
//import Candidate.demo.entity.Payment;
//import Candidate.demo.repository.PaymentRepository;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@DataJpaTest
//public class PaymentRepositoryTest {
//
//    @Autowired
//    private PaymentRepository paymentRepository;
//
//    @Test
//    void testSaveAndFindPayment() {
//        // Arrange
//        Payment payment = new Payment();
//        payment.setCandidateName("Hariharan");
//        payment.setEmail("hari@example.com");
//        payment.setDate(LocalDate.now());
//        payment.setTime(LocalTime.now());
//        payment.setLocation("Colombo");
//        payment.setAmount(1500.0);
//        payment.setPaymentSlipPath("path/to/slip.png");
//        payment.setStatus("Pending");
//
//        // Act
//        Payment saved = paymentRepository.save(payment);
//        Optional<Payment> found = paymentRepository.findById(saved.getId());
//
//        // Assert
//        assertTrue(found.isPresent());
//        assertEquals("Hariharan", found.get().getCandidateName());
//        assertEquals("Pending", found.get().getStatus());
//        assertEquals(1500.0, found.get().getAmount());
//    }
//}