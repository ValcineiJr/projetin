import styled from "styled-components";

export const Container = styled.div`
  min-height: 60vh;
  padding: 0 16px;
  padding-top: 100px;

  h1 {
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 2.4rem;
    margin-bottom: 20px;
  }

  .empty {
    color: #0f1111;
  }

  @media only screen and (max-width: 1000px) {
    .wrapper {
      flex-direction: column;
    }
  }

  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    border-radius: 5px;

    padding: 16px;

    background-color: white;
  }

  .item {
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;

    display: flex;

    justify-content: space-between;

    margin: 10px 0;

    .separator {
      gap: 20px;
      display: flex;
    }

    .status {
      font-size: 1.4rem;
      color: #0f1111;
      font-weight: bold;

      margin-left: 20px;

      text-align: center;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    input {
      border: 1px solid rgb(222, 224, 228);
      width: 50px;

      text-align: center;

      font-weight: bold;
      font-size: 1.6rem;
    }

    .item-name,
    .item-price {
      font-size: 1.4rem;
      color: #0f1111;
      font-weight: bold;
    }

    .item-price {
      color: #0f1111;
    }

    .item-img {
      min-height: 80px;
      min-height: 80px;

      max-width: 80px;
      max-width: 80px;

      img {
        min-height: 80px;
        min-height: 80px;

        max-width: 80px;
        max-width: 80px;
      }
    }
  }
`;
