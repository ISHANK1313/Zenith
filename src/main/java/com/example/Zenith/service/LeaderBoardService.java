package com.example.Zenith.service;

import com.example.Zenith.dto.LeaderBoardEntryDto;
import com.example.Zenith.entity.Scores;
import com.example.Zenith.entity.Users;
import com.example.Zenith.exception.UserBelow10KException;
import com.example.Zenith.repository.ScoresRepo;
import com.example.Zenith.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class LeaderBoardService {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private ScoresRepo scoresRepo;
    @Autowired
    private WebsocketBroadcasterService broadcasterService;
    private String LEADERBOARD="leaderboard:global";

    public void updateScore(String username, Long score) {
        // be sure that username exists before only then submit score in redis
        Double currentScore = redisTemplate.opsForZSet().score(LEADERBOARD, username);
        if (currentScore==null||currentScore.longValue() < score) {
            redisTemplate.opsForZSet().add(LEADERBOARD, username, score);
        }
        Long totalPlayers = redisTemplate.opsForZSet().zCard(LEADERBOARD);
        if (totalPlayers != null && totalPlayers > 10000) {
            // Remove lowest-ranked players
            long excess = totalPlayers - 10000;
            redisTemplate.opsForZSet().removeRange(LEADERBOARD, 0, excess - 1);
        }
        Long rank = redisTemplate.opsForZSet().reverseRank(LEADERBOARD, username);

        // 4. BROADCAST ONLY IF THEY EXIST IN TOP 10K
        if (rank != null) {
            broadcasterService.broadcastScoreUpdate(username, score, rank + 1);
        } else {

            System.out.println("User " + username + " not in top 10k after trimming.");
        }
    }

    public List<LeaderBoardEntryDto> getTop10(){
         Set<ZSetOperations.TypedTuple<String>> result=redisTemplate
                 .opsForZSet().reverseRangeWithScores(LEADERBOARD,0,9);
         List<LeaderBoardEntryDto> leaderBoardEntryDtos= new ArrayList<>();
         long rank=1;
         for(ZSetOperations.TypedTuple<String> r:result){
             LeaderBoardEntryDto dto= new LeaderBoardEntryDto();
             dto.setScore(r.getScore().longValue());
             dto.setUsername(r.getValue());
             dto.setRank(rank);
             rank++;
             leaderBoardEntryDtos.add(dto);
         }
         return leaderBoardEntryDtos;
    }

    public Long getRank(String username) {
        if (!userRepo.existsByUsername(username)) {
            return null;
        }
        Long rank = redisTemplate.opsForZSet().reverseRank(LEADERBOARD, username);
        if (rank == null) {
            throw new UserBelow10KException("User not in top 10,000. Keep playing!");
        }
        return rank + 1;
    }

    //marked
    public Long getScore(String username){
        if (!userRepo.existsByUsername(username)){
            return null;
        }

        Double redisScore = redisTemplate. opsForZSet().score(LEADERBOARD, username);
        if (redisScore != null) {
            return redisScore. longValue();
        }


        Users user = userRepo.findByUsername(username).orElse(null);
        if (user == null) return null;

        List<Scores> scores = scoresRepo.findByUsersOrderBySubmittedAtDesc(user);
        if (scores.isEmpty()) return null;

        // Return highest score
        return scores.stream()
                .mapToLong(Scores::getScore)
                .max()
                .orElse(0L);
    }

}
