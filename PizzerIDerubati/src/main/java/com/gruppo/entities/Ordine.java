package com.gruppo.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "ft_ordine")
public class Ordine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ido")
	private int cod;

	@OneToMany(mappedBy = "ordine", cascade = CascadeType.ALL)
    @JsonManagedReference
	private Set<OrdinePizza> ordiniPizze = new HashSet<>();
	
	@OneToMany(mappedBy = "ordine", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private Set<OrdineIngrediente> ingredientiPersonalizzati = new HashSet<>();

    @Column(name = "Data")
    private String data;

    @Column(name = "Stato")
    private String statoOrdine;
	
	public int getCod() {
		return cod;
	}
	public void setCod(int cod) {
		this.cod = cod;
	}
	public Set<OrdinePizza> getOrdiniPizze() {
		return ordiniPizze;
	}
	public void setOrdiniPizze(Set<OrdinePizza> ordiniPizze) {
		this.ordiniPizze = ordiniPizze;
	}
	public Set<OrdineIngrediente> getIngredientiPersonalizzati() {
		return ingredientiPersonalizzati;
	}
	public void setIngredientiPersonalizzati(Set<OrdineIngrediente> ingredientiPersonalizzati) {
		this.ingredientiPersonalizzati = ingredientiPersonalizzati;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getStatoOrdine() {
		return statoOrdine;
	}
	public void setStatoOrdine(String statoOrdine) {
		this.statoOrdine = statoOrdine;
	}
}
