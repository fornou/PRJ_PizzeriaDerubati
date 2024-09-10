package com.gruppo.entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "ft_pizza")
public class Pizza {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idp")
    private int idp;

    @OneToMany(mappedBy = "pizza", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private Set<OrdinePizza> ordiniPizze = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "pizze")
    @JsonManagedReference
    @JsonIgnore
    private Set<Ingrediente> ingredienti = new HashSet<>();

    @Column(name = "Nome")
    private String nome;

    @Column(name = "Prezzo")
    private double prezzo;

    @Column(name = "Img")
    private String img;

    @Column(name = "Descrizione")
    private String descrizione;
    
    @Column(name = "Tipo")
    private String tipo;
	
	public int getIdp() {
		return idp;
	}
	public void setIdp(int idp) {
		this.idp = idp;
	}
	public Set<OrdinePizza> getOrdiniPizze() {
		return ordiniPizze;
	}
	public void setOrdiniPizze(Set<OrdinePizza> ordiniPizze) {
		this.ordiniPizze = ordiniPizze;
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
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
}
