package com.example.Zenith.service;

import com.example.Zenith.dto.LeaderBoardEntryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp. SimpMessagingTemplate;

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
}
