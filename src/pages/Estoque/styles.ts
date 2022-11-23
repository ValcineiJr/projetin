import styled from "styled-components";

export const Container = styled.div`
  padding-top: 100px;
  min-height: 60vh;
  table {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    border: 0;

    display: flex;
    flex-direction: column;

    .title {
      font-size: 1.6rem;
    }

    tr {
      display: flex;
    }

    th {
      background-color: #009ddc;
      color: white;
      /* border-radius: 5px; */
    }

    th.bold {
      font-weight: bold;
      font-size: 1.4rem;
    }

    td {
      gap: 20px;
      border: 1px solid rgb(222, 224, 228);

      font-size: 1.4rem;
    }

    th,
    td {
      flex: 1;
      min-height: 50px;

      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    tbody {
      button,
      a.button {
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

      background-color: rgb(222, 224, 228);
      border-top-right-radius: 10px;

      color: #1b1b1b;
    }
  }
`;
