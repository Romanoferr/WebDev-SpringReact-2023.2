import { Box, TextInput, Button, Group, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import "@mantine/dates/styles.css";
import axiosApiInstance from "../http";
import { ITipoAtivo } from "../interfaces";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { z } from "zod";

// validação zod

const schema = z.object({
  nome: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  slug: z.string().min(2, { message: "Slug deve ter pelo menos 2 caracteres" }),
});

export function TipoAtivoEdit() {
  const [tipoAtivoParam, _] = useSearchParams();

  const form = useForm({
    initialValues: {
      nome: "",
      slug: "",
    },
    validate: zodResolver(schema),
  });

  useEffect(() => {
    handleFetchTipoAtivo();
  }, []);

  const handleUpdateTipoAtivoInsertion = () => {
    axiosApiInstance
      .put(`/tiposAtivo/${tipoAtivoParam.get("id")}`, {
        ...form.values,
      })
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          notifications.show({
            title: "Deu tudo certo!",
            message: "Tipo Ativo foi editado com sucesso!",
          });
        }
      })
      .catch(function (error) {
        notifications.show({
          title: "Oops",
          message: "Algo de errado aconteceu! " + error.message,
        });
      });
  };

  const handleFetchTipoAtivo = () => {
    axiosApiInstance
      .get<any>(`/tiposAtivo/${tipoAtivoParam.get("id")}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const object: ITipoAtivo = res.data;
          form.setValues(object);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">Edição de Tipo Ativo</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>
      <Box maw={540} mt={20}>
        <TextInput
          label="Nome"
          placeholder="Insira novo Nome"
          {...form.getInputProps("nome")}
        />
        <TextInput
          label="Slug"
          placeholder="Insira novo slug"
          {...form.getInputProps("slug")}
        />

        <Group mt="md">
          <Button
            onClick={() => handleUpdateTipoAtivoInsertion()}
            type="submit">
            Editar
          </Button>
        </Group>
      </Box>
    </>
  );
}
