import React from 'react';

import { Container } from './styles';

const MILESECONDS_PY = 1000 * 1000;

interface BlockProps {
  timestamp: string;
  hash: string;
  data: Object;
}

const Block: React.FC<BlockProps> = ({timestamp, hash, data}) => {
  const timestampDisplay = new Date(Number(timestamp)/MILESECONDS_PY).toLocaleString();
  const hashDisplay = `${hash.substr(0,15)}...`;

  return (
    <Container>
      <div>Timestamp: {timestampDisplay}</div>
      <div>Hash: {hashDisplay}</div>
      <div>{JSON.stringify(data)}</div>
    </Container>
  );
}

export default Block;