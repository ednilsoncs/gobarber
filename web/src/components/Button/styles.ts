import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff9000;
  border-radius: 10px;
  height: 56px;
  border: 0;
  padding: 16px;
  color: #312e38;
  width: 100%;
  font-weight: 500;
  margin-top: 10px;
  transition: background 0.2s;

  & :hover {
    background: ${shade(0.2, '#ff9000')};
  }
`;
