package com.romanofer.api.service;


import com.romanofer.api.dto.AtivoDto;
import com.romanofer.api.exception.EntidadeDestacadaException;
import com.romanofer.api.exception.EntidadeNaoEncontradaException;
import com.romanofer.api.exception.EntidadeTransienteException;
import com.romanofer.api.model.Ativo;
import com.romanofer.api.model.TipoAtivo;
import com.romanofer.api.repository.AtivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class AtivoService {

	@Autowired
	private AtivoRepository ativoRepository;

	@Autowired
	private TipoAtivoService tipoAtivoService;

	public List<Ativo> recuperarAtivosComTipoAtivo() {
		return ativoRepository.recuperarAtivosComTipoAtivo();
	}

	public Ativo cadastrarAtivo(AtivoDto ativoDto) {
		TipoAtivo tipoAtivo = tipoAtivoService.getTipoAtivoById(ativoDto.getIdTipoAtivo());
		Ativo ativo = Ativo.builder()
				.ticker(ativoDto.getTicker())
				.nome(ativoDto.getNome())
				.setor(ativoDto.getSetor())
				.precoFechamento(ativoDto.getPrecoFechamento())
				.volumeAnualizado(ativoDto.getVolumeAnualizado())
				.dyAnualizado(ativoDto.getDyAnualizado())
				.lucroAnualizado(ativoDto.getLucroAnualizado())
				.roeAnualizado(ativoDto.getRoeAnualizado())
				.pesoIdxRef(ativoDto.getPesoIdxRef())
				.tipoAtivo(tipoAtivo)
				.build();

		return ativoRepository.save(ativo);
	}

	public Ativo alterarAtivo(AtivoDto ativoDto, long id) {

		TipoAtivo tipoAtivo = tipoAtivoService.getTipoAtivoById(ativoDto.getIdTipoAtivo());

		Ativo targetAtivo = ativoRepository.findById(id)
				.orElseThrow(() -> new EntidadeDestacadaException("Erro ao procurar Ativo com id = " + id));

		targetAtivo.setTicker(ativoDto.getTicker());
		targetAtivo.setNome(ativoDto.getNome());
		targetAtivo.setSetor(ativoDto.getSetor());
		targetAtivo.setPrecoFechamento(ativoDto.getPrecoFechamento());
		targetAtivo.setVolumeAnualizado(ativoDto.getVolumeAnualizado());
		targetAtivo.setDyAnualizado(ativoDto.getDyAnualizado());
		targetAtivo.setLucroAnualizado(ativoDto.getLucroAnualizado());
		targetAtivo.setRoeAnualizado(ativoDto.getRoeAnualizado());
		targetAtivo.setPesoIdxRef(ativoDto.getPesoIdxRef());
		targetAtivo.setTipoAtivo(tipoAtivo);

		return ativoRepository.save(targetAtivo);
	}

	@GetMapping
	public void removerAtivo(Long id) {
		ativoRepository.deleteById(id);
	}

	@GetMapping
	public Ativo recuperarAtivoPorId(Long id) {
		return ativoRepository.findById(id)
				.orElseThrow(() -> new EntidadeNaoEncontradaException(
						"Produto número " + id + " não encontrado"));
	}

	public List<Ativo> recuperarAtivosDeUmTipoPorId(Long id) {
		return ativoRepository.findByTipoAtivoId(id);
	}

	public List<Ativo> recuperarAtivoPorTicker(String ticker) {
		return ativoRepository.findByTicker(ticker);
	}

	public List<Ativo> recuperarTodosAtivos() {
		return ativoRepository.findAll();
	}

	public Long totalPaginaTipoAtivo() {
		return (long) Math.ceil((double) ativoRepository.findAll().size() / 6);
	}

	public Page<Ativo> recuperarAtivo(Pageable pageable) {
		return ativoRepository.findAll(pageable);
	}

}
