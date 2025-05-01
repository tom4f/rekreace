import styled from '@emotion/styled';
import contactBackground from 'images/535b.jpg';

export const ContactWrapper = styled.article`
  background-image: url(${contactBackground});
  background-position: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
`;

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  & > * {
    width: 40%;
  }
`;

export const StyledAddress = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  border-radius: 5px;
  border: 1px solid white;
  padding: 2px;
  margin: 0.5rem auto 1rem;
  font-size: 1rem;

  div {
    margin: 10px;
    text-align: center;
    font-size: 13px;

    a {
      color: white;
    }
  }
`;
