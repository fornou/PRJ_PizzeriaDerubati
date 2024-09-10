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
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;


@Entity
@Table(name = "ft_Ingrediente")
public class Ingrediente {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int idp;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JsonBackReference
	@JoinTable(
			name = "ft_Pizze_Ingredienti", 
		    joinColumns = @JoinColumn(name = "id_pizza"), 
		    inverseJoinColumns = @JoinColumn(name = "id_ingrediente"))
	private Set<Pizza> pizze = new HashSet<>();

    @Column(name = "Nome")
    private String nome;

    @Column(name = "Prezzo")
    private double prezzo;

    public int getIdp() {
		return idp;
	}

	public void setIdp(int idp) {
		this.idp = idp;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public double getPrezzo() {
		return prezzo;
	}

	public void setPrezzo(double prezzo) {
		this.prezzo = prezzo;
	}

}


