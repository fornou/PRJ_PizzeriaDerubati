package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gruppo.entities.Ingrediente;

public interface IngredienteDAO extends JpaRepository<Ingrediente, Integer>{
    public Ingrediente findByNome(String nome);
}
