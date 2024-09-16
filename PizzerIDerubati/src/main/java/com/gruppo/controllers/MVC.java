package com.gruppo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MVC {
	
	@GetMapping("")
	String home() {
		return "home";
	}

	@GetMapping("home")
	String home2() {
		return "home";
	}
	
	@GetMapping("pizze")
	public String getPizze() { 
		return "pizze";
	}

	@GetMapping("bevande")
	public String getBevande() { 
		return "bevande";
	}

	@GetMapping("dolci")
	public String getDolci() { 
		return "dolci";
	}

	@GetMapping("focacce")
	public String getFocacce() { 
		return "focacce";
	}

	@GetMapping("calzoni")
	public String getCalzoni() { 
		return "calzoni";
	}

	@GetMapping("menu")
	public String getMenu() { 
		return "menu";
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