import { Title, Box } from "@mantine/core";
import "../assets/css/styles.css";

export const Home = () => {
  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">StatusInvest</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>
      <Box mt={20}>
        <section className="banner-section-main">
          <div className="container d-flex flex-column flex-sm-row align-items-center">
            <div className=""></div>
            <div>
              <h1 style={{ color: "#08292e" }}>
                <b>TURBINE SUAS ANÁLISES</b>
              </h1>
              <h2 className="">
                Obtenha informações de diferentes tipos de ativos do Mercado
                Financeiro.
                <br /> Tudo sobre AÇÕES, FIIS, FUNDOS e BDRS.
              </h2>
              <div className="text-align-center text-align-sm-left">
                <a
                  href="https://statusinvest.com.br/"
                  className="btn btn-secondary mt-3"
                  style={{ backgroundColor: "#d64000" }}>
                  <b>ACESSE SITE ORIGINAL AQUI!</b>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Box>
    </>
  );
};
