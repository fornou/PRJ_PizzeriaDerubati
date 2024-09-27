package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gruppo.entities.OrdineIngrediente;

public interface OrdineIngredienteDAO extends JpaRepository<OrdineIngrediente, Integer> {
}