package com.gruppo.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "Ordine")
public class Ordine {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "COD")
	private int cod;

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "ordini")
	@JsonBackReference
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "Ordini_Pizze", 
		    joinColumns = @JoinColumn(name = "ordine"), 
		    inverseJoinColumns = @JoinColumn(name = "pizza"))
	private Set<Pizza> pizze = new HashSet<>();
	
	@Column(name = "Data")
	private String data;
	
	@Column(name = "StatoOrdine")
	private String statoOrdine;
	
	public Set<Pizza> getPizze() {
		return pizze;
	}
	public void setPizze(Set<Pizza> pizze) {
		this.pizze = pizze;
	}
	public int getCod() {
		return cod;
	}
	public void setCod(int cod) {
		this.cod = cod;
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
