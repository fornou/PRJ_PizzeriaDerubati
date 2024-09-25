package com.gruppo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gruppo.entities.Ingrediente;
import com.gruppo.entities.IngredienteP;

public interface IngredienteDAO extends JpaRepository<Ingrediente, Integer>{
    public Ingrediente findByNome(String nome);
    
    @Query("SELECT e.idp AS idp, e.nome AS nome, e.prezzo AS prezzo FROM Ingrediente e")
    List<IngredienteP> findIngredientiP();
}

