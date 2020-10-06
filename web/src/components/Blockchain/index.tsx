import React, { useEffect, useState } from 'react';
import {TablePagination, Box} from '@material-ui/core';
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
  const [size, setSize] = useState(0);
  const [blockchain, setBlockchain] = useState<Response[]>();
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(4);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const perPage = event.target.value;
    setRowsPerPage(parseInt(perPage, 10));
    setPage(0);
    setStart(0);
    setEnd(parseInt(perPage))
    console.log('handleChangeRowsPerPage')
  };

  useEffect(() => {
    api.get('blockchain/length')
      .then(response => {
        const _size = response.data;
        setSize(_size);
      });
  }, []);

  useEffect(() => {
    api.get(`blockchain/range?start=${start}&end=${end}`)
      .then(response => {
        setBlockchain(response.data);
      });
  }, [start, end]);

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
      <Box>
        <TablePagination
          component="div"
          count={size}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );

}

export default Blockchain;
