import { Box, Button, Title, Table } from "@mantine/core";
import "@mantine/dates/styles.css";
import axiosApiInstance from "../http";
import { IAtivo } from "../interfaces";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export function AtivoFullPage() {
  const [ativoParam, _] = useSearchParams();
  const [ativo, setAtivo] = useState<IAtivo>();
  const navigate = useNavigate();

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    axiosApiInstance
      .get<any>(`/ativos/${ativoParam.get("id")}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const object: IAtivo = res.data;
          setAtivo(object);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDeletion = (id) => {
    axiosApiInstance
      .delete(`/ativos/${id}`, {})
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          notifications.show({
            title: "Deu tudo certo!",
            message: "Ativo foi excluído com sucesso!",
          });
          navigate("/ativo_list");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const row = (
    <Table.Tr key={ativo?.id}>
      <Table.Td>{ativo?.id}</Table.Td>
      <Table.Td>{ativo?.ticker}</Table.Td>
      <Table.Td>{ativo?.nome}</Table.Td>
      <Table.Td>{ativo?.setor}</Table.Td>
      <Table.Td>R$ {ativo?.precoFechamento}</Table.Td>
      <Table.Td>{ativo?.tipoAtivo?.nome}</Table.Td>
      <Table.Td>{ativo?.dyAnualizado}%</Table.Td>
      <Table.Td>
        <Button
          color="yellow"
          onClick={() => navigate(`/ativo_edit?id=${ativo?.id}`)}>
          Editar
        </Button>
      </Table.Td>
      <Table.Td>
        <Button color="red" onClick={() => handleDeletion(ativo?.id)}>
          Deletar
        </Button>
      </Table.Td>
    </Table.Tr>
  );

  const th = (
    <Table.Tr>
      <Table.Th>Id</Table.Th>
      <Table.Th>Ticker</Table.Th>
      <Table.Th>Nome</Table.Th>
      <Table.Th>Setor</Table.Th>
      <Table.Th>Preço Fechamento</Table.Th>
      <Table.Th>Tipo de Ativo</Table.Th>
      <Table.Th>Dividend Yield</Table.Th>
      <Table.Th colSpan={2}>Actions</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">Ativo {ativo?.nome}</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>
      <Box>
        <Table
          mt={20}
          captionSide="bottom"
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders>
          <Table.Caption>Detalhes do ativo {ativo?.nome}</Table.Caption>
          <Table.Thead>{th}</Table.Thead>
          <Table.Tbody>{row}</Table.Tbody>
        </Table>
      </Box>
    </>
  );
}
