import { ReactNode } from "react";
import Footer from "../../componentes/Footer";

import Header from "../../componentes/Header";

import { Container } from "./styles";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
