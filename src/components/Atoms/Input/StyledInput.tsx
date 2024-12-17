import styled from 'styled-components';

export const StyledInput = styled.div`
  text-align: left;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  border: 1px solid white;
  padding: 2px;
  margin: 5px;

  &:hover {
    border: 1px solid black;
  }

  label {
    font-size: 0.7rem;
    color: white;
    font-weight: bold;
    margin: 2px 5px;
    display: block;
  }

  input,
  select,
  textarea {
    width: 90%;
    margin: auto;
    font-size: 1rem;
    background-color: transparent;
    border: none;
    margin: 2px 5px;
    color: white;
    letter-spacing: 0.1rem;

    &:focus {
      border: none;
      outline: none;
    }
  }

  input:is(
      :-webkit-autofill,
      :-webkit-autofill:hover,
      :-webkit-autofill:focus,
      :-webkit-autofill:active,
      :autofill,
      :autofill:hover,
      :autofill:focus,
      :autofill:active,

    ) {
    -webkit-text-fill-color: #31b0dd;
    transition: background-color 5000s ease-in-out 0s;
  }

  option {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
