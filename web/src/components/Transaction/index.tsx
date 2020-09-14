import React from 'react';

import { Container } from './styles';

export interface TransactionProps {
  id?: string;
  input: {
    address: string;
    amount: number;
    public_key: string;
    signature: number[];
    timestamp: number;
  };
  output: Record<string, number>;
};

const Transaction: React.FC<TransactionProps> = ( {id, input, output} ) => {
  const recipients = Object.keys(output);

  return (
    <Container>
      <div>From: {input.address}</div>
      {
        recipients.map(recipient => (
          <div key={recipient}>
            To: {recipient } | Sent: {output[recipient]}
          </div>
        ))
      }
    </Container>
  );
}

export default Transaction;
