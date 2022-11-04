import styled from "styled-components";

export const Container = styled.div`
  padding: 0 16px;
  form {
    margin: 0 auto;
    margin-top: 100px;

    padding: 20px;

    border-radius: 10px;

    background-color: rgba(7, 7, 7, 0.8);

    width: 100%;
    max-width: 600px;

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
      }
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
    }
  }
`;
