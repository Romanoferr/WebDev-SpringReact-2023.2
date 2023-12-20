package com.romanofer.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Ativo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String ticker;
	private String nome;
	private String setor;
	private double precoFechamento;
	private double volumeAnualizado;
	private double dyAnualizado;

	@Column(nullable = true)
	private Double lucroAnualizado;
	@Column(nullable = true)
	private Double roeAnualizado;
	@Column(nullable = true)
	private Double pesoIdxRef;

	@ManyToOne
	@JoinColumn(name = "tipo_ativo_id")
	private TipoAtivo tipoAtivo;

	public Ativo(String ticker, String nome, String setor, double precoFechamento, double volumeAnualizado, Double pesoIbovespa, Double roeAnualizado, Double lucroAnualizado, TipoAtivo tipoAtivo, double dyAnualizado)
	{
		this.ticker = ticker;
		this.nome = nome;
		this.setor = setor;
		this.precoFechamento = precoFechamento;
		this.volumeAnualizado = volumeAnualizado;
		this.lucroAnualizado = lucroAnualizado;
		this.roeAnualizado = roeAnualizado;
		this.pesoIdxRef = pesoIbovespa;
		this.dyAnualizado = dyAnualizado;
		this.tipoAtivo = tipoAtivo;
	}
}
