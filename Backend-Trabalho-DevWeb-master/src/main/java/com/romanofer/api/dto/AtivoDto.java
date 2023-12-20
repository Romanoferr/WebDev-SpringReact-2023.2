package com.romanofer.api.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class AtivoDto {
    private long id;
    private long idTipoAtivo;
    private String ticker;
    private String nome;
    private String setor;
    private double precoFechamento;
    private double volumeAnualizado;
    private double dyAnualizado;
    private Double lucroAnualizado;
    private Double roeAnualizado;
    private Double pesoIdxRef;
}