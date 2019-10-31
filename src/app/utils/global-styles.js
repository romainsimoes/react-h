import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0 !important;
  }

  body {
    font-family: 'Averta', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Averta', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
`;

export default GlobalStyle;
