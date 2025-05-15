package Candidate.demo.controller;

import Candidate.demo.entity.Payment;
import Candidate.demo.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    private final String UPLOAD_DIR = Paths.get(System.getProperty("user.dir"), "payment_uploads").toString();

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment submitPayment(
            @RequestParam String candidateName,
            @RequestParam String email,
            @RequestParam String date,
            @RequestParam String time,
            @RequestParam String location,
            @RequestParam Double amount,
            @RequestParam("paymentSlip") MultipartFile paymentSlip
    ) throws IOException {

        // Create upload directory if not exists
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save file and get filename
        String paymentSlipPath = saveFile(paymentSlip);

        // Parse date and time strings to LocalDate and LocalTime
        LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("yyyy-MM-dd")); // adjust pattern as needed
        LocalTime parsedTime = LocalTime.parse(time, DateTimeFormatter.ofPattern("HH:mm")); // adjust pattern as needed

        // Build Payment entity
        Payment payment = new Payment();
        payment.setCandidateName(candidateName);
        payment.setEmail(email);
        payment.setDate(parsedDate);  // Set the parsed LocalDate
        payment.setTime(parsedTime);  // Set the parsed LocalTime
        payment.setLocation(location);
        payment.setAmount(amount);
        payment.setPaymentSlipPath(paymentSlipPath);

        // Save to DB
        return paymentService.save(payment);
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        // Generate unique filename
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR).resolve(filename);

        // Save file
        Files.copy(file.getInputStream(), filePath);

        return filename;
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAll();
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR, filename);
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(resource);
        } else {
            throw new RuntimeException("Could not read file: " + filename);
        }
    }
    @GetMapping("/pending")
    public List<Payment> getPendingPayments() {
        return paymentService.getByStatus("PENDING");
    }

    @PutMapping("/{id}/approve")
    public Payment approvePayment(@PathVariable Long id) {
        return paymentService.updateStatus(id, "APPROVED");
    }

    @PutMapping("/{id}/reject")
    public Payment rejectPayment(@PathVariable Long id) {
        return paymentService.updateStatus(id, "REJECTED");
    }

}
