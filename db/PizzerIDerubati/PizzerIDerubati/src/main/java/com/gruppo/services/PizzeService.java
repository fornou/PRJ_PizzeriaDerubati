package com.gruppo.services;

import java.util.List;

import com.gruppo.entities.Pizza;

public interface PizzeService {
	List<Pizza> getPizza();
	Pizza getPizzaById(Integer id);

}
