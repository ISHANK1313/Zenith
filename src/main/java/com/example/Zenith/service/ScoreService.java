package com.example.Zenith.service;

import com.example.Zenith.entity.Scores;
import com.example.Zenith.entity.Users;
import com.example.Zenith.repository.ScoresRepo;
import com.example.Zenith.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoresRepo scoresRepo;
    @Transactional
    public void addScore(Users users,Long score){

        Scores scores= new Scores();
        scores.setScore(score);
        scores.setSubmittedAt(LocalDateTime.now());
        scores.setUsers(users);
        scoresRepo.save(scores);
        return ;

    }

    public boolean scoreExistsByUser(Users users){
        if(scoresRepo.findByUsers(users).isEmpty()){
            return false;
        }
        return true;
    }
    public List<Scores> getAllScoresForUser(Users users){
        Optional<List<Scores>> optionalScores=scoresRepo.findByUsers(users);
        if(optionalScores.isEmpty()){
            return null;
        }
        return optionalScores.get();
    }

}
