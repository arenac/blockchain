import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { Container } from './styles';

interface Response {
  data: Object[];
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
        <div key={block?.hash}>
          {JSON.stringify(block)}
        </div>
      )}
    </Container>
  );

}

export default Blockchain;
