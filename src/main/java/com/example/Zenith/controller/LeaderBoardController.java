package com.example.Zenith.controller;

import com.example.Zenith.dto.LeaderBoardEntryDto;
import com.example.Zenith.exception.UserBelow10KException;
import com.example.Zenith.service.LeaderBoardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/leaderboard")
public class LeaderBoardController {
    @Autowired
    private LeaderBoardService leaderBoardService;
    @GetMapping("/top10")
    public ResponseEntity<?> getTop10(){
        return ResponseEntity.ok(leaderBoardService.getTop10());
    }
    @GetMapping("/rank")
    public ResponseEntity<?> getRankOfUsername(@Valid @RequestParam String username){
        try {
            Long rank = leaderBoardService.getRank(username);
            if (rank == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("username does not exist");
            }
            return ResponseEntity.ok(rank);
        }
        catch (UserBelow10KException e) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(e.getMessage());
        }

    }

    @GetMapping("/score")
    public ResponseEntity<?> getScoreOfUsername(@Valid @RequestParam String username){
        Long score=leaderBoardService.getScore(username);
        if(score==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("username does not exist");
        }
        return ResponseEntity.ok(score);
    }
}
