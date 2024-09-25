package com.gruppo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gruppo.entities.Pizza;
import com.gruppo.entities.PizzaP;

public interface PizzaDAO extends JpaRepository<Pizza, Integer> {

    @Query(value = "select nome, prezzo, img, descrizione, tipo from ft_pizza", nativeQuery = true)
    public List<Pizza> findPizze();

    @Query(value = "select distinct(tipo) from ft_pizza", nativeQuery = true)
	public List<String> findDistinctTipo();
    
    @Query("SELECT p.idp AS idp, p.nome AS nome, p.prezzo AS prezzo, p.img AS img, p.descrizione AS descrizione, p.tipo AS tipo FROM Pizza p")
    List<PizzaP> findPizzeP();
    
    @Query("SELECT p.idp AS idp, p.nome AS nome, p.prezzo AS prezzo, p.img AS img, p.descrizione AS descrizione, p.tipo AS tipo FROM Pizza p WHERE p.tipo LIKE %:tipo%")
    List<PizzaP> findByTipoContainingP(@Param("tipo") String tipo);

    public List<Pizza> findByTipoContaining(String tipo);
    
    @Query("SELECT p.idp AS idp, p.nome AS nome, p.prezzo AS prezzo, p.img AS img, p.descrizione AS descrizione, p.tipo AS tipo FROM Pizza p WHERE p.idp = :id")
    PizzaP findPizzaById(@Param("id") Integer id);
}

