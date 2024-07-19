package com.gruppo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gruppo.entities.Pizza;
import com.gruppo.services.PizzeriaService;

@RestController
@RequestMapping("api")
public class PizzeriaREST {

	@Autowired
	private PizzeriaService service;
	
	@GetMapping("/pizze")
	public List<Pizza> getPizze(){
		return service.getPizze();
	}
	
	@GetMapping("/pizze/codice/{codice}")
	public Pizza getPizzaByCodice(@PathVariable String codice) {
		return service.getPizzaByCodice(codice);
	}
}
