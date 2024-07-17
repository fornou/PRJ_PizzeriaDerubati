package com.gruppo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gruppo.entities.*;
import com.gruppo.services.*;

@RestController
@RequestMapping("api")
public class PizzeriaREST {
	
	@Autowired
	private PizzeService pService;
	
	@Autowired
	private OrdiniService oService;
	
	@GetMapping("pizze")
	public List<Pizza> getPizza() {
		return pService.getPizza();
	}
	
	@GetMapping("ordini")
	public List<Ordine> getOrdine() {
		return oService.getOrdine();
	}
}
