import styled from "styled-components";

export const Container = styled.div`
  min-height: 60vh;
  padding: 100px 20px 80px 20px;

  @media only screen and (max-width: 1000px) {
    .wrapper {
      flex-direction: column;
    }
  }

  .wrapper {
    width: 100%;
    max-width: 1200px;

    display: flex;
    gap: 20px;

    margin: 0 auto;

    background-color: #fff;
    padding: 20px;

    border-radius: 5px;

    .number,
    .title,
    .frete {
      font-size: 1.6rem;
      color: #0f1111;
      font-weight: bold;
    }

    .title {
      margin: 0 20px;
    }

    section {
      /* background-color: green; */
      flex: 4;

      .box {
        display: flex;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        margin-bottom: 10px;
      }

      .info {
        font-size: 1.4rem;
        color: #0f1111;
      }

      .cart {
        .item {
          padding: 16px;
          border: 1px solid #ddd;
          border-radius: 5px;
          gap: 20px;
          display: flex;

          margin: 10px 0;

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
      }
    }

    aside {
      flex: 1;
      padding: 16px;
      border-radius: 5px;
      border: 1px solid #ddd;
      height: max-content;
      /* background-color: red; */

      .result {
        background-color: ${({ theme }) => theme.colors.success};
        padding: 16px;

        display: flex;

        align-items: center;
        justify-content: space-between;

        flex-direction: column;

        border-radius: 5px;

        text-align: center;
        font-size: 1.4rem;

        color: white;

        p {
          font-weight: bold !important;

          margin-bottom: 10px;
        }

        margin-top: 20px;
      }

      .finish {
        .button,
        .resumo {
          border-bottom: 1px solid #ddd;
        }

        .button {
          padding-bottom: 10px;
          margin-bottom: 10px;
        }

        p {
          font-size: 1.6rem;
          color: #0f1111;
          font-weight: bold;

          margin-bottom: 10px;
        }

        .resumo {
        }

        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          font-size: 1.2rem;
          color: #0f1111;

          padding-bottom: 5px;
        }

        .total {
          .ligh {
            color: #0f1111;
            font-size: 1.4rem;
            font-weight: bold;

            margin-top: 10px;
          }
        }
      }
    }
  }
`;
