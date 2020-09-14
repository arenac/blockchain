import React from 'react';

import { HeaderContend, Contend } from './styles';

import logo from '../../assets/logo.png';
import Wallet from '../../components/Wallet';
import { Container } from '@material-ui/core';
import Blockchain from '../../components/Blockchain';
import Transaction from '../../components/Transaction';

const Home: React.FC = () => {
  return (

    <Container fixed>
      {/* <Header /> */}
      <HeaderContend>
        <img src={logo} alt="Logo"/>
        <h1>Welcome to pychain</h1>
      </HeaderContend>

      <Contend>
        <Wallet />
        <Blockchain />
        <Transaction />
      </Contend>
    </Container>
  );
}

export default Home;
