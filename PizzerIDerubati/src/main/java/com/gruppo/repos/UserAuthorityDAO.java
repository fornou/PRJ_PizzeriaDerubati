package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gruppo.entities.UserAuthority;
import com.gruppo.entities.UserAuthorityId;

public interface UserAuthorityDAO extends JpaRepository<UserAuthority, UserAuthorityId> {
}