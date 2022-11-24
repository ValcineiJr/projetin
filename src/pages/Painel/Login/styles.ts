import styled from "styled-components";

interface ContainerProps {
  message?: string;
}

export const Container = styled.div<ContainerProps>`
  height: 100vh;
  background-image: linear-gradient(90deg, #020024, #070561, #0e0eb8, #09087d);

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  .messageBox {
    width: 100%;
    max-width: 500px;
  }

  .messageBox {
    display: ${({ message }) => (message !== "" ? "flex" : "none")};
    background-color: ${({ theme }) => theme.colors.error};

    transition: all 1s;

    border-radius: 5px;

    height: 40px;

    color: white;

    align-items: center;
    justify-content: center;

    font-size: 1.6rem;

    margin-bottom: 20px;
  }

  form {
    width: 100%;
    max-width: 500px;

    background-color: white;

    border-radius: 10px;
    padding: 16px;

    display: flex;
    flex-direction: column;

    align-items: center;

    gap: 20px;

    h1 {
      color: #1f1f1f;
      font-size: 2.8rem;
    }
    h1 {
      color: #1f1f1f;
      font-size: 2rem;
    }

    .inputs {
      display: flex;
      flex-direction: column;
      gap: 20px;

      button {
        background-color: #1111b3;

        padding: 16px;

        color: white;
        font-size: 1.6rem;

        border-radius: 5px;

        font-family: "Poppins", sans-serif;
      }
    }
  }
`;
