import React, { useEffect, useState } from 'react';
import {TablePagination} from '@material-ui/core';
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    api.get('blockchain/length')
      .then(response => {
        const _size = response.data;
        setSize(_size);
      });
  }, []);

  useEffect(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    api.get(`blockchain/range?start=${start}&end=${end}`)
      .then(response => {
        setBlockchain(response.data);
      });
  }, [page, rowsPerPage]);

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
      <TablePagination
        id="blockchain-pagination"
        component="div"
        count={size}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        color="secondary"
      />
    </Container>
  );

}

export default Blockchain;
