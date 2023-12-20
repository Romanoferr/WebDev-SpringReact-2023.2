package com.romanofer.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ItemCarrinhoDto {
    private int quantidade;
    private long idAtivo;
    private long idCarrinho;
}
