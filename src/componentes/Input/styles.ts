import styled from "styled-components";

export const Container = styled.div`
  input {
    height: 40px;
    width: 100%;

    color: white;
    background-color: rgb(47, 47, 80);

    padding-left: 16px;

    border-radius: 6px;

    border: 0;
    outline: none;

    ::placeholder {
      color: white;
    }

    :disabled {
      background-color: dimgrey;
      color: linen;
      opacity: 1;

      cursor: not-allowed;
    }
  }

  p {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;

    width: 100%;
    padding: 8px;

    margin-top: 3px;
    border-radius: 6px;
  }

  font-size: 1.4rem;
`;

export const NormalInput = styled.input`
  height: 40px;
  width: 100%;

  color: white;
  background-color: rgb(47, 47, 80);

  padding-left: 16px;

  border-radius: 6px;

  border: 0;
  outline: none;

  ::placeholder {
    color: white;
  }

  :disabled {
    background-color: dimgrey;
    color: linen;
    opacity: 1;

    cursor: not-allowed;
  }
`;
