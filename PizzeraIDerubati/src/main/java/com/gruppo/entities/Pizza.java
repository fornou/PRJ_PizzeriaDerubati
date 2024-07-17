package com.gruppo.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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
@Table(name = "Pizza")
public class Pizza {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDP")
	private int idp;
	  
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "Ordini_Pizze", 
	    joinColumns = @JoinColumn(name = "pizza"), 
	    inverseJoinColumns = @JoinColumn(name = "ordine"))
	@JsonManagedReference
    private Set<Ordine> ordini = new HashSet<>();
    
    @Column(name = "Nome")
	private String nome;
	@Column(name = "Prezzo")
	private double prezzo;
	@Column(name = "ImgURL")
	private String imgURL;
	
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
	public String getImgURL() {
		return imgURL;
	}
	public void setImgURL(String imgURL) {
		this.imgURL = imgURL;
	}
}
