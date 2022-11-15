import styled from "styled-components";

export const Container = styled.div`
  padding-top: 100px;
  table {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    background-color: #fff;

    border: 0;

    display: flex;
    flex-direction: column;

    .title {
      font-size: 1.6rem;
    }

    tr {
      display: flex;
    }

    th.bold {
      font-weight: bold;
      font-size: 1.4rem;
    }

    td {
      gap: 20px;
    }

    th,
    td {
      flex: 1;
      height: 50px;

      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;

      border: 1px solid #000;
    }

    tbody {
      button {
        background-color: #1111b3;

        padding: 5px 16px;

        color: white;
        font-size: 1.6rem;

        border-radius: 5px;

        font-family: "Poppins", sans-serif;
      }
    }

    select {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;

      text-align: center;

      background-color: #eee;
    }
  }
`;
