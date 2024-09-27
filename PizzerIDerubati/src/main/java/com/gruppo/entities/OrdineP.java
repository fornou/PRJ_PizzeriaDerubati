package com.gruppo.entities;

import java.util.Set;

public interface OrdineP {
	int getCod();
	Set<OrdinePizzaP> getOrdiniPizze();
	String getData();
	String getStatoOrdine();
}
