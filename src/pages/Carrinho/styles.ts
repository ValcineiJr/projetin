import { AiFillCloseCircle } from "react-icons/ai";
import styled from "styled-components";

export const Container = styled.div`
  min-height: 60vh;
  width: 100%;
  padding: 16px;

  margin-top: 40px;

  @media only screen and (max-width: 1000px) {
    .preci-text {
      display: none !important;
    }
  }

  img {
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: 1000px) {
    .wrapper {
      flex-direction: column;
    }

    /* margin: 0 16px; */
  }

  .wrapper {
    display: flex;
    width: 100%;
    margin: 0 auto;

    gap: 20px;

    section,
    .itens-recentes,
    .resumo {
      background-color: white;
      border-radius: 5px;
      height: max-content;

      button:disabled {
        background-color: #888;
        cursor: not-allowed;
      }
    }

    section {
      display: flex;
      flex-direction: column;

      padding: 30px;

      flex: 4;
      .header {
        position: relative;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;

        h1 {
          font-size: 2.8rem;
        }

        a,
        p {
          font-size: 1.4rem;
        }

        a:hover {
          text-decoration: underline;
          color: ${({ theme }) => theme.colors.error};
        }

        p {
          position: absolute;
          bottom: 10px;
          right: 0;
        }
      }

      .item {
        display: flex;
        border-bottom: 1px solid #ddd;

        justify-content: space-between;

        padding-top: 12px;

        @media only screen and (max-width: 1000px) {
          flex-direction: column;
          /* background-color: red; */

          .price {
            margin-left: auto;

            margin-right: 10px;
            margin-bottom: 10px;
          }
        }

        .price {
          font-weight: bold;
          font-size: 1.8rem;
        }

        .separator {
          display: flex;

          align-items: center;

          .img-product {
            min-height: 180px;
            min-width: 180px;

            max-height: 180px;
            max-width: 180px;

            margin: 0 12px;

            img {
              min-height: 180px;
              min-width: 180px;

              max-height: 180px;
              max-width: 180px;
            }
          }

          .info {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;

            gap: 20px;

            /* background-color: green; */

            @media only screen and (max-width: 1000px) {
              .options {
                /* background-color: red; */
                flex-direction: column;
                align-items: center;
                justify-content: center;

                text-align: center;

                .exclude {
                  margin-left: 25px;
                  margin-top: 10px;
                }
              }
            }

            .options {
              display: flex;
              align-items: center;

              .separator {
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .icon {
                font-size: 1.8rem;
              }
            }

            input {
              border: 1px solid rgb(222, 224, 228);
              width: 50px;

              text-align: center;

              font-weight: bold;
              font-size: 1.6rem;
            }

            label {
              font-size: 1.4rem;
              font-weight: bold;
            }

            button {
              background-color: transparent;

              color: #1111b3;
              font-size: 1.4rem;

              border: none;

              font-family: "Poppins", sans-serif;
            }

            button:hover {
              text-decoration: underline;
            }

            height: 100%;

            .name-product {
              font-size: 1.8rem;
              color: #1b1b1b;
              font-weight: 500;
            }
          }
        }

        /* background-color: red; */
      }
    }

    aside {
      display: flex;
      position: relative;
      flex-direction: column;
      flex: 1;
      gap: 20px;

      .resumo {
        padding: 30px;

        gap: 15px;
        display: flex;
        flex-direction: column;

        .row {
          display: flex;
          justify-content: space-between;

          font-size: 1.6rem;

          .light {
            font-weight: 300;
            font-size: 1.2rem;
          }
          .bold {
            font-weight: bold;
            font-size: 1.6rem;
          }
        }

        .pix {
          background-color: lightsalmon;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;

          height: 100px;
        }

        button {
          background-color: #1111b3;

          padding: 16px;

          color: white;
          font-size: 1.6rem;

          border-radius: 5px;

          font-family: "Poppins", sans-serif;
        }

        h2 {
          font-weight: bold;

          font-size: 1.8rem;
        }
      }

      .itens-recentes {
        padding: 30px;

        gap: 15px;
        display: flex;
        flex-direction: column;

        button {
          background-color: #1111b3;

          padding: 2px;

          color: white;
          font-size: 1.6rem;

          border-radius: 5px;

          font-family: "Poppins", sans-serif;
        }

        h2 {
          font-weight: bold;

          font-size: 1.8rem;
        }

        .recent-item {
          display: flex;
          gap: 10px;

          font-size: 1.4rem;

          a {
            color: #1111b3;
          }

          .recent-img {
            flex: 1;
            height: 100px;
          }

          .recent-info {
            flex: 2;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            gap: 10px;

            p.name {
              text-overflow: ellipsis;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
  /* max-width: 1200px; */
`;
