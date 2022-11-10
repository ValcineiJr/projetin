import React from "react";

import { Container } from "./styles";

interface ToolbarProps {
  children: React.ReactNode;
}

const Toolbar = ({ children }: ToolbarProps) => {
  return <Container>{children}</Container>;
};

export default Toolbar;
