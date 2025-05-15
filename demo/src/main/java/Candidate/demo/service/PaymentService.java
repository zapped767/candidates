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
        // Default new payments to PENDING if not already set
        if (payment.getStatus() == null) {
            payment.setStatus("PENDING");
        }
        return paymentRepository.save(payment);
    }

    // Get all payments
    public List<Payment> getAll() {
        return paymentRepository.findAll();
    }

    // Get payment by ID
    public Optional<Payment> getById(Long id) {
        return paymentRepository.findById(id);
    }

    // Get payments by status
    public List<Payment> getByStatus(String status) {
        return paymentRepository.findByStatus(status);
    }

    // Update payment status
    public Payment updateStatus(Long id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with ID: " + id));
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
}
