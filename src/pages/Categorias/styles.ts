import styled from "styled-components";

interface ContainerProps {
  message?: string;
}

export const Container = styled.div<ContainerProps>`
  min-height: 60vh;

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

  .square {
    position: relative;
    width: 100%;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .square:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  h1 {
    text-align: center;
    color: #fff;
    margin: 30px 0;

    font-size: 3rem;
  }

  .wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  .products {
    display: grid;

    justify-content: center;

    grid-template-columns: repeat(auto-fit, 350px);
    grid-gap: 20px;

    .product {
      padding: 16px;
      padding-bottom: 30px;
      transition: all 0.6s;

      &:hover {
        box-shadow: 0 0 30px rgb(53, 53, 192);
      }

      border-radius: 10px;
      background-color: rgb(39, 46, 85);

      color: #fff;

      .title {
        font-size: 1.4rem;

        margin: 16px 0;
      }

      .price {
        display: flex;
        justify-content: space-between;

        margin-top: 30px;

        span {
          font-size: 2.6rem;
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
        }
      }
    }
  }
`;
