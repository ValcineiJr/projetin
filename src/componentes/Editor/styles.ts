import styled from "styled-components";

import { Editable } from "slate-react";

interface ButtonProps {
  active?: boolean;
  reversed?: boolean;
}

export const E = styled(Editable)`
  color: white;

  background-color: rgb(47, 47, 80);

  width: 100%;

  font-size: 1.6rem;

  min-height: 300px;

  line-height: 24px;

  text-overflow: ellipsis;
`;

export const Button = styled.span<ButtonProps>`
  color: ${({ reversed, active }) =>
    reversed ? (active ? "white" : "#aaa") : active ? "black" : "#888"};
  cursor: pointer;

  display: flex;

  align-items: center;
  justify-content: center;
`;
