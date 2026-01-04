# ⚡ Zenith - Reach the Peak

<div align="center">

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=spring&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

**Compete • Climb • Conquer**
**Real-time leaderboard. Top 10,000 players. Only the best survive.**

🌐 **[Live Demo](https://beautiful-mochi-3592a9.netlify.app/)** | 📡 **[API](https://zenith-v5nteqrs.b4a.run)**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [API Docs](#-api-documentation) • [Screenshots](#-screenshots)

</div>

---

## 🚀 Live Application

**🎯 Try it now:** [https://beautiful-mochi-3592a9.netlify.app/](https://beautiful-mochi-3592a9.netlify.app/)

- ⚡ **Real-Time Leaderboard** - Live rank updates powered by Redis and WebSockets.
- 🏆 **Top 10k Elite** - Highly optimized Redis Sorted Sets manage the top 10,000 players for ultra-fast retrieval.
- 📊 **Score History** - Persistent score tracking backed by PostgreSQL.
- 🔒 **Secure Authentication** - JWT-based stateless authentication.
- 🎨 **Vibe-Coded Frontend** - The entire frontend was vibe-coded using **Claude 4.5**. (Zero lines of frontend code manually written!)

---

## ✨ Features

### 🎯 Core Features

**High-Performance Leaderboard**
- **Redis Powered**: The top 10,000 ranks are served directly from Redis for sub-millisecond latency.
- **Postgres Fallback**: While the elite top 10k are cached in Redis, full score histories and persistent data are safely stored in PostgreSQL on Supabase.
- **Real-Time Updates**: WebSocket integration broadcasts score changes instantly to connected clients.

**User Experience**
- **Seamless Auth**: Secure signup and login flow using JWT.
- **Interactive Dashboard**: View your current rank, best score, and submission history.
- **Live Feed**: Watch the competition unfold in real-time.

---

## 🛠️ Tech Stack

### Backend (Spring Boot REST API)
```
Spring Boot 3.5      →  Core framework
Spring Security      →  JWT authentication
Spring Data Redis    →  High-speed leaderboard caching
Spring Data JPA      →  PostgreSQL ORM
WebSocket            →  Real-time event broadcasting
Docker               →  Containerization
Back4App             →  Container Deployment
```

### Frontend (React SPA)
```
React 19             →  UI Library
Vite                 →  Build tool
Tailwind CSS         →  Styling
Zustand              →  State management
React Query          →  Data fetching
Netlify              →  Hosting
```

> **Note:** The frontend was purely "vibe-coded" with **Claude 4.5**.

### Infrastructure
```
PostgreSQL (Supabase)  →  Primary database
Redis (RedisLabs)      →  Leaderboard cache
Back4App               →  Backend hosting
Netlify                →  Frontend hosting
```

---

## 📸 Screenshots

<div align="center">

### 🏠 Landing Page

![Landing Page](./screenshots/landing.png)
*Join the competition and reach the Zenith*

### 🔐 Authentication

| Login | Signup |
|:---:|:---:|
| ![Login Page](./screenshots/login.png) | ![Signup Page](./screenshots/signup.png) |
| *Welcome back, climber* | *Start your journey* |

### 📊 Dashboard & Leaderboard

![Dashboard](./screenshots/dashboard.png)
*Live rank, score submission, and history*

</div>

---

## 📡 API Documentation

### Base URL
```
https://zenith-v5nteqrs.b4a.run
```

---

### 🔹 Authentication

#### 1. Sign Up
**Endpoint:** `POST /auth/signup`

**Request:**
```json
{
  "username": "climber123",
  "email": "climber@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`
```
"User created please login"
```

#### 2. Log In
**Endpoint:** `POST /auth/login`

**Request:**
```json
{
  "email": "climber@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsIn...",
  "email": "climber@example.com",
  "username": "climber123"
}
```

---

### 🔹 Leaderboard & Scores

#### 1. Get Top 10
Retrieves the top 10 players from Redis.

**Endpoint:** `GET /leaderboard/top10`

**Response:** `200 OK`
```json
[
  {
    "username": "trigon",
    "score": 4000,
    "rank": 1
  },
  {
    "username": "random",
    "score": 3000,
    "rank": 2
  }
]
```

#### 2. Get User Rank
Checks the Redis Top 10k leaderboard for the user's rank.

**Endpoint:** `GET /leaderboard/rank?username={username}`

**Response:** `200 OK`
```json
4
```
*Returns 200 with message "User not in top 10,000" if outside top 10k.*

#### 3. Get User Score
Retrieves the user's best score. Fallback to PostgreSQL if not in Redis cache.

**Endpoint:** `GET /leaderboard/score?username={username}`

**Response:** `200 OK`
```json
4000
```

#### 4. Submit Score
Submits a new score. Updates Postgres and, if high enough, the Redis Leaderboard.

**Endpoint:** `POST /score/addscore`
**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "score": 5000
}
```

**Response:** `201 Created`
```
"score added"
```

#### 5. Get Score History
Retrieves all score submissions for the authenticated user from Postgres.

**Endpoint:** `GET /score/getscores`
**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "score": 4000,
    "submittedAt": "2025-01-04T10:00:00"
  },
  {
    "id": 2,
    "score": 3500,
    "submittedAt": "2025-01-03T09:00:00"
  }
]
```

---

## 🎥 Demo

<div align="center">
  <h3>Watch Zenith in Action</h3>
  <!-- Replace with actual demo link or embed -->
  <p><em>Coming Soon...</em></p>
</div>

---

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL
- Redis

### Backend Setup
1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/zenith.git
   cd zenith
   ```

2. **Configure Database**
   Update `src/main/resources/application.properties` with your Postgres and Redis credentials.

3. **Run Application**
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Dev Server**
   ```bash
   npm run dev
   ```

---

<div align="center">

### ⭐ Star this repo if you found it cool!

**Built with Spring Boot & React • Frontend Vibe-Coded by Claude 4.5**

[⬆ Back to Top](#-zenith---reach-the-peak)

</div>
