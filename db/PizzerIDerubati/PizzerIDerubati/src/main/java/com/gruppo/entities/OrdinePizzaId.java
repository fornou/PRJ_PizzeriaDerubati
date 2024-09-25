package com.gruppo.entities;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class OrdinePizzaId implements Serializable {
	
	@Column(name = "ft_ordine")
    private int ordineId;

    @Column(name = "ft_pizza")
    private int pizzaId;

	public int getOrdineId() {
		return ordineId;
	}
	public void setOrdineId(int ordineId) {
		this.ordineId = ordineId;
	}
	public int getPizzaId() {
		return pizzaId;
	}
	public void setPizzaId(int pizzaId) {
		this.pizzaId = pizzaId;
	}
	@Override
	public int hashCode() {
		return Objects.hash(ordineId, pizzaId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OrdinePizzaId other = (OrdinePizzaId) obj;
		return ordineId == other.ordineId && pizzaId == other.pizzaId;
	}
}