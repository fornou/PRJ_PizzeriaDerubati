package com.gruppo.controllers;

import java.util.HashSet;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

	@Autowired
	private IngredientiService iService;
	
	@GetMapping("pizze")
	public List<Pizza> getPizza() {
		return pService.getPizzaByTipo("pizza");
	}

	@GetMapping("bevande")
	public List<Pizza> getBevande() {
		return pService.getPizzaByTipo("bevanda");
	}

	@GetMapping("dolci")
	public List<Pizza> getDolce() {
		return pService.getPizzaByTipo("dolce");
	}
	
	@GetMapping("pizze/codice/{id}")
	public Pizza getPizzaById(@PathVariable Integer id) {
		return pService.getPizzaById(id);
	}

	@GetMapping("pizze/tipi")
	public List<String> getPizzaTipi() {
		return pService.getPizzaTipi();
	}

	@GetMapping("pizze/tipo/{tipo}")
	public List<Pizza> getPizzaByTipo(@PathVariable String tipo) {
		return pService.getPizzaByTipo(tipo);
	}

	@GetMapping("ingredienti")
	public List<Ingrediente> getIngredienti() {
		return iService.getIngredienti();
	}
	
	
	@GetMapping("ordini")
	public List<Ordine> getOrdine() {
		return oService.getOrdine();
	}
	
	@PostMapping("ordini")
	public Ordine creaOrdine(@RequestBody List<PizzaOrdineRequest> pizzeOrdineRequest) {
	    Ordine ordine = new Ordine();
	    Set<OrdinePizza> ordiniPizze = new HashSet<>();
	    for (int i = 0; i < pizzeOrdineRequest.size(); i++) {
	        PizzaOrdineRequest request = pizzeOrdineRequest.get(i);
	        Pizza pizza = pService.getPizzaById(request.getPizzaId());
	        OrdinePizza ordinePizza = new OrdinePizza();
	        ordinePizza.setOrdine(ordine);
	        ordinePizza.setPizza(pizza);
	        ordinePizza.setQuantita(request.getQuantita());

	        OrdinePizzaId ordinePizzaId = new OrdinePizzaId();
	        ordinePizzaId.setOrdineId(ordine.getCod());
	        ordinePizzaId.setPizzaId(pizza.getIdp());
	        ordinePizza.setId(ordinePizzaId);

	        ordiniPizze.add(ordinePizza);
	    }
	    ordine.setOrdiniPizze(ordiniPizze);
	    ordine.setStatoOrdine("In Attesa");
		
		ordine.setData(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
	    return oService.saveOrdine(ordine);
	}
	
	
}
