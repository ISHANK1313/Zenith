package com.example.Zenith.controller;

import com.example.Zenith.dto.ScoreSubmitDto;
import com.example.Zenith.entity.Scores;
import com.example.Zenith.entity.Users;
import com.example.Zenith.repository.UserRepo;
import com.example.Zenith.service.LeaderBoardService;
import com.example.Zenith.service.ScoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/score")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private LeaderBoardService leaderBoardService;
    @PostMapping("/addscore")
    public ResponseEntity<?> addScore(@Valid @RequestBody ScoreSubmitDto submitDto) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            String email = (String) auth.getPrincipal();
            Users user = userRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            scoreService.addScore(user, submitDto.getScore());
            leaderBoardService.updateScore(user.getUsername(), submitDto.getScore());
            return ResponseEntity.status(HttpStatus.CREATED).body("score added");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed to submit score");
        }


    }
    @GetMapping("/getscores")
    public ResponseEntity<?> getAllScoresForUser(){
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = (String) auth.getPrincipal();
            Optional<Users> usersOptional = userRepo.findByEmail(email);
            if (usersOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User not found");
            }
            List<Scores> scoresList = scoreService.getAllScoresForUser(usersOptional.get());
            if (scoresList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("scores does not exist");
            }
            return ResponseEntity.ok(scoresList);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something wrong happened");
        }

    }



}
