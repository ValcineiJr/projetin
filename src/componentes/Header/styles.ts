import styled from "styled-components";

interface ContainerProps {
  showMenu: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${({ theme }) => theme.colors.navbar_color};

  .menu {
    display: none;
  }

  width: 100%;

  padding: 20px 0;

  height: 100px;

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

  .logo-mobile {
    display: none;
  }

  .logo,
  .logo-mobile {
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

  @media only screen and (max-width: 1000px) {
    padding: 0;

    .menu {
      display: flex;

      align-items: center;
      justify-content: center;

      position: absolute;
      right: 16px;
      top: 16px;

      font-size: 40px;

      background-color: transparent;

      color: white;
    }

    .logo-mobile {
      display: block;
      position: absolute;
      left: 16px;
      top: 34px;
    }

    .logo {
      display: none;
    }

    .wrapper {
      z-index: 2;

      width: 70%;

      position: absolute;

      background-color: #1b1b1b;

      transition: all 0.6s;

      margin-left: ${({ showMenu }) => (showMenu ? "-70%" : 0)};
    }

    ul {
      flex-direction: column;

      li {
        padding: 16px;
      }
    }
  }
`;
