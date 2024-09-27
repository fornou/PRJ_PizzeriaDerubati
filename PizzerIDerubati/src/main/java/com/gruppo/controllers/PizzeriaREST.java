package com.gruppo.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
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
	public List<Pizza> getBevanda() {
		return pService.getPizzaByTipo("bevanda");
	}

	@GetMapping("dolci")
	public List<Pizza> getDolce() {
		return pService.getPizzaByTipo("dolce");
	}

	@GetMapping("calzoni")
	public List<Pizza> getCalzone() {
		return pService.getPizzaByTipo("calzone");
	}

	@GetMapping("focaccia")
	public List<Pizza> getFocaccia() {
		return pService.getPizzaByTipo("focaccia");
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
	
	@GetMapping("proj/ingredienti")
	public List<IngredienteP> getIngredientiP() {
		return iService.getAllIngredienti();
	}
	
	@GetMapping("ordini")
	public List<Ordine> getOrdine() {
		return oService.getOrdine();
	}
	
	@GetMapping("proj/ordini")
	public List<OrdineP> getOrdineP() {
		return oService.getFindAllOrdini();
	}

	@PostMapping("ordini/stato/aggiorna/{id}")
	public Ordine getOrdineAggiornato(@PathVariable Integer id) {
		return oService.aggiornaStatoOrdine(id);
	}

	@GetMapping("ordini/stato/{stato}")
	public List<Ordine> getOrdineByStato(@PathVariable String stato) {
		return oService.getOrdineByStato(stato);
	}

	/*@PostMapping("ordini")
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
	}*/
	
	/*@PostMapping("ordini")
	public Ordine creaOrdine(@RequestBody List<PizzaOrdineRequest> pizzeOrdineRequest) {
	    Ordine ordine = new Ordine();
	    Map<Integer, OrdinePizza> ordiniPizzeMap = new HashMap<>();
	    
	    for (PizzaOrdineRequest request : pizzeOrdineRequest) {
	        Pizza pizza = pService.getPizzaById(request.getPizzaId());
	        OrdinePizza ordinePizza = ordiniPizzeMap.get(pizza.getIdp());
	        
	        if (ordinePizza == null) {
	            ordinePizza = new OrdinePizza();
	            ordinePizza.setOrdine(ordine);
	            ordinePizza.setPizza(pizza);
	            ordinePizza.setQuantita(request.getQuantita());
	
	            OrdinePizzaId ordinePizzaId = new OrdinePizzaId();
	            ordinePizzaId.setOrdineId(ordine.getCod());
	            ordinePizzaId.setPizzaId(pizza.getIdp());
	            ordinePizza.setId(ordinePizzaId);
	
	            ordiniPizzeMap.put(pizza.getIdp(), ordinePizza);
	        } else {
	            ordinePizza.setQuantita(ordinePizza.getQuantita() + request.getQuantita());
	        }
	    }
	    
	    ordine.setOrdiniPizze(new HashSet<>(ordiniPizzeMap.values()));
	    ordine.setStatoOrdine("In Attesa");
	    ordine.setData(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
	    
	    return oService.saveOrdine(ordine);
	}*/
	
	@PostMapping("ordini")
	public Ordine creaOrdine(@RequestBody List<PizzaOrdineRequest> pizzeOrdineRequest) {
	    Ordine ordine = new Ordine();
	    Map<Integer, OrdinePizza> ordiniPizzeMap = new HashMap<>();

	    for (PizzaOrdineRequest request : pizzeOrdineRequest) {
	        Pizza pizza = pService.getPizzaById(request.getPizzaId());
	        OrdinePizza ordinePizza = ordiniPizzeMap.get(pizza.getIdp());

	        if (ordinePizza == null) {
	            ordinePizza = new OrdinePizza();
	            ordinePizza.setOrdine(ordine);
	            ordinePizza.setPizza(pizza);
	            ordinePizza.setQuantita(request.getQuantita());

	            OrdinePizzaId ordinePizzaId = new OrdinePizzaId();
	            ordinePizzaId.setOrdineId(ordine.getCod());
	            ordinePizzaId.setPizzaId(pizza.getIdp());
	            ordinePizza.setId(ordinePizzaId);

	            ordiniPizzeMap.put(pizza.getIdp(), ordinePizza);
	        } else {
	            ordinePizza.setQuantita(ordinePizza.getQuantita() + request.getQuantita());
	        }

	        String ingredienti = String.join(", ", request.getIngredienti());

	        OrdineIngrediente ordineIngrediente = new OrdineIngrediente();
	        ordineIngrediente.setOrdine(ordine);
	        ordineIngrediente.setIngredienti(ingredienti);
	        ordineIngrediente.setQuantita(request.getQuantita());
	        ordine.getIngredientiPersonalizzati().add(ordineIngrediente);
	    }

	    ordine.setOrdiniPizze(new HashSet<>(ordiniPizzeMap.values()));
	    ordine.setStatoOrdine("In Attesa");
	    ordine.setData(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

	    return oService.saveOrdine(ordine);
	}
	
	@GetMapping("proj/pizze")
	public List<PizzaP> getPizzaP() {
	     return pService.getAllPizzeByTipo("pizza");
	}

	@GetMapping("proj/bevande")
    public List<PizzaP> getBevandaP() {
        return pService.getAllPizzeByTipo("bevanda");
    }

    @GetMapping("proj/dolci")
    public List<PizzaP> getDolceP() {
        return pService.getAllPizzeByTipo("dolce");
    }

    @GetMapping("proj/calzoni")
    public List<PizzaP> getCalzoneP() {
        return pService.getAllPizzeByTipo("calzone");
    }

    @GetMapping("proj/focaccia")
    public List<PizzaP> getFocacciaP() {
        return pService.getAllPizzeByTipo("focaccia");
    }

    @GetMapping("proj/pizze/tipi")
    public List<String> getPizzaTipiP() {
        return pService.getPizzaTipi();
    }

    @GetMapping("proj/pizze/tipo/{tipo}")
    public List<PizzaP> getPizzaByTipoP(@PathVariable String tipo) {
        return pService.getAllPizzeByTipo(tipo);
    }
    
    @GetMapping("proj/pizze/codice/{id}")
    public PizzaP getPizzaByIdP(@PathVariable Integer id) {
        return pService.getAllPizzaById(id);
    }	
}
