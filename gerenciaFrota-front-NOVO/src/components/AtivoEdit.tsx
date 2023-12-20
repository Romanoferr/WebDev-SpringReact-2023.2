import {
  Box,
  TextInput,
  Button,
  Group,
  Title,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import "@mantine/dates/styles.css";
import axiosApiInstance from "../http";
import { z } from "zod";
import { useEffect, useState } from "react";
import { IAtivo, ITipoAtivo } from "../interfaces";
import { useSearchParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

// validação zod

const schema = z.object({
  ticker: z
    .string()
    .min(2, { message: "Ticker deve ter pelo menos 2 caracteres" }),
  nome: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  setor: z
    .string()
    .min(2, { message: "Setor deve ter pelo menos 2 caracteres" }),
  precoFechamento: z
    .number()
    .gt(0, { message: "Preço deve ser maior que zero" }),
  idTipoAtivo: z.string().refine((data) => data != "Selecione um Tipo Ativo", {
    message: "Selecione um Tipo de Ativo",
  }),
});

export function AtivoEdit() {
  const [tipoAtivoList, setTipoAtivoList] = useState(new Array<ITipoAtivo>());
  const [ativoParam, _] = useSearchParams();

  const form = useForm({
    initialValues: {
      ticker: "",
      nome: "",
      setor: "",
      precoFechamento: 0,
      idTipoAtivo: "Selecione um Tipo Ativo",
      volumeAnualizado: 0,
      dyAnualizado: 0,
      lucroAnualizado: 0,
      roeAnualizado: 0,
      pesoIdxRef: 0,
    },
    validate: zodResolver(schema),
  });

  const getAllTipoAtivo = () => {
    axiosApiInstance
      .get<any>(`/tiposAtivo/all`)
      .then((res) => {
        const list: ITipoAtivo[] = res.data;
        setTipoAtivoList(list);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getAtivo = () => {
    axiosApiInstance
      .get<any>(`/ativos/${ativoParam.get("id")}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const object: IAtivo = res.data;
          const formattedObject = {
            ...object,
            idTipoAtivo: String(object.tipoAtivo?.id),
          };
          form.setValues(formattedObject);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllTipoAtivo();
    getAtivo();
  }, []);

  const handleNewInsertion = () => {
    if (form.validate().hasErrors) {
      return null;
    }

    axiosApiInstance
      .put(`/ativos/${ativoParam.get("id")}`, {
        ticker: form.values.ticker,
        nome: form.values.nome,
        setor: form.values.setor,
        precoFechamento: form.values.precoFechamento,
        volumeAnualizado: form.values.volumeAnualizado,
        dyAnualizado: form.values.dyAnualizado,
        lucroAnualizado: form.values.lucroAnualizado,
        roeAnualizado: form.values.roeAnualizado,
        pesoIdxRef: form.values.pesoIdxRef,
        idTipoAtivo: form.values.idTipoAtivo,
      })
      .then(function (response) {
        if (response.status >= 200 && response.status < 300) {
          notifications.show({
            title: "Deu tudo certo!",
            message: "Ativo foi editado com sucesso!",
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

  const buildSelecOptions = () => {
    return tipoAtivoList.map((tipoAtivo) => {
      return {
        label: tipoAtivo.nome,
        value: `${tipoAtivo.id}`,
      };
    });
  };

  return (
    <>
      <Title>
        <h2 id="acoes">
          <a className="section-title">Edição de Ativo</a>
          <hr style={{ textAlign: "left", marginLeft: 0 }} />
        </h2>
      </Title>
      <Box maw={540} mt={20}>
        <TextInput
          label="Ticker"
          placeholder="Insira ticker"
          {...form.getInputProps("ticker")}
        />
        <TextInput
          label="Nome"
          placeholder="Insira nome"
          {...form.getInputProps("nome")}
        />
        <TextInput
          label="Setor"
          placeholder="Insira setor"
          {...form.getInputProps("setor")}
        />
        <NumberInput
          hideControls
          label="Preço de Fechamento (R$)"
          placeholder="Insira preço fechamento (R$)"
          prefix="R$ "
          decimalScale={2}
          decimalSeparator=","
          {...form.getInputProps("precoFechamento")}
        />
        <NumberInput
          hideControls
          label="Volume Diário Médio"
          placeholder="Insira Volume Anualizado"
          prefix="R$ "
          decimalScale={2}
          decimalSeparator=","
          thousandSeparator="."
          {...form.getInputProps("volumeAnualizado")}
        />
        <NumberInput
          hideControls
          label="Dy Anualizado (%)"
          placeholder="Insira Dy Anualizado (%)"
          suffix="%"
          decimalScale={2}
          decimalSeparator=","
          {...form.getInputProps("dyAnualizado")}
        />
        <NumberInput
          hideControls
          label="Lucro Anualizado"
          placeholder="Insira Lucro Anualizado"
          prefix="R$ "
          decimalScale={2}
          decimalSeparator=","
          thousandSeparator="."
          {...form.getInputProps("lucroAnualizado")}
        />
        <NumberInput
          hideControls
          label="Roe Anualizado (%)"
          placeholder="Insira Roe Anualizado (%)"
          suffix="%"
          decimalScale={2}
          decimalSeparator=","
          {...form.getInputProps("roeAnualizado")}
        />
        <NumberInput
          hideControls
          label="Peso Idx ref (%)"
          placeholder="Insira Peso Idx Ref (%)"
          suffix="%"
          decimalScale={2}
          decimalSeparator=","
          {...form.getInputProps("pesoIdxRef")}
        />

        <Select
          label="Selecione Tipo Ativo"
          placeholder="Selecione Tipo Ativo"
          defaultValue={"Selecione um Tipo Ativo"}
          data={buildSelecOptions()}
          {...form.getInputProps("idTipoAtivo")}
        />
        <Group mt="md">
          <Button onClick={() => handleNewInsertion()} type="submit">
            Atualizar
          </Button>
        </Group>
      </Box>
    </>
  );
}
