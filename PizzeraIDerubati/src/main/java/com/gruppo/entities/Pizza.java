package com.gruppo.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "Pizza")
public class Pizza {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDP")
	private int idp;
	  
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "pizze")
	@JsonIgnore
    private Set<Ordine> ordini = new HashSet<>();
    
    @Column(name = "Nome")
	private String nome;
	@Column(name = "Prezzo")
	private double prezzo;
	@Column(name = "Img")
	private String img;
	
	public int getIdp() {
		return idp;
	}
	public void setIdp(int idp) {
		this.idp = idp;
	}
	public Set<Ordine> getOrdini() {
		return ordini;
	}
	public void setOrdini(Set<Ordine> ordini) {
		this.ordini = ordini;
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
	public String getImg() {
		return img;
	}
	public void setImg(String imgURL) {
		this.img= imgURL;
	}
}
