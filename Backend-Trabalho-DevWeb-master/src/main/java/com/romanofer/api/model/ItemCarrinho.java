package com.romanofer.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class ItemCarrinho {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int quantidade;
	@ManyToOne
	@JoinColumn(name = "ativo_id")
	private Ativo ativo;
	@ManyToOne
	@JoinColumn(name = "carrinho_id")
	private Carrinho carrinho;

	public ItemCarrinho(int quantidade, Ativo ativo, Carrinho carrinho) {
		this.quantidade = quantidade;
		this.ativo = ativo;
		this.carrinho = carrinho;
	}
}
