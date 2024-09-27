package com.gruppo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.gruppo.entities.Ordine;
import com.gruppo.entities.OrdineP;

public interface OrdineDAO extends JpaRepository<Ordine, Integer> {

    // Aggiorna lo stato di un ordine
    @Modifying
    @Transactional
    @Query(value = "UPDATE ft_ordine SET stato = 'Fatto' WHERE ido = :ido", nativeQuery = true)
    void updateStatoOrdine(@Param("ido") int ido);

    Ordine findOrdineByCod(int ido);

    List<Ordine> findByStatoOrdineContaining(String statoOrdine);
    
    @Query("SELECT o.cod AS cod, o.data AS data, o.statoOrdine AS statoOrdine, " +
    	       "op AS ordiniPizze " +
    	       "FROM Ordine o " +
    	       "JOIN o.ordiniPizze op")
    List<OrdineP> findAllOrdini();
}
