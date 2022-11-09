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
    gap: 60px;

    font-size: 1.6rem;

    width: 100%;

    img {
      width: 300px;
    }

    margin-bottom: 30px;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }

  .cart {
    display: flex;
    gap: 20px;

    p {
      font-size: 2.3rem;
    }
  }

  textarea {
    background-color: transparent;
    width: 100%;
    height: 300px;

    color: white;

    border: none;
    outline: none;

    text-align: left;
  }
`;
