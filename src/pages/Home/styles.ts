import styled from "styled-components";

export const Container = styled.div`
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
      background-color: red;
      height: 550px;

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

      p {
        margin: 0 16px;
      }

      .title {
        font-size: 2rem;
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

        margin-right: auto;
        margin-left: 16px;
      }
    }
  }
`;
