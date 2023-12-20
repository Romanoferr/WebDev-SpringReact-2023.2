package com.romanofer.api.repository;

import com.romanofer.api.model.Carrinho;
import com.romanofer.api.model.ItemCarrinho;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
}
