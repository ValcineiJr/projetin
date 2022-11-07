import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 0;
  margin-top: 40px;

  .bold {
    font-weight: bold;
  }

  @media only screen and (max-width: 1000px) {
    .contacts {
      flex-direction: column;
      margin: 0 16px;
    }
  }

  .contacts {
    gap: 30px 0;

    justify-content: space-around;

    display: flex;

    .contact {
      display: flex;
      flex-direction: column;

      gap: 30px;

      align-items: center;
      font-size: 1.6rem;
    }
  }

  background-color: rgba(7, 7, 7, 0.8);
  color: white;

  .wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    border-bottom: 1px solid #fff;

    padding-bottom: 50px;
  }

  .title {
    font-size: 2.6rem;
    text-align: center;

    margin-bottom: 40px;
  }

  .credits {
    font-size: 1.6rem;
    text-align: center;
    margin-top: 30px;
  }
`;
