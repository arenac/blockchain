import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Block from '../Block';
import { TransactionProps } from '../Transaction';

import { Container } from './styles';

interface Response {
  data: TransactionProps[];
  difficult: number;
  hash: string;
  last_hash: string;
  nonce: string;
  timestamp: string;
}

const Blockchain: React.FC = () => {
  const [blockchain, setBlockchain] = useState<Response[]>();

  useEffect(() => {
    api.get('blockchain')
      .then(response => {
        setBlockchain(response.data);
      })
  }, []);

  return (
    <Container>
      <h3>Blockchain</h3>
      { blockchain?.map(block =>
        <Block
          key={block.hash}
          timestamp={block.timestamp}
          hash={block.hash}
          data={block.data}
        />
      )}
    </Container>
  );

}

export default Blockchain;
