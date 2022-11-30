import styled from "styled-components";

interface ContainerProps {
  visible: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  nav {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    gap: 20px;

    a {
      font-size: 1.6rem;
      color: black;

      width: 80%;
      margin-right: auto;
      padding: 16px;

      box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
    }
  }

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

  .menu {
    background-color: white;
    height: 100vh;
    width: 30%;

    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;

    display: flex;
    flex-direction: column;

    position: absolute;

    left: ${({ visible }) => (visible ? 0 : "-25%")};

    @media only screen and (max-width: 1000px) {
      width: 70%;
      left: ${({ visible }) => (visible ? 0 : "-58%")};
    }

    transition: all 0.6s;

    button {
      background-color: #1f1f1f;
      color: white;

      margin: 16px 16px 0 auto;

      border: none;
      border-radius: 5px;

      outline: none;

      font-size: 2.3rem;

      display: flex;

      align-items: center;
      justify-content: center;

      height: 30px;
    }
  }

  .content {
    background-color: white;

    position: relative;
    height: 100vh;
    width: 94%;

    padding-top: 20px;
    padding-right: 16px;

    transition: left 0.6s;

    left: ${({ visible }) => (visible ? "31%" : "6%")};

    @media only screen and (max-width: 1000px) {
      width: 90%;
      left: ${({ visible }) => (visible ? "75%" : "10%")};

      .label {
        flex-direction: column;
      }
    }

    .graphs {
      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    .graph {
      width: 100%;
      max-width: 700px;
      height: 600px;

      /* background-color: red; */

      margin: 0 auto;
      .select {
        display: flex;
        gap: 20px;
        /* height: 5px; */
        width: 100%;
        max-width: 200px;

        margin: 0 auto;

        font-size: 1.6rem;

        /* background-color: red; */

        div {
          box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
            rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
          /* background-color: green; */
        }
      }

      .label {
        /* background-color: red; */

        width: 50%;
        margin: 0 auto;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;

        .info {
          display: flex;
          align-items: center;
          gap: 5px;

          font-size: 1.2rem;
        }

        .color {
          background-color: #28a745;
          height: 8px;
          width: 30px;
        }
      }
    }

    @media only screen and (max-width: 1000px) {
      header,
      .header {
        flex-direction: column;
        text-align: center;
      }
    }

    header,
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;

      /* background-color: red; */

      margin-bottom: 20px;

      box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

      padding: 16px;

      .total {
        display: flex;
        flex-direction: column;
        flex: 1;
        text-align: center;

        /* background-color: green; */

        p {
          font-size: 1.8rem;
        }
        span {
          font-size: 1.4rem;
          font-weight: bold;
        }
      }
    }

    .header {
      box-shadow: none;
    }
  }
`;
