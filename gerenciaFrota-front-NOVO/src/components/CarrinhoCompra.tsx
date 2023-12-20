import { useState, useEffect } from "react";
import axiosApiInstance from "../http";
import { IItemCarrinho } from "../interfaces";
import {
  Anchor,
  Box,
  Flex,
  Input,
  NumberInput,
  Table,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  IconArrowsUp,
  IconMinus,
  IconPlus,
  IconUpload,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";

export function CarrinhoCompra() {
  const [itemCarrinhoList, setItemCarrinhoList] = useState(
    new Array<IItemCarrinho>()
  );

  const getAllItemCarrinho = (idCarrinho) => {
    axiosApiInstance
      .get<IItemCarrinho[]>(`/itemcarrinho/${idCarrinho}`)
      .then((res) => {
        const list = res.data;
        setItemCarrinhoList(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDeletion = (id) => {
    axiosApiInstance
      .delete(`/itemcarrinho/${id}`, {})
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const itemCarrinho: IItemCarrinho = res.data;
          const index = itemCarrinhoList.findIndex(
            (item) => item.id === itemCarrinho.id
          );
          setItemCarrinhoList([
            ...itemCarrinhoList.slice(0, index),
            ...itemCarrinhoList.slice(index + 1),
          ]);
          notifications.show({
            title: "Deu tudo certo!",
            message: "Foi removido item Ativo: " + itemCarrinho.ativo.nome,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    const idCarrinho = localStorage.getItem("carrinhoId");
    getAllItemCarrinho(idCarrinho);
  }, []);

  const handleAlteraQuantidade = (element: IItemCarrinho, incDec: string) => {
    const novaQuantidade = incDec.includes("inc")
      ? element.quantidade + 1
      : element.quantidade - 1;
    if (novaQuantidade === 0) {
      notifications.show({
        color: "yellow",
        title: "Aviso!",
        message: "Caso deseje remover o item, clique na opção de Excluir",
      });
      return null;
    }
    axiosApiInstance
      .put(`/itemcarrinho/${element.id}/${element.quantidade + 1}`, {})
      .then(function (response) {
        console.log("response sucesso: " + response);
        if (response.status >= 200 && response.status < 300) {
          notifications.show({
            title: "Deu tudo certo!",
            message: "Foi alterado quantidade do Ativo: " + element.ativo.nome,
          });

          setItemCarrinhoList((itensAntigos) =>
            itensAntigos.map((item) =>
              item.id === element.id
                ? { ...item, quantidade: novaQuantidade }
                : item
            )
          );
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  };

  const rows = itemCarrinhoList.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>
        <Flex gap={15}>
          <NumberInput
            hideControls
            value={String(element.quantidade)}
            w={100}
            disabled
          />
          <UnstyledButton
            onClick={() => handleAlteraQuantidade(element, "inc")}>
            <IconPlus size={20} color="green"></IconPlus>
          </UnstyledButton>
          <UnstyledButton
            onClick={() => handleAlteraQuantidade(element, "dec")}>
            <IconMinus size={20} color="red"></IconMinus>
          </UnstyledButton>
        </Flex>
      </Table.Td>
      <Table.Td>{element.ativo.nome}</Table.Td>
      <Table.Td>R$ {element.ativo.precoFechamento}</Table.Td>
      <Table.Td>
        R$ {(element.quantidade * element.ativo.precoFechamento).toFixed(2)}
      </Table.Td>
      <Table.Td>
        <Anchor onClick={() => handleDeletion(element.id)} underline="never">
          Remover
        </Anchor>
      </Table.Td>
    </Table.Tr>
  ));

  const ths = (
    <Table.Tr>
      <Table.Th>Id</Table.Th>
      <Table.Th>Quantidade</Table.Th>
      <Table.Th>Nome ativo</Table.Th>
      <Table.Th>Valor unitário</Table.Th>
      <Table.Th>Total item</Table.Th>
      <Table.Th>Exclusão</Table.Th>
    </Table.Tr>
  );

  const calculaTotalCarrinho = () => {
    const total = itemCarrinhoList.reduce((acumulador, item) => {
      return acumulador + item.quantidade * item.ativo.precoFechamento;
    }, 0);

    return total.toFixed(2);
  };

  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">Carrinho</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>
      <Box color="white">
        <Table mt={20} captionSide="bottom" striped highlightOnHover>
          <Table.Caption>Listagem dos ativos dentro do carrinho</Table.Caption>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Tfoot>
            <Table.Th align="right"></Table.Th>
            <Table.Th align="right"></Table.Th>
            <Table.Th align="right"></Table.Th>
            <Table.Th align="right"></Table.Th>
            <Table.Th align="right">Total R$ {calculaTotalCarrinho()}</Table.Th>
            <Table.Th align="right"></Table.Th>
          </Table.Tfoot>
        </Table>
      </Box>
    </>
  );
}
