
package Candidate.demo.controller;

import Candidate.demo.entity.Signup;
import Candidate.demo.repository.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/nic")
@CrossOrigin(origins = "http://localhost:3000") // or your frontend port
public class AuthController {

    @Autowired
    private SignupRepository signupRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Signup loginRequest) {
        Signup user = signupRepository.findByNameAndPassword(loginRequest.getName(), loginRequest.getPassword());

        if (user != null) {
            // return NIC and name in JSON
            return ResponseEntity.ok(new LoginResponse(user.getName(), user.getNic()));
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    // Inner class for response
    static class LoginResponse {
        private String name;
        private String nic;

        public LoginResponse(String name, String nic) {
            this.name = name;
            this.nic = nic;
        }

        public String getName() {
            return name;
        }

        public String getNic() {
            return nic;
        }
    }
}
