import { useState, useEffect } from "react";
import axiosApiInstance from "../http";
import { IAtivo } from "../interfaces";
import {
  Box,
  Button,
  Pagination,
  ScrollArea,
  Title,
  Text,
  Card,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export function AtivoList() {
  const [ativoList, setAtivoList] = useState(new Array<IAtivo>());
  const [totalRecords, setTotalRecords] = useState(0);
  const [activePage, setPage] = useState(1);
  const navigate = useNavigate();

  const getTotalRecords = () => {
    axiosApiInstance
      .get<number>("/ativos/totalPagina")
      .then((res) => {
        const totalRecords = res.data;
        setTotalRecords(totalRecords);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChangePagination = (pageNumber) => {
    setPage(pageNumber);
    getAllAtivosPaginado(pageNumber);
  };

  const getAllAtivosPaginado = (pageNumber = 1) => {
    axiosApiInstance
      .get<any>(`/ativos?page=${pageNumber}&size=6`)
      .then((res) => {
        const list: IAtivo[] = res.data.content;
        setAtivoList(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleCarrinhoCriacao = async () => {
    const carrinhoIdReturn = await axiosApiInstance
      .post("/carrinhos", {})
      .then(function (response) {
        console.log("response sucesso: " + response);
        if (response.status >= 200 && response.status < 300) {
          const carrinhoId: number = response.data;
          localStorage.setItem("carrinhoId", String(carrinhoId));
          return carrinhoId;
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
    return carrinhoIdReturn;
  };

  const handleAddCart = async () => {
    let carrinhoId = localStorage.getItem("carrinhoId");
    if (!carrinhoId || carrinhoId === undefined) {
      // primeiro temos que criar na base de dados um registro Carrinho
      const valor = await handleCarrinhoCriacao();
      console.log("valor do handleCarrinhoCriacao " + valor);
      return handleCarrinhoCriacao();
    }
    carrinhoId = localStorage.getItem("carrinhoId");
    return carrinhoId;
  };

  const handleAddItemCarrinho = async (ativo: IAtivo) => {
    const carrinhoId = await handleAddCart();
    console.log("carrinhoId que veio do handleaddccart: " + carrinhoId);
    if (!carrinhoId) {
      return null;
    }
    console.log("indo para carrinho item agora");
    axiosApiInstance
      .post("/itemcarrinho", {
        quantidade: 1,
        idAtivo: ativo.id,
        idCarrinho: carrinhoId,
      })
      .then(function (response) {
        console.log("response sucesso: " + response);
        if (response.status >= 200 && response.status < 300) {
          // SUCESSO AO ADICIONAR ITEM CARRINHO
          notifications.show({
            title: "Deu tudo certo!",
            message: "Ativo foi adicionado ao carrinho com sucesso!",
          });
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  };

  useEffect(() => {
    getTotalRecords();
    getAllAtivosPaginado();
  }, []);

  const cards = ativoList.map((element) => (
    <Box key={element.id} w={400} mt={30}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Text size="md" fw={700}>
              {element.nome}
            </Text>

            <Text size="md" c="">
              Ticker: {element.ticker}
            </Text>

            <Text size="md" c="">
              Setor: {element.setor}
            </Text>

            <Text size="md" c="">
              R$ {element.precoFechamento}
            </Text>

            <Text size="md" c="">
              Variação 1d: {(Math.random() * 10 - 5).toFixed(2)}%
            </Text>
          </div>

          <img
            src={`src/assets/images/${element.ticker}.jpg`}
            onError={(e) => {
              if (!e.currentTarget.dataset.triedOnce) {
                e.currentTarget.dataset.triedOnce = "true";
                e.target.onerror = null;
                e.target.src = `src/assets/images/${element.ticker}.png`;
              }
            }}
            alt="ticker.jpg/png"
            style={{ maxWidth: "100px", marginLeft: "auto" }}
          />
        </div>

        <Button
          color="green"
          size="xs"
          mt="xs"
          radius="md"
          onClick={() => navigate(`/ativo_full_page?id=${element.id}`)}>
          Ver detalhes
        </Button>
        <Button
          color="blue"
          size="xs"
          mt="xs"
          radius="md"
          onClick={() => handleAddItemCarrinho(element)}>
          Adicionar Carrinho
        </Button>
      </Card>
    </Box>
  ));

  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">Listagem de Ativo</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>

      <ScrollArea h={600} mt={10}>
        <Flex
          mih={60}
          gap="sm"
          justify="center"
          align="flex-start"
          direction="row"
          wrap="wrap">
          {cards}
        </Flex>
      </ScrollArea>

      <Pagination
        mt={10}
        value={activePage}
        onChange={(pageNumber) => handleChangePagination(pageNumber)}
        total={totalRecords}></Pagination>
    </>
  );
}
