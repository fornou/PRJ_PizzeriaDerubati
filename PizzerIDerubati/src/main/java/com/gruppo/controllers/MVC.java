package com.gruppo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MVC {
	
	@GetMapping("")
	String home() {
		return "home";
	}
	
	@GetMapping("pizze")
	public String getPizze() { 
		return "pizze";
	}

	@GetMapping("pizze2")
	public String getPizze2() { 
		return "pizze2";
	}
	
	@GetMapping("ordini")
	public String getOrdini() { 
		return "ordini";
	}
	
	@GetMapping("carrello")
	public String getCarrello() { 
		return "carrello";
	}
}