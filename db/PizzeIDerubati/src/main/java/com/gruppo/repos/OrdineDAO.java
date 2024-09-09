package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gruppo.entities.Ordine;

public interface OrdineDAO extends JpaRepository<Ordine, Integer> {}
