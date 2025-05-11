package Candidate.demo.service;

import Candidate.demo.entity.Payment;
import Candidate.demo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    // Save payment to the database
    public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }

    // Get all payments from the database
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    // Get payment by ID (optional, in case needed)
    public Optional<Payment> getById(Long id) {
        return paymentRepository.findById(id);
    }
}
