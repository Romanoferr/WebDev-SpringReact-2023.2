import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, NavLink, Title } from "@mantine/core";
import { MyRoutes } from "../routes/MyRoutes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  IconActivity,
  IconCoin,
  IconHome,
  IconShoppingCart,
} from "@tabler/icons-react";

const data = [{ icon: IconHome, label: "Home", page: "/home" }];

export function MainAppShell() {
  const navigate = useNavigate();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [active, setActive] = useState(0);

  const handleNavLick = (index, url) => {
    setActive(index);
    navigate(url);
  };

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size="1.1rem" stroke={1.5} />}
      onClick={() => handleNavLick(index, item.page)}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md">
      <AppShell.Header className="blue-header">
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Title size={32}>
            <Link to="/home">
              <img
                src="src/assets/images/logo-main.png"
                alt="Logo"
                style={{ maxWidth: "60px" }}
              />
            </Link>
          </Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {items}
        <NavLink
          label="Tipo Ativo"
          leftSection={<IconActivity size="1rem" stroke={1.5} />}
          childrenOffset={28}>
          <NavLink
            label="Cadastrar"
            active={7 === active}
            onClick={() => handleNavLick(7, "tipo_ativo_create")}
          />
          <NavLink
            label="Listar"
            active={8 === active}
            onClick={() => handleNavLick(8, "tipo_ativo_list")}
          />
        </NavLink>
        <NavLink
          label="Ativo"
          leftSection={<IconCoin size="1rem" stroke={1.5} />}
          childrenOffset={28}>
          <NavLink
            label="Cadastrar"
            active={9 === active}
            onClick={() => handleNavLick(9, "ativo_create")}
          />
          <NavLink
            label="Listar"
            active={10 === active}
            onClick={() => handleNavLick(10, "ativo_list")}
          />
        </NavLink>

        <NavLink
          label="Carrinho Compra"
          leftSection={<IconShoppingCart size="1rem" stroke={1.5} />}
          onClick={() => handleNavLick(11, "carrinho_compra")}
        />
      </AppShell.Navbar>

      <AppShell.Main>
        <MyRoutes />
      </AppShell.Main>
    </AppShell>
  );
}
