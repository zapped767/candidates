package Candidate.demo.controller;

import Candidate.demo.entity.AllApprovalRequest;
import Candidate.demo.entity.AllDeniedRequest;
import Candidate.demo.entity.TrailRequest;
import Candidate.demo.service.TrailRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ssl.SslProperties;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

@RestController
@RequestMapping("/api/trail-request")
@CrossOrigin(origins = "*")
public class TrailRequestController {

    @Autowired
    private TrailRequestService service;

    private final String UPLOAD_DIR = Paths.get(System.getProperty("user.dir"), "uploads").toString();
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @PostMapping
    public TrailRequest createRequest(
            @RequestParam("lPermitDate") String lPermitDate,
            @RequestParam("drivingSchoolName") String drivingSchoolName,
            @RequestParam("lPermit") MultipartFile lPermit,
            @RequestParam("medicalFront") MultipartFile medicalFront,
            @RequestParam("medicalBack") MultipartFile medicalBack
    ) throws IOException {
        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(lPermitDate.trim(), DATE_FORMATTER);
        } catch (DateTimeParseException ex) {
            throw new IllegalArgumentException("Invalid date format. Use yyyy-MM-dd.");
        }

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        TrailRequest request = new TrailRequest();
        request.setLPermitDate(parsedDate);
        request.setDrivingSchoolName(drivingSchoolName);
        request.setLPermitPath(saveFile(lPermit));
        request.setMedicalFrontPath(saveFile(medicalFront));
        request.setMedicalBackPath(saveFile(medicalBack));

        return service.save(request);
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

    @GetMapping("/accepted")
    public List<AllApprovalRequest> getApprovedRequests() {
        return service.getApprovedRequests();
    }

    @GetMapping("/denied")
    public List<AllDeniedRequest> getDeniedRequests() {
        return service.getDeniedRequests();
    }

    @GetMapping
    public List<TrailRequest> getAllRequests() {
        return service.getAll();
    }

    @PostMapping("/approve/{id}")
    public String approve(@PathVariable Long id) {
        return service.approve(id);
    }

    @PostMapping("/deny/{id}")
    public String deny(@PathVariable Long id) {
        return service.deny(id);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get(System.getProperty("user.dir"), "uploads", filename);
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

}