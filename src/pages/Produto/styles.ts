import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;

  width: 100%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;

  background-color: rgba(7, 7, 7, 0.8);

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
    height: 360px;

    img {
      width: 40%;
    }

    margin-bottom: 30px;

    justify-content: space-between;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    width: 40%;

    .separator {
      height: 360px;

      display: flex;
      flex-direction: column;

      .min-desc {
        flex: 1;

        overflow-y: hidden;
      }
    }
  }

  .cart {
    display: flex;
    gap: 20px;

    align-items: center;

    margin: 30px 0;

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
