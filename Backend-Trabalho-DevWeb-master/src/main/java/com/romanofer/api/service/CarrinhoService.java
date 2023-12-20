package com.romanofer.api.service;

import com.romanofer.api.exception.EntidadeDestacadaException;
import com.romanofer.api.model.Carrinho;
import com.romanofer.api.repository.CarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;


    public long criaCarrinho() {
        Carrinho carrinho = new Carrinho(Date.valueOf(LocalDate.now()));
        return carrinhoRepository.save(carrinho).getId();
    }

    public Carrinho recuperaCarrinhoPorId(long id) {
        return carrinhoRepository.findById(id)
                .orElseThrow(() -> new EntidadeDestacadaException("Erro ao procurar Carrinho com id = " + id));
    }
}
