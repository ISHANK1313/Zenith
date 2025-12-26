package com.example.Zenith.repository;

import com.example.Zenith.entity.Scores;
import com.example.Zenith.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ScoresRepo extends JpaRepository<Scores,Long> {
    Optional<List<Scores>> findByUsers(Users users);
    List<Scores>findByUsersOrderBySubmittedAtDesc(Users users);


}
