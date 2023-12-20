import { Route, Routes } from "react-router-dom";
import { Home } from "../components/Home";
import { TipoAtivoList } from "../components/TipoAtivoList";
import { TipoAtivoCreate } from "../components/TipoAtivoCreate";
import { TipoAtivoEdit } from "../components/TipoAtivoEdit";
import { AtivoCreate } from "../components/AtivoCreate";
import { AtivoList } from "../components/AtivoList";
import { AtivoFullPage } from "../components/AtivoFullPage";
import { AtivoEdit } from "../components/AtivoEdit";
import { CarrinhoCompra } from "../components/CarrinhoCompra";

export const MyRoutes: any = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tipo_ativo_create" element={<TipoAtivoCreate />} />
      <Route path="/tipo_ativo_list" element={<TipoAtivoList />} />
      <Route path="/tipo_ativo_edit" element={<TipoAtivoEdit />} />
      <Route path="/ativo_create" element={<AtivoCreate />} />
      <Route path="/ativo_list" element={<AtivoList />} />
      <Route path="/ativo_edit" element={<AtivoEdit />} />
      <Route path="/ativo_full_page" element={<AtivoFullPage />} />
      <Route path="/carrinho_compra" element={<CarrinhoCompra />} />
    </Routes>
  );
};
