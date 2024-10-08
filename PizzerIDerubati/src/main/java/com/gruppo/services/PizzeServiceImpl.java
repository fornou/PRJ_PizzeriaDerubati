package com.gruppo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.Pizza;
import com.gruppo.entities.PizzaP;
import com.gruppo.repos.PizzaDAO;

@Service
public class PizzeServiceImpl implements PizzeService{
	
	@Autowired
	private PizzaDAO dao;
	
	@Override
	public List<Pizza> getPizza() {
		return dao.findPizze();
	}
	
	public Pizza getPizzaById(Integer id) {
		return dao.findById(id).orElse(null);
	}

	@Override
	public List<Pizza> getPizzaByTipo(String tipo) {
		return dao.findByTipoContaining(tipo);
	}

	@Override
	public List<String> getPizzaTipi() {
		return dao.findDistinctTipo();
	}
	
	public List<PizzaP> getAllPizze() {
	    return dao.findPizzeP();
	}
	
	@Override
	public List<PizzaP> getAllPizzeByTipo(String tipo) {
	    return dao.findByTipoContainingP(tipo);
	}
	
	public PizzaP getAllPizzaById(Integer id) {
	    return dao.findPizzaById(id);
	}

	@Override
	public List<Pizza> deletePizza(Integer id) {
		dao.deleteById(id);
		return getPizza();
	}

	@Override
	public Pizza addPizza(Pizza p) {
		return dao.save(p);
	}
}
