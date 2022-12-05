import styled from "styled-components";

export const Container = styled.div`
  padding: 0 16px;
  padding-top: 100px;
  min-height: 60vh;

  .row {
    display: flex;
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

  .messageBox,
  form {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
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
    position: relative;

    a {
      position: absolute;

      width: 150px;

      cursor: pointer;

      font-size: 1.4rem;

      text-decoration: underline;

      color: white;

      right: 16px;
      top: 16px;
    }

    a.update {
      left: 16px;
    }

    a.password {
      left: 16px;
      top: 48px;
    }

    padding: 20px;

    border-radius: 10px;

    background-color: rgba(7, 7, 7, 0.8);

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    h1 {
      color: rgb(69, 69, 196);
      font-size: 3rem;
      font-weight: bold;

      margin: 16px 0;
    }

    img {
      width: 135px;
      height: 135px;
      border-radius: 20px;
    }

    button {
      background-color: #1111b3;

      width: 120px;
      padding: 16px;

      color: white;
      font-size: 1.6rem;

      border-radius: 5px;

      font-family: "Poppins", sans-serif;

      :disabled {
        background-color: dimgrey;
        color: linen;
        opacity: 1;

        cursor: not-allowed;
      }
    }
  }
`;
