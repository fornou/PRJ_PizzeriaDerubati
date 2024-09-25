package com.gruppo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.Pizza;
import com.gruppo.repos.PizzaDAO;

@Service
public class PizzeServiceImpl implements PizzeService{
	
	@Autowired
	private PizzaDAO dao;
	
	@Override
	public List<Pizza> getPizza() {
		return dao.findAll();
	}
	
	public Pizza getPizzaById(Integer id) {
		return dao.findById(id).orElse(null);
	}
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
}