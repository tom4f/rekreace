import styled from 'styled-components';

export const Article = styled.article`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 400px;
  color: white;
  border: 2px solid #555;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 0;
`;

export const MainHeader = styled.header`
  color: black;
  font-size: 50px;
  text-align: center;
`;

export const Header = styled.header`
  color: white;
  font-size: 30px;
  text-align: center;
`;

export const Section = styled.section`
  background-color: rgba(0, 0, 0, 0.4);
  width: 90%;
  border-radius: 5px;
  border: 1px solid white;
  padding: 10px;
  margin: 10px auto;

  &:hover {
    border: 1px solid black;
  }

  label {
    font-size: 1.5rem;
    text-align: left;
    margin: 2px 5px;
    display: block;
  }

  input,
  select {
    font-size: 1rem;
    width: 100%;
    background-color: transparent;
    border: none;
    margin: 2px 5px;
    color: white;
    letter-spacing: 0.1rem;

    &:focus {
      border: none;
      outline: none;
    }

    option {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  ul {
    input[type='checkbox'] {
      width: 10px;
    }

    li {
      font-size: 1.3rem;
    }
  }

  span {
    display: inline-block;
    color: gray;
    width: 25%;
    text-align: right;

    &:hover {
      text-decoration-line: underline;
      cursor: pointer;
      color: lime;
    }
  }
`;

export const Submit = styled.div`
  border-radius: 5px;
  border: 1px solid white;
  margin: 20px auto;
  background-color: rgba(0, 255, 0, 0.4);
  width: 90%;
  padding: 15px;
  text-align: center;

  &:hover {
    border: 1px solid black;
    border-radius: 5px;
  }

  button {
    width: 100%;
    font-size: 1.5rem;
  }
`;

export const TopBar = styled.header`
  text-align: right;
  background-color: rgba(255, 255, 255, 0.5);

  span {
    color: black;
    font-size: 20px;
    margin: 10px;
  }

  span:hover {
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
