import { createGlobalStyle } from 'styled-components';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

export default createGlobalStyle`
  @import url('https://fonts.googlepais.com/css?family=Source+Sans+pro');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #353940;
    color: #FFF;
    font-family: 'Source Sans Pro', sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  html, body, #root {
    height: 100%;
  }

  input, button {
    cursor: pointer;
  }
`;
