package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gruppo.entities.Pizza;

public interface PizzeriaDAO extends JpaRepository<Pizza, String>{
	
	public Pizza findByCodice(String codice);

}
