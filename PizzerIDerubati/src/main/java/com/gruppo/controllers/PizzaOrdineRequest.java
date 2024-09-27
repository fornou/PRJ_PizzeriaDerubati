package com.gruppo.controllers;

import java.util.List;

public class PizzaOrdineRequest {
    private int pizzaId;
    private int quantita;
    private List<String> ingredienti;
	
    public int getPizzaId() {
		return pizzaId;
	}
	public void setPizzaId(int pizzaId) {
		this.pizzaId = pizzaId;
	}
	public int getQuantita() {
		return quantita;
	}
	public void setQuantita(int quantita) {
		this.quantita = quantita;
	}
	public List<String> getIngredienti() { 
	    return ingredienti;
	}
	public void setIngredienti(List<String> ingredienti) {
	    this.ingredienti = ingredienti;
	}
	
}
