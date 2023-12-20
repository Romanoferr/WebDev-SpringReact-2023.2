package com.romanofer.api;

import com.romanofer.api.model.Ativo;
import com.romanofer.api.model.TipoAtivo;
import com.romanofer.api.repository.TipoAtivoRepository;
import com.romanofer.api.repository.AtivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class main implements CommandLineRunner {

	@Autowired
	private AtivoRepository ativoRepository;

	@Autowired
	private TipoAtivoRepository tipoAtivoRepository;


	public static void main(String[] args) {
		SpringApplication.run(main.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		TipoAtivo acao = new TipoAtivo("Ação", "acao");
		TipoAtivo fii = new TipoAtivo("Fundo Imobiliário", "fi");
		//tipoAtivoRepository.save(acao);
		//tipoAtivoRepository.save(fii);

		Ativo instanciaAcao = new Ativo("BBAS", "Banco do Brasil", "Bancário", 18.25, 3325100.88, 5.11, 20.55, 35889521.25, acao, 10.88);
		Ativo instanicaFII = new Ativo("BTLG11", "BTG Logística", "Logístico", 100.87, 25145.88, 11.45, null, null, fii, 8.99);

		//ativoRepository.save(instanciaAcao);
		//ativoRepository.save(instanicaFII);
	}
}
