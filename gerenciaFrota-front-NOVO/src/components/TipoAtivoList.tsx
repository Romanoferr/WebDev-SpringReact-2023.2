import { useState, useEffect } from "react";
import axiosApiInstance from "../http";
import { ITipoAtivo } from "../interfaces";
import { Anchor, Box, Pagination, Table, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export function TipoAtivoList() {
  const [tipoAtivoList, setTipoAtivoList] = useState(new Array<ITipoAtivo>());
  const [totalRecords, setTotalRecords] = useState(0);
  const [activePage, setPage] = useState(1);

  const getTotalRecords = () => {
    axiosApiInstance
      .get<number>("/tiposAtivo/totalPagina")
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
    getAllTipoAtivoPaginado(pageNumber);
  };

  const getAllTipoAtivoPaginado = (pageNumber = 1) => {
    axiosApiInstance
      .get<any>(`/tiposAtivo?page=${pageNumber}&size=5`)
      .then((res) => {
        const list: ITipoAtivo[] = res.data.content;
        setTipoAtivoList(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleDeletion = (id) => {
    axiosApiInstance
      .delete(`/tiposAtivo/${id}`, {})
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const car: ITipoAtivo = res.data;
          const index = tipoAtivoList.findIndex((c) => c.id === car.id);
          setTipoAtivoList([
            ...tipoAtivoList.slice(0, index),
            ...tipoAtivoList.slice(index + 1),
          ]);
          notifications.show({
            title: "Deu tudo certo!",
            message: "Tipo Ativo foi excluído com sucesso!",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getTotalRecords();
    getAllTipoAtivoPaginado();
  }, []);

  const showEditLink = (id) => "/tipo_ativo_edit?id=" + id;

  const rows = tipoAtivoList.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.nome}</Table.Td>
      <Table.Td>{element.slug}</Table.Td>
      <Table.Td>
        <Anchor href={showEditLink(element.id)} underline="never">
          Editar
        </Anchor>
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
      <Table.Th>Nome</Table.Th>
      <Table.Th>Slug</Table.Th>
      <Table.Th colSpan={2}>Actions</Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">Listagem de Tipo Ativo</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>

      <Box color="white">
        <Table
          mt={20}
          captionSide="bottom"
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders>
          <Table.Caption>Listagem de tipo ativo</Table.Caption>
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
      <Pagination
        value={activePage}
        onChange={(pageNumber) => handleChangePagination(pageNumber)}
        total={totalRecords}></Pagination>
    </>
  );
}
