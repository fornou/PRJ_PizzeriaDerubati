package com.gruppo.services;

import java.util.List;

import com.gruppo.entities.Ingrediente;
import com.gruppo.entities.IngredienteP;

public interface IngredientiService {
    public List<Ingrediente> getIngredienti();
    public Ingrediente getIngredienteById(int id);
    public Ingrediente getIngredienteByNome(String nome);
    public List<IngredienteP> getAllIngredienti();
}
