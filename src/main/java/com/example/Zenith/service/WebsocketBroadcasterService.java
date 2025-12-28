package com.example.Zenith.service;

import com.example.Zenith.dto.LeaderBoardEntryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp. SimpMessagingTemplate;

import java.util.List;

@Service
public class WebsocketBroadcasterService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    public void broadcastScoreUpdate(String username,Long score,Long rank){
        LeaderBoardEntryDto dto= new LeaderBoardEntryDto();
        dto.setUsername(username);
        dto.setRank(rank);
        dto.setScore(score);
        messagingTemplate.convertAndSend("/topic/leaderboard",dto);
    }
    public void broadcastFullTop10(List<LeaderBoardEntryDto> top10){

        messagingTemplate.convertAndSend("/topic/leaderboard/top10", top10);
    }

}
