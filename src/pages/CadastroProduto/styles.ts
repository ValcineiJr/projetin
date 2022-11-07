import styled from "styled-components";

export const Container = styled.div`
  padding-top: 100px;

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
    h1 {
      color: rgb(69, 69, 196);
      font-size: 3rem;
      font-weight: bold;

      margin: 16px 0;
    }
    padding: 20px;

    border-radius: 10px;

    background-color: rgba(7, 7, 7, 0.8);

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    gap: 10px;

    input,
    select,
    textarea {
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
    }

    textarea {
      resize: none;
      min-height: 300px;
    }
  }
`;
