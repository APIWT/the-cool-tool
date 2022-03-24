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