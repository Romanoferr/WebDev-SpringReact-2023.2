package com.romanofer.api.controller;

import com.romanofer.api.model.TipoAtivo;
import com.romanofer.api.service.TipoAtivoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("tiposAtivo")
public class TipoAtivoController {

	@Autowired
	private TipoAtivoService tipoAtivoService;

	@GetMapping
	public Page<TipoAtivo> recuperarTiposAtivo(@RequestParam(defaultValue = "0") int page,
											   @RequestParam(defaultValue = "3") int size) {
		return tipoAtivoService.recuperarTiposAtivo(PageRequest.of(page-1, size));
	}

	@GetMapping("/{id}")
	public TipoAtivo recuperaTipoAtivoById(@PathVariable long id) {
		return tipoAtivoService.getTipoAtivoById(id);
	}

	@GetMapping("/all")
	public List<TipoAtivo> recuperaTipoAtivoById() {
		return tipoAtivoService.recuperarTodosTiposAtivo();
	}

	@GetMapping("/totalPagina")
	public long totalPaginaTipoAtivo() {
		return tipoAtivoService.totalPaginaTipoAtivo();
	}

	@PutMapping("/{id}")
	public TipoAtivo editarTipoAtivo(@RequestBody TipoAtivo tipoAtivo, @PathVariable long id) {
		return tipoAtivoService.editarTipoAtivo(tipoAtivo, id);
	}

	@DeleteMapping("/{id}")
	public TipoAtivo editarTipoAtivo(@PathVariable long id) {
		return tipoAtivoService.deletarTipoAtivo(id);
	}

	@PostMapping
	public TipoAtivo salvarTipoAtivo(@RequestBody TipoAtivo tipoAtivo) {
		return tipoAtivoService.salverTipoAtivo(tipoAtivo);
	}
}
