package com.gruppo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.Ordine;
import com.gruppo.entities.OrdineP;
import com.gruppo.repos.OrdineDAO;

@Service
public class OrdiniServiceImpl implements OrdiniService{
	
	@Autowired
	private OrdineDAO dao;
	
	@Override
	public List<Ordine> getOrdine() {
		return dao.findAll();
	}
	
	public List<OrdineP> getFindAllOrdini(){
		return dao.findAllOrdini();
	}
	
	public Ordine saveOrdine(Ordine ordine) {
		return dao.save(ordine);
	}

	public Ordine aggiornaStatoOrdine(int ido) {
        dao.updateStatoOrdine(ido);
        return dao.findOrdineByCod(ido);
    }

	@Override
	public List<Ordine> getOrdineByStato(String stato) {
		return dao.findByStatoOrdineContaining(stato);
	}
}