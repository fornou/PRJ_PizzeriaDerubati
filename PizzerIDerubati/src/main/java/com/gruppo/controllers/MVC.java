package com.gruppo.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MVC {
	
	@GetMapping("")
	String index() {
		return "index";
	}

	@GetMapping("home")
	String home() {
		return "home";
	}
	
	@GetMapping("pizza")
	public String getPizze() { 
		return "pizza";
	}

	@GetMapping("bevanda")
	public String getBevande() { 
		return "bevanda";
	}

	@GetMapping("dolce")
	public String getDolci() { 
		return "dolce";
	}

	@GetMapping("focaccia")
	public String getFocacce() { 
		return "focaccia";
	}

	@GetMapping("calzone")
	public String getCalzoni() { 
		return "calzone";
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