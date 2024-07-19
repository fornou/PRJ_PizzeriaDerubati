package com.gruppo.services;

import java.util.List;

import com.gruppo.entities.Pizza;

public interface PizzeriaService {
	
	List<Pizza> getPizze();
	Pizza getPizzaByCodice(String codice);

}
