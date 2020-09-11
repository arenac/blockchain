import React from 'react';

import { Container, HeaderContand } from './styles';

import logo from '../../assets/logo.png';
import Wallet from '../../components/Wallet';

const Home: React.FC = () => {
  return (
    <Container>
      <HeaderContand>
        <img src={logo} alt="Logo"/>
        <h1>Welcome to pychain</h1>
      </HeaderContand>

      <Wallet />
    </Container>
  );
}

export default Home;
