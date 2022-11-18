import styled from "styled-components";

export const Container = styled.div`
  padding-top: 80px;

  .messageBox {
    margin: auto;

    width: 100%;
    max-width: 1000px;
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

  .wrapper {
    margin: 0 auto;

    width: 100%;
    max-width: 1000px;

    display: flex;
    flex-direction: column;

    background-color: rgba(7, 7, 7, 0.8);

    border-radius: 8px;

    padding: 55px;

    color: white;
  }

  h1 {
    font-size: 2.3rem;

    margin-bottom: 50px;
  }

  .bold {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 1000px) {
    .info-container {
      flex-direction: column;
      gap: 0 !important;

      .separator {
        display: none !important;
      }

      .cart {
        /* background-color: red; */
        margin-top: 20px !important;
      }
    }

    .bigger-desc {
      margin-top: 60px !important;
    }

    /* margin: 0 16px; */
  }

  .info-container {
    display: flex;

    font-size: 1.6rem;

    width: 100%;
    height: 400px;

    .img {
      position: relative;

      background-color: green;

      .estoque {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    /* background-color: red; */

    img {
      width: 400px;
      height: 400px;
    }

    margin-bottom: 30px;

    gap: 80px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    /* background-color: red; */

    flex: 1;

    .separator {
      height: 350px;
      width: 100%;

      /* background-color: green; */

      display: flex;
      flex-direction: column;

      .min-desc {
        height: 290px;

        overflow-y: hidden;

        /* background-color: orange; */

        flex: 1;
      }
    }
  }

  .cart {
    display: flex;
    gap: 20px;

    align-items: center;

    p {
      font-size: 2.3rem;
    }
  }

  .bigger-desc {
    margin-top: 10px;
    padding-top: 30px;

    border-top: 1px solid white;
  }

  button {
    background-color: #1111b3;

    padding: 16px;

    color: white;
    font-size: 1.6rem;

    border-radius: 5px;

    font-family: "Poppins", sans-serif;
  }
`;
