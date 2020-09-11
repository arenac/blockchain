import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Container } from './styles';

interface IResponse {
  address: string;
  balance: number;
}

const Wallet: React.FC = () => {
  const [walletInfo, setWalletInfo] = useState<IResponse>();

  useEffect(() => {
    api.get('wallet/info')
      .then(response => {
        setWalletInfo(response.data);
      });
  }, []);

  return (
    <Container>
      <p>Address: {walletInfo?.address}</p>
    </Container>
  );
}

export default Wallet;
