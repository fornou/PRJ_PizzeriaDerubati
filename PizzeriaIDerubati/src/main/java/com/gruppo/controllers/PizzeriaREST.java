package com.gruppo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.gruppo.services.PizzeriaService;

@Controller
public class PizzeriaREST {

	@Autowired
	private PizzeriaService service;
	
	@GetMapping("/home")
	public String home(@RequestParam(required = false) String param, Model m) {
		m.addAttribute("pizze", service.getPizze());
		return "homepage";
	}
}
