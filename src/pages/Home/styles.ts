import styled from "styled-components";

interface ContainerProps {
  message?: string;
}

export const Container = styled.div<ContainerProps>`
  .messageBox {
    margin: auto;

    width: 100%;
    max-width: 1000px;
  }

  .messageBox {
    display: ${({ message }) => (message !== "" ? "flex" : "none")};
    background-color: ${({ theme }) => theme.colors.success};

    transition: all 1s;

    border-radius: 5px;

    height: 40px;

    color: white;

    align-items: center;
    justify-content: center;

    font-size: 1.6rem;

    margin-bottom: 20px;
  }

  h1 {
    text-align: center;
    color: #fff;
    font-size: 4rem;

    margin: 40px 0;
  }
  .carossel {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    margin-top: 40px;

    .img-container {
      width: 100%;
      height: 560px;
      z-index: -1;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  section {
    display: flex;
    gap: 20px;

    @media only screen and (max-width: 1000px) {
      flex-direction: column;
      margin: 0 16px;
    }

    .section-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;

      color: ${({ theme }) => theme.colors.text};

      background-color: rgb(29, 49, 161);

      border: 1px solid #fff;

      padding-bottom: 16px;

      .info {
        /* background-color: red; */

        display: flex;
        flex-direction: column;
        flex: 1;

        justify-content: space-between;

        min-height: 100px;

        .separator {
          display: flex;
          width: 100%;

          /* background-color: red; */

          align-items: center;

          padding: 0 16px;

          justify-content: space-between;

          span {
            font-size: 1.6rem;
            font-weight: bold;
            color: white;
          }
        }
      }

      img {
        height: 384px;
      }

      p {
        margin: 0 16px;
      }

      .title {
        font-size: 2rem;
        color: whitesmoke;
      }

      .description {
        font-size: 1.6rem;
      }

      a {
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;

        font-size: 1.6rem;

        border-radius: 5px;

        padding: 8px 16px;
      }

      button {
        color: #fff;
        background-color: #0d6efd;
        border-color: #0d6efd;
        border-radius: 5px;
        padding: 8px 16px;

        margin-left: 20px;
      }
    }
  }
`;
