import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;

  width: 100%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;

  background-color: rgba(7, 7, 7, 0.8);

  border-radius: 8px;

  margin-top: 100px;

  padding: 55px;

  color: white;

  h1 {
    font-size: 2.3rem;

    margin-bottom: 50px;
  }

  .bold {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .info-container {
    display: flex;

    font-size: 1.6rem;

    width: 100%;
    height: 400px;

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

    flex: 1;

    .separator {
      height: 350px;

      /* background-color: green; */

      display: flex;
      flex-direction: column;

      .min-desc {
        height: 260px;

        overflow-y: hidden;

        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;

        /* background-color: orange; */
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
    margin-top: 60px;
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
