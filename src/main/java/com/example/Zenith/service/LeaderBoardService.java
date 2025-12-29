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
        System.out.println("======= UPDATE SCORE START =======");
        System.out.println("Username: " + username);
        System.out.println("Score: " + score);
        System.out.println("LEADERBOARD key: " + LEADERBOARD);

        try {
            Double currentScore = redisTemplate.opsForZSet().score(LEADERBOARD, username);
            System.out.println("Current Redis score:  " + currentScore);

            if (currentScore == null || currentScore. longValue() < score) {
                System.out.println("Adding to Redis.. .");
                Boolean added = redisTemplate.opsForZSet().add(LEADERBOARD, username, score);
                System.out.println("Redis ADD result: " + added);

                // ✅ VERIFY IMMEDIATELY
                Double verifyScore = redisTemplate.opsForZSet().score(LEADERBOARD, username);
                System.out.println("Verification - Redis now has: " + verifyScore);
            } else {
                System. out.println("Score not higher, skipping Redis update");
            }

            Long totalPlayers = redisTemplate.opsForZSet().zCard(LEADERBOARD);
            System.out.println("Total players in Redis: " + totalPlayers);

            if (totalPlayers != null && totalPlayers > 10000) {
                long excess = totalPlayers - 10000;
                redisTemplate.opsForZSet().removeRange(LEADERBOARD, 0, excess - 1);
                System.out.println("Trimmed " + excess + " players");
            }

            Long rank = redisTemplate.opsForZSet().reverseRank(LEADERBOARD, username);
            System.out.println("User rank:  " + rank);

            if (rank != null) {
                broadcasterService.broadcastScoreUpdate(username, score, rank + 1);
                if (rank < 10) {
                    broadcasterService.broadcastFullTop10(getTop10());
                }
            }

            System.out. println("======= UPDATE SCORE END =======");

        } catch (Exception e) {
            System.err.println("ERROR in updateScore: " + e. getMessage());
            e.printStackTrace();
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
