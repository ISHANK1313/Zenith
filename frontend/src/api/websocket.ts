import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { WS_URL } from '../utils/constants';
import type { WebSocketMessage, LeaderboardEntry } from '../types';

export class WebSocketService {
  private client: Client | null = null;
  private onScoreUpdateCallback: ((data: WebSocketMessage) => void) | null = null;
  private onTop10UpdateCallback: ((data: LeaderboardEntry[]) => void) | null = null;

  connect(
    onConnect: () => void,
    onError: (error: any) => void
  ) {
    this.client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('WebSocket connected');
        this.subscribeToTopics();
        onConnect();
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        onError(frame);
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error:', error);
        onError(error);
      },
    });

    this.client.activate();
  }

  private subscribeToTopics() {
    if (!this.client) return;

    // Subscribe to individual score updates
    this.client.subscribe('/topic/leaderboard', (message) => {
      const data: WebSocketMessage = JSON.parse(message.body);
      if (this.onScoreUpdateCallback) {
        this.onScoreUpdateCallback(data);
      }
    });

    // Subscribe to top 10 updates
    this.client.subscribe('/topic/leaderboard/top10', (message) => {
      const data: LeaderboardEntry[] = JSON.parse(message.body);
      if (this.onTop10UpdateCallback) {
        this.onTop10UpdateCallback(data);
      }
    });
  }

  onScoreUpdate(callback: (data: WebSocketMessage) => void) {
    this.onScoreUpdateCallback = callback;
  }

  onTop10Update(callback: (data: LeaderboardEntry[]) => void) {
    this.onTop10UpdateCallback = callback;
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }
}

export const wsService = new WebSocketService();