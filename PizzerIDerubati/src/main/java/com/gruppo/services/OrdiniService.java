package com.gruppo.services;

import java.util.List;

import com.gruppo.entities.Ordine;
import com.gruppo.entities.OrdineP;

public interface OrdiniService {
	List<Ordine> getOrdine();
	List<Ordine> getOrdineByStato(String stato);
	Ordine saveOrdine(Ordine ordine);
	Ordine aggiornaStatoOrdine(int ido);
	List<OrdineP> getFindAllOrdini();

}