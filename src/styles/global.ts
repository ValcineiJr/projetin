import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
 html {
  box-sizing: border-box;
  font-size: 62.5%;
  height:100vh;
  scroll-behavior: smooth;
}
.bold{
   font-weight: bold;
}
html,body {
  font-family: "Poppins", sans-serif !important;
}
*, *:before, *:after {
  box-sizing: border-box;
  border:0;
}
button{
  cursor: pointer;
}
input{ outline:none}
a{
  text-decoration: none;
}
body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}
ol, ul {
  list-style: none;
}
img {
  max-width: 100%;
  height: auto;
}
//responsive
@media (max-width: 500px) {
  html {
    font-size: 50%;
  }
}
`;
