//package Candidate.demo.Controller;
//import Candidate.demo.DTO.LoginRequest;
//import Candidate.demo.controller.SignupController;
//import Candidate.demo.entity.Signup;
//import Candidate.demo.repository.SignupRepository;
//import Candidate.demo.service.SignupService;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//
//
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.util.Arrays;
//import java.util.Optional;
//
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import static org.mockito.Mockito.when;
//
//@WebMvcTest(SignupController.class)
//public class SignupControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Mock
//    private SignupService signupService;
//
//    @Mock
//    private SignupRepository signupRepository;
//
//    private final ObjectMapper objectMapper = new ObjectMapper();
//
//    @Test
//    void testGetAllUsers() throws Exception {
//        Signup user1 = new Signup(1L, "hari", "password123");
//        Signup user2 = new Signup(2L, "arun", "secret456");
//
//        when(signupRepository.findAll()).thenReturn(Arrays.asList(user1, user2));
//
//        mockMvc.perform(get("/api/auth/users"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(2));
//    }
//
//    @Test
//    void testSignupUser() throws Exception {
//        Signup newUser = new Signup(null, "newuser", "mypassword");
//
//        when(signupService.registerUser(Mockito.any(Signup.class))).thenReturn("Signup successful");
//
//        mockMvc.perform(post("/api/auth/signup")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(newUser)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Signup successful"));
//    }
//
//    @Test
//    void testLogin_Success() throws Exception {
//        LoginRequest loginRequest = new LoginRequest("testuser", "testpass");
//        Signup user = new Signup(1L, "testuser", "testpass");
//
//        when(signupRepository.findByName("testuser")).thenReturn(Optional.of(user));
//
//        mockMvc.perform(post("/api/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(loginRequest)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Login successful"));
//    }
//
//    @Test
//    void testLogin_Failure() throws Exception {
//        LoginRequest loginRequest = new LoginRequest("wronguser", "wrongpass");
//
//        when(signupRepository.findByName("wronguser")).thenReturn(Optional.empty());
//
//        mockMvc.perform(post("/api/auth/login")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(loginRequest)))
//                .andExpect(status().isUnauthorized())
//                .andExpect(content().string("Invalid credentials"));
//    }
//}
