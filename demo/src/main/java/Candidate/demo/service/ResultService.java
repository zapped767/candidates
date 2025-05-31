package Candidate.demo.service;

import Candidate.demo.entity.Result;
import Candidate.demo.repository.ResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ResultService {

    // Use an absolute path for reliable file storage
    private final String uploadDir = System.getProperty("user.home") + File.separator + "video-uploads";

    @Autowired
    private ResultRepository resultRepository;

    public Result saveResult(String candidateName, String candidateId,MultipartFile videoFile) throws IOException {
        // Ensure upload directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Create a unique filename
        String fileName = System.currentTimeMillis() + "_" + videoFile.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // Save the video file to the specified path
        videoFile.transferTo(filePath.toFile());

        // Create and save the Result entity
        Result result = new Result();

        result.setCandidate_name(candidateName);
        result.setCandidate_id(candidateId);

        result.setVideoPath(filePath.toString());

        return resultRepository.save(result);
    }
    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }
    public Result getResultByCandidateId(String candidateId) {
        return resultRepository.findByCandidateId(candidateId);
    }


}
