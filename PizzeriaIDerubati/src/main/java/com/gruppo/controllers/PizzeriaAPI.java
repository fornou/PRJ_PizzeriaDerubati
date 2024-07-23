package com.gruppo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gruppo.entities.Pizza;
import com.gruppo.services.PizzeriaService;

@RestController
@RequestMapping("api")
public class PizzeriaAPI {
	
	@Autowired
	private PizzeriaService service;
	
	@GetMapping("/pizze")
    public ResponseEntity<List<Pizza>> getProdotti() {
        List<Pizza> pizze = service.getPizze();
        return new ResponseEntity<>(pizze, HttpStatus.OK);
    }
	
	
	@GetMapping("/pizze/codice/{codice}")
	public Pizza getPizzaByCodice(@PathVariable String codice) {
		return service.getPizzaByCodice(codice);
	}

}
