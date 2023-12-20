package com.romanofer.api.service;

import com.romanofer.api.exception.EntidadeDestacadaException;
import com.romanofer.api.model.TipoAtivo;
import com.romanofer.api.repository.TipoAtivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoAtivoService {

	@Autowired
	private TipoAtivoRepository tipoAtivoRepository;

	public Long totalPaginaTipoAtivo() {
		return (long) Math.ceil((double) tipoAtivoRepository.findAll().size() /3);
	}

	public Page<TipoAtivo> recuperarTiposAtivo(Pageable pageable) {
		return tipoAtivoRepository.findAll(pageable);
	}

	public TipoAtivo salverTipoAtivo(TipoAtivo tipoAtivo) {
		return tipoAtivoRepository.save(tipoAtivo);
	}

	public TipoAtivo editarTipoAtivo(TipoAtivo tipoAtivo, long id) {
		TipoAtivo tipoAtivoFromDatabase = tipoAtivoRepository.findById(id)
				.orElseThrow(() -> new EntidadeDestacadaException("Erro ao editar Tipo Ativo com id = " + id));
		tipoAtivoFromDatabase.setNome(tipoAtivo.getNome());
		tipoAtivoFromDatabase.setSlug(tipoAtivo.getSlug());
		return tipoAtivoRepository.save(tipoAtivo);
	}

	public TipoAtivo getTipoAtivoById(long id) {
		return tipoAtivoRepository.findById(id)
				.orElseThrow(() -> new EntidadeDestacadaException("Erro ao procurar Tipo Ativo com id = " + id));
	}

	public TipoAtivo deletarTipoAtivo(long id) {
		TipoAtivo targetTipoAtivo = tipoAtivoRepository.findById(id)
				.orElseThrow(() -> new EntidadeDestacadaException("Erro ao deletar Tipo Ativo com id = " + id));
		tipoAtivoRepository.delete(targetTipoAtivo);
		return targetTipoAtivo;
	}

	public List<TipoAtivo> recuperarTodosTiposAtivo() {
		return tipoAtivoRepository.findAll();
	}
}
