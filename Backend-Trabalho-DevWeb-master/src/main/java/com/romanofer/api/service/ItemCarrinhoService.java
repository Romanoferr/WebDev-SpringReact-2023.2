package com.romanofer.api.service;

import com.romanofer.api.dto.ItemCarrinhoDto;
import com.romanofer.api.exception.EntidadeDestacadaException;
import com.romanofer.api.model.Ativo;
import com.romanofer.api.model.Carrinho;
import com.romanofer.api.model.ItemCarrinho;
import com.romanofer.api.model.TipoAtivo;
import com.romanofer.api.repository.ItemCarrinhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemCarrinhoService {

    @Autowired
    private ItemCarrinhoRepository itemCarrinhoRepository;

    @Autowired
    private AtivoService ativoService;

    @Autowired
    private CarrinhoService carrinhoService;

    public ItemCarrinho criaItemCarrinho(ItemCarrinhoDto itemCarrinhoDto) {

        Ativo ativo = ativoService.recuperarAtivoPorId(itemCarrinhoDto.getIdAtivo());
        Carrinho carrinho = carrinhoService.recuperaCarrinhoPorId(itemCarrinhoDto.getIdCarrinho());

        ItemCarrinho itemCarrinho = ItemCarrinho.builder()
                .quantidade(itemCarrinhoDto.getQuantidade())
                .ativo(ativo)
                .carrinho(carrinho)
                .build();

        return itemCarrinhoRepository.save(itemCarrinho);
    }

    public List<ItemCarrinho> recuperaTodosItemCarrinho(long carrinhoId) {
        var list = itemCarrinhoRepository.findAll();
        return list.stream().filter((i) -> i.getCarrinho().getId() == carrinhoId).toList();

    }

    public ItemCarrinho alteraQuantidadeItemCarrinho(int quantidade, long id) {
        ItemCarrinho itemCarrinhoTarget = itemCarrinhoRepository.findById(id)
                .orElseThrow(() -> new EntidadeDestacadaException("Erro ao procurar Item do Carrinho com id = " + id));

        itemCarrinhoTarget.setQuantidade(quantidade);
        return itemCarrinhoRepository.save(itemCarrinhoTarget);


    }

    public ItemCarrinho deletarItemCarrinho(long id) {
        ItemCarrinho target = itemCarrinhoRepository.findById(id)
                .orElseThrow(() -> new EntidadeDestacadaException("Erro ao deletar Item Carrinho com id = " + id));
        itemCarrinhoRepository.delete(target);
        return target;
    }

}
