import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
    height: 100vh;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        margin-top: 24px;
    }
`

export const Label = styled.label`
    display: block;
    margin-bottom: 20px;
`

export const Image = styled.img`
    width: 240px;
    animation: ${rotate} 15s linear infinite;
`

export const Text = styled.p`
    margin-top: 24px;
    font-size: 18px;
`

export const Header = styled.h1`
    margin-top: 24px;
    font-size: 24px;
    font-weight: bold;
`

export const Button = styled.button`
    margin-top: 24px;
    font-size: 18px;
    background-color: #00bcd4;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #00bcd4;
    padding: 8px;
    cursor: pointer;
`

export const Links = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 24px;

    a {
      text-decoration: none;
      color: var(--secondary-color);

      :hover {
        text-decoration: underline;
      }
    }
`

export const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
`

export const Nav = styled.nav`
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--secondary-color);
`

export const Main = styled.main`
    width: 85%;
    height: 100%;
    display: grid;
    place-items: center;
`

export const Logo = styled.img`
    width: 100%;
    height: auto;
    margin-top: 24px;
    object-fit: contain;
`