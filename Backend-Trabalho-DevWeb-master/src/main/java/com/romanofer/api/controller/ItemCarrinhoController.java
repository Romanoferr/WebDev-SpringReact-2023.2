package com.romanofer.api.controller;

import com.romanofer.api.dto.ItemCarrinhoDto;
import com.romanofer.api.model.ItemCarrinho;
import com.romanofer.api.service.ItemCarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/itemcarrinho")
public class ItemCarrinhoController {

    @Autowired
    private ItemCarrinhoService itemCarrinhoService;

    @PostMapping
    public ItemCarrinho criaItemCarrinho(@RequestBody ItemCarrinhoDto itemCarrinhoDto) {
        return itemCarrinhoService.criaItemCarrinho(itemCarrinhoDto);
    }

    @GetMapping("/{carrinhoId}")
    public List<ItemCarrinho> recuperaTodosItemCarrinho(@PathVariable long carrinhoId) {
        return itemCarrinhoService.recuperaTodosItemCarrinho(carrinhoId);
    }

    @PutMapping("/{id}/{quantidade}")
    public ItemCarrinho alteraQuantidadeItemCarrinho(@PathVariable int quantidade, @PathVariable long id) {
        return itemCarrinhoService.alteraQuantidadeItemCarrinho(quantidade, id);
    }

    @DeleteMapping("/{id}")
    public ItemCarrinho deletarItemCarrinho(@PathVariable long id) {
        return itemCarrinhoService.deletarItemCarrinho(id);
    }

}
