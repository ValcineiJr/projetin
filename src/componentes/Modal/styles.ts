import styled from "styled-components";

export const Container = styled.div`
  padding-top: 30px;

  .close {
    position: absolute;
    right: 16px;
    top: 10px;

    font-size: 3rem;

    cursor: pointer;
  }

  p {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;

    width: 100%;
    padding: 8px;

    margin-top: 3px;
    border-radius: 6px;
  }

  button {
    background-color: #1111b3;

    width: 120px;
    padding: 16px;

    color: white;
    font-size: 1.6rem;

    border-radius: 5px;

    font-family: "Poppins", sans-serif;

    margin: 0 auto;
    margin-top: 50px;

    :disabled {
      background-color: dimgrey;
      color: linen;
      opacity: 1;

      cursor: not-allowed;
    }
  }

  .row {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;

    margin-bottom: 8px;

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
  }
`;
