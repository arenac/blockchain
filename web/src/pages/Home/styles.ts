import styled from 'styled-components';

export const Container = styled.div`
  & {
    flex-grow: 1;
  }
`;

export const HeaderContend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  img {
    width: 100px;
    height: 100px;
  }

  h1 {
    margin-left: 30px;
  }
`;

export const Contend = styled.div`
  padding: 30px 40px;
`;
