package com.romanofer.api.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(value = {"produtos"})
@Data
@NoArgsConstructor
@Entity
public class TipoAtivo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String slug;


	public TipoAtivo(String nome, String slug) {
		this.nome = nome;
		this.slug = slug;
	}
}
