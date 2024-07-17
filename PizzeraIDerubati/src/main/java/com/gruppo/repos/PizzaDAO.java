package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gruppo.entities.Pizza;

public interface PizzaDAO extends JpaRepository<Pizza, Integer> {}

