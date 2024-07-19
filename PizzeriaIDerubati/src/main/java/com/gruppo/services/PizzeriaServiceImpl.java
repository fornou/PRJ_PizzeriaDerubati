package com.gruppo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.Pizza;
import com.gruppo.repos.PizzeriaDAO;
@Service
public class PizzeriaServiceImpl implements PizzeriaService {
	
	@Autowired
	PizzeriaDAO pizzaDao;

	@Override
	public List<Pizza> getPizze() {
		return pizzaDao.findAll();
	}

	@Override
	public Pizza getPizzaByCodice(String codice) {
		return pizzaDao.findByCodice(codice);
	}

}
