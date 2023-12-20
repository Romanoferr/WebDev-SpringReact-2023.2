import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { Box, TextInput, Button, Group, Title } from "@mantine/core";
import "@mantine/dates/styles.css";
import axiosApiInstance from "../http";
import { notifications } from "@mantine/notifications";

// validação zod

const schema = z.object({
  nome: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  slug: z.string().min(2, { message: "Slug deve ter pelo menos 2 caracteres" }),
});

export function TipoAtivoCreate() {
  const form = useForm({
    initialValues: {
      nome: "",
      slug: "",
    },
    validate: zodResolver(schema),
  });

  const handleNewCarInsertion = () => {
    if (form.validate().hasErrors) {
      return null;
    }

    axiosApiInstance
      .post("/tiposAtivo", {
        nome: form.values.nome,
        slug: form.values.slug,
      })
      .then(function (response) {
        console.log("response sucesso: " + response);
        if (response.status >= 200 && response.status < 300) {
          form.reset();
          notifications.show({
            title: "Deu tudo certo!",
            message: "Tipo Ativo foi criado com sucesso!",
          });
        }
      })
      .catch(function (error) {
        console.log("error: " + error);
      });
  };

  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">Cadastro de Tipo Ativo</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>
      <Box maw={540} mt={20}>
        <TextInput
          label="Nome"
          placeholder="Insira Nome"
          {...form.getInputProps("nome")}
        />
        <TextInput
          label="Slug"
          placeholder="Insira slug"
          {...form.getInputProps("slug")}
        />

        <Group mt="md">
          <Button onClick={() => handleNewCarInsertion()} type="submit">
            Cadastrar
          </Button>
        </Group>
      </Box>
    </>
  );
}
