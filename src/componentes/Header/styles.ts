import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.navbar_color};

  width: 100%;

  padding: 20px 0;

  .wrapper {
    width: 100%;
    max-width: 1200px;

    margin: 0 auto;

    color: ${({ theme }) => theme.colors.link_color};

    a {
      color: ${({ theme }) => theme.colors.link_color};
      margin-left: 7px;
    }
  }

  .rowOne {
    display: flex;
    justify-content: space-between;

    margin-bottom: 20px;
  }

  .logo {
    font-size: 2rem;
    color: white;
  }

  nav {
    width: 100%;

    ul {
      display: flex;
      font-size: 1.6rem;
      width: 100%;
      justify-content: space-evenly;

      li {
        display: flex;
        align-items: center;
      }
    }
  }
`;
