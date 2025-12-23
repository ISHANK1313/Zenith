package com.example.Zenith.repository;

import com.example.Zenith.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepo extends JpaRepository<Users,Long> {

    Optional<Users> findByUsername(String username);
     boolean existsByUsername(String Username);
    Optional<Users> findById(Long Id);
    Optional<Users> findByEmail(String email);
    boolean existsByEmail(String email);
}
