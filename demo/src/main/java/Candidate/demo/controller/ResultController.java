package Candidate.demo.controller;

import Candidate.demo.entity.Result;

import Candidate.demo.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin("*")
public class ResultController {

    @Autowired
    private ResultService resultService;

    @PostMapping("/upload")
    public Result uploadResult(
            @RequestParam("candidate_name") String candidateName,
            @RequestParam("candidate_id") String candidateId,
            @RequestParam("video") MultipartFile videoFile

    ) throws Exception {
        return resultService.saveResult(candidateName, candidateId,videoFile);
    }
    @GetMapping
    public List<Result> getAllResults() {
        return resultService.getAllResults();
    }
    @GetMapping("/video/{filename}")
    public ResponseEntity<Resource> getVideo(@PathVariable String filename) throws IOException {
        Path filePath = Paths.get("C:/Users/zappe/video-uploads").resolve(filename).normalize();
        Resource resource = new UrlResource(((java.nio.file.Path) filePath).toUri());

        if (!resource.exists()) {
            throw new FileNotFoundException("File not found " + filename);
        }

        return ResponseEntity.ok()
                .contentType(MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(resource);
    }
    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<Result> getResultByCandidateId(@PathVariable String candidateId) {
        Result result = resultService.getResultByCandidateId(candidateId);
        if (result != null) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
