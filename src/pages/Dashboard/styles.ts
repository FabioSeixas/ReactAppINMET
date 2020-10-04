import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  font-size: 56px;
  color: #333333;
  max-width: 400px;
  line-height: 60px;
  margin-top: 40px;
`;

export const Form = styled.form`
  margin-top: 40px;
  max-width: 400px;
  display: flex;

  input {
    flex: 1;
    height: 50px;
    padding: 10px;
    border: 2px solid #5c5c5c;
    border-radius: 10px 0 0 10px;
    color: #333333;

    &::placeholder {
      color: #b8b8b8;
    }
  }

  button {
    color: #f0e2e7;
    background: #1f5673;
    width: 110px;
    border: 0;
    border-radius: 0 10px 10px 0;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#1f5673')};
    }
  }
`;

export const StationsList = styled.div`
  margin-top: 50px;
  max-width: 400px;

  a {
    width: 100%;
    background: #fff;
    text-decoration: none;
    border: 1px solid;
    border-radius: 10px;
    color: #2d3047;
    display: block;
    padding: 12px;
    transition: transform 0.2s;

    & + a {
      margin-top: 8px;
    }

    &:hover {
      transform: translateX(10px);
    }

    strong {
      font-size: 18px;
    }

    p {
      margin-top: 8px;
    }
  }
`;

export const Error = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  span {
    color: #c53030;
    margin-left: 5px;
  }
`;
