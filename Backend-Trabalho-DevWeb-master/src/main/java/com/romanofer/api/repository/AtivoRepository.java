package com.romanofer.api.repository;

import com.romanofer.api.model.Ativo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AtivoRepository extends JpaRepository<Ativo, Long> {

    @Query("select a from Ativo a inner join a.tipoAtivo t order by a.id")
    List<Ativo> recuperarAtivosComTipoAtivo();

    List<Ativo> findByTipoAtivoId(Long id);

    @Query("select a from Ativo a where a.ticker = ?1")
    List<Ativo> findByTicker(String ticker);
}
