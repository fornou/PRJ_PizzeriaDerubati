package com.gruppo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gruppo.entities.Pizza;
@Repository
public interface PizzeriaDAO extends JpaRepository<Pizza, String>{
	
	public Pizza findByCodProd(String codice);

}
