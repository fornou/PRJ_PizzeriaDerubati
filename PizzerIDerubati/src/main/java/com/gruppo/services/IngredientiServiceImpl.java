package com.gruppo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gruppo.entities.Ingrediente;
import com.gruppo.entities.IngredienteP;
import com.gruppo.repos.IngredienteDAO;

@Service
public class IngredientiServiceImpl implements IngredientiService{
    @Autowired
    private IngredienteDAO dao;

    @Override
    public List<Ingrediente> getIngredienti(){
        return dao.findAll();
    }

    @Override
    public Ingrediente getIngredienteById(int id) {
        return dao.findById(id).orElse(null);
    }

    @Override
    public Ingrediente getIngredienteByNome(String nome) {
        return dao.findByNome(nome);
    }
    
    public List<IngredienteP> getAllIngredienti() {
	    return dao.findIngredientiP();
	}
}
