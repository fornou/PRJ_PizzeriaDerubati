package com.gruppo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gruppo.entities.Pizza;

public interface PizzaDAO extends JpaRepository<Pizza, Integer> {

    @Query(value = "select distinct(tipo) from ft_pizza", nativeQuery = true)
	public List<String> findDistinctTipo();

    public List<Pizza> findByTipoContaining(String tipo);

}

