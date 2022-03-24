import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #f1c77c3;
    --secondary-color: #1BD9C4;
    --background-color: #223547;
    --text-color: #f9f9f9;

  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: var(--text-color);
    background-color: var(--background-color);
  }
`
