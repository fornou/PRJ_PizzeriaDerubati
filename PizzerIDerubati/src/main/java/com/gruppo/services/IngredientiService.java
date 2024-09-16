package com.gruppo.services;

import java.util.List;

import com.gruppo.entities.Ingrediente;

public interface IngredientiService {
    public List<Ingrediente> getIngredienti();
    public Ingrediente getIngredienteById(int id);
    public Ingrediente getIngredienteByNome(String nome);
}
