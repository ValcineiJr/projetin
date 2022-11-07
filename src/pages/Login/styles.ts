import styled from "styled-components";

export const Container = styled.div`
  padding: 0 16px;
  padding-top: 100px;

  height: 60vh;

  .messageBox,
  form {
    margin: 0 auto;
    width: 100%;
    max-width: 300px;
  }

  .messageBox {
    display: ${({ color }) => (color !== null ? "flex" : "none")};
    background-color: ${({ color }) => color};

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
    border-radius: 5px;

    padding: 16px;

    display: flex;
    flex-direction: column;

    background-color: rgba(7, 7, 7, 0.8);

    color: white;

    align-items: center;

    h1 {
      color: rgb(69, 69, 196);
      font-size: 3rem;
      font-weight: bold;
    }

    button {
      background-color: #1111b3;

      width: 120px;
      padding: 16px;

      color: white;
      font-size: 1.6rem;

      border-radius: 5px;

      font-family: "Poppins", sans-serif;
    }

    input {
      height: 40px;
      width: 100%;

      color: white;
      background-color: rgb(47, 47, 80);

      padding-left: 16px;

      border-radius: 6px;

      border: 0;
      outline: none;

      margin: 10px 0;

      ::placeholder {
        color: white;
      }
    }

    a {
      color: white;
      font-size: 1.4rem;

      margin-top: 15px;
    }
  }
`;
