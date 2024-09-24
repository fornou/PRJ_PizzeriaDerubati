package com.gruppo.services;

import java.util.List;

import com.gruppo.entities.Pizza;
import com.gruppo.entities.PizzaP;

public interface PizzeService {
	List<Pizza> getPizza();
	Pizza getPizzaById(Integer id);
	List<String> getPizzaTipi();
	List<Pizza> getPizzaByTipo(String tipo);
	List<PizzaP> getAllPizzeByTipo(String tipo);
	List<PizzaP> getAllPizze();
}
