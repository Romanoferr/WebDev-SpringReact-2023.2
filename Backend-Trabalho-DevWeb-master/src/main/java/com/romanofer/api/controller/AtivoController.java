package com.romanofer.api.controller;

import com.romanofer.api.dto.AtivoDto;
import com.romanofer.api.model.Ativo;
import com.romanofer.api.model.TipoAtivo;
import com.romanofer.api.service.AtivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("ativos")
public class AtivoController {

	@Autowired
	private AtivoService ativoService;

	//ok
	@GetMapping("/comTipoAtivo")
	public List<Ativo> recuperarAtivos() {
		return ativoService.recuperarAtivosComTipoAtivo();
	}

	@GetMapping("/all")
	public List<Ativo> recuperarTodosAtivos() {
		return ativoService.recuperarTodosAtivos();
	}

	@GetMapping("/totalPagina")
	public long totalPaginaAtivo() {
		return ativoService.totalPaginaTipoAtivo();
	}

	@GetMapping
	public Page<Ativo> recuperarTiposAtivo(@RequestParam(defaultValue = "0") int page,
										   @RequestParam(defaultValue = "6") int size) {
		return ativoService.recuperarAtivo(PageRequest.of(page-1, size));
	}

	@PostMapping
	public Ativo cadastrarAtivo(@RequestBody AtivoDto ativoDto) {
		return ativoService.cadastrarAtivo(ativoDto);
	}

	@PutMapping("/{id}")
	public Ativo alterarAtivo(@RequestBody AtivoDto ativoDto, @PathVariable long id) {
		return ativoService.alterarAtivo(ativoDto, id);
	}

	@DeleteMapping("{idAtivo}")
	public void removerAtivo(@PathVariable("idAtivo") Long id) {
		ativoService.removerAtivo(id);
	}

	@GetMapping("ticker/{ticker}")
	public List<Ativo> recuperarAtivosPorTicker(@PathVariable("ticker") String ticker) {
		return ativoService.recuperarAtivoPorTicker(ticker);
	}

	@GetMapping("/{idAtivo}")
	public Ativo recuperarAtivoPorId(@PathVariable("idAtivo") Long id) {
		return ativoService.recuperarAtivoPorId(id);
	}

	@GetMapping("tipoAtivo/{idAtivo}/{slug}")
	public List<Ativo> recuperarAtivosDeUmTipoPorId(@PathVariable("idAtivo") Long id, @PathVariable("slug") String slug) {
		return ativoService.recuperarAtivosDeUmTipoPorId(id);
	}



}
