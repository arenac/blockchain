import React from 'react';
import Transaction, { TransactionProps } from '../Transaction';

import { Container } from './styles';

const MILESECONDS_PY = 1000 * 1000;

interface BlockProps {
  timestamp: string;
  hash: string;
  data: TransactionProps[];
}

const Block: React.FC<BlockProps> = ({timestamp, hash, data}) => {
  const timestampDisplay = new Date(Number(timestamp)/MILESECONDS_PY).toLocaleString();
  const hashDisplay = `${hash.substr(0,15)}...`;

  return (
    <Container>
      <div>Timestamp: {timestampDisplay}</div>
      <div>Hash: {hashDisplay}</div>
      <div>
        {
          data.map(transaction => (
            <>
              <hr/>
              <Transaction
                key={transaction.id}
                input={transaction.input}
                output={transaction.output}
               />
            </>
          ))
        }
      </div>
    </Container>
  );
}

export default Block;
