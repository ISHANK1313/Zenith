package com.example.Zenith.controller;

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
   @PostMapping("/addscore/{score}")
    public ResponseEntity<?> addScore(@Valid @PathVariable Long score) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();

            String email = (String) auth.getPrincipal();
            Optional<Users> usersOptional = userRepo.findByEmail(email);

            if (usersOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User not found");
            }
            scoreService.addScore(usersOptional.get(), score);
            leaderBoardService.updateScore(usersOptional.get().getUsername(),score);
            return ResponseEntity.status(HttpStatus.CREATED).body("score added");
        }
            catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something wrong happened");
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
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("scores does not exist");
            }
            return ResponseEntity.ok(scoresList);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something wrong happened");
        }

    }



}
