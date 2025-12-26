package com.example.Zenith.service;

import com.example.Zenith.dto.LeaderBoardEntryDto;
import com.example.Zenith.exception.UserBelow10KException;
import com.example.Zenith.repository.ScoresRepo;
import com.example.Zenith.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class LeaderBoardService {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;
    @Autowired
    private UserRepo userRepo;
    private String LEADERBOARD="leaderboard:global";
    public void updateScore(String username, Long score) {
        // be sure that username exists before only then submit score in redis
        if ((redisTemplate.opsForZSet().score(LEADERBOARD, username) < score)) {
            redisTemplate.opsForZSet().add(LEADERBOARD, username, score);
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
        if(rank==null){
            return null;
        }
        if (rank > 10000) {
            throw new UserBelow10KException("The user rank is below 10K... Keep Playing to climb up");
        }
        return rank + 1;
    }

    //marked
    public Long getScore(String username){
        if(!userRepo.existsByUsername(username)){
            return null;
        }

        Long score = redisTemplate.opsForZSet().score(LEADERBOARD, username).longValue();
        if(score==null){
            return null;
        }
        return score;
    }

}
