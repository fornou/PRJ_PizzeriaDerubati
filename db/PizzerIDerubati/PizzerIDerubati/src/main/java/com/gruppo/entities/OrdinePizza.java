package com.gruppo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "ft_ordini_pizze")
public class OrdinePizza {
	@EmbeddedId
    private OrdinePizzaId id = new OrdinePizzaId();

    @ManyToOne
    @MapsId("ordineId")
    @JsonBackReference
    private Ordine ordine;

    @ManyToOne
    @MapsId("pizzaId")
    @JsonManagedReference
    private Pizza pizza;

    @Column(name = "quantita")
    private int quantita;
    
    public OrdinePizzaId getId() {
 		return id;
 	}
 	public void setId(OrdinePizzaId id) {
 		this.id = id;
 	}
 	public Ordine getOrdine() {
 		return ordine;
 	}
 	public void setOrdine(Ordine ordine) {
 		this.ordine = ordine;
 	}
 	public Pizza getPizza() {
 		return pizza;
 	}
 	public void setPizza(Pizza pizza) {
 		this.pizza = pizza;
 	}
 	public int getQuantita() {
 		return quantita;
 	}
 	public void setQuantita(int quantita) {
 		this.quantita = quantita;
 	}
 }
