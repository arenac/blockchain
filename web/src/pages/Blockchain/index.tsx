import React, { useEffect, useState } from 'react';
import {createStyles, makeStyles, Paper, TablePagination, Theme} from '@material-ui/core';
import api from '../../services/api';
import Block from '../../components/Block';
import { TransactionProps } from '../../components/Transaction';

import { Container, Content } from './styles';
import { Home } from '@material-ui/icons';
import { Link } from 'react-router-dom';

interface Response {
  data: TransactionProps[];
  difficult: number;
  hash: string;
  last_hash: string;
  nonce: string;
  timestamp: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 100,
    },
    link: {
      marginBottom: 15,
    },
    paper: {
      padding: theme.spacing(6),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const Blockchain: React.FC = () => {
  const [size, setSize] = useState(0);
  const [blockchain, setBlockchain] = useState<Response[]>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();

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
    <div className={classes.root}>
      <div className={classes.link}>
        <Link to="/">
          <Home />
        </Link>
      </div>
      <Paper className={classes.paper}>
        <Content>
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
        </Content>

      </Paper>
    </div>
  );

}

export default Blockchain;
