import React, { useState, useEffect,  ChangeEvent } from 'react';
import { Button, createStyles, FormControl, FormGroup, Input, InputLabel, makeStyles, Paper, Theme } from '@material-ui/core';

import api from '../../services/api';

import { Container } from './styles';
import { Link } from 'react-router-dom';
import { Home } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 50,
      padding: 200,
    },
    link: {
      marginBottom: 15,
    },
    paper: {
      padding: theme.spacing(6),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    formGroup: {
      marginBottom: 50,
    },
    button: {
      marginTop: 30,
      width: 'fit-content'
    }
  }),
);

const ConductTransaction: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipinet] = useState('');
  const classes = useStyles();

  const updateRecipient = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipinet(event.currentTarget.value);
  };

  const updateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.currentTarget.value));
  };

  const submitTransaction = () => {
    api.post('wallet/transaction', {
      recipient,
      amount,
    }).then(response => {

    }).finally(() => {
      setRecipinet('');
      setAmount(0);
    })
  };

  return (
  <div className={classes.root}>
   <div className={classes.link}>
    <Link to="/">
      <Home />
    </Link>
   </div>
    <Paper className={classes.paper}>
      <h3>Conduct a Transaction</h3>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="recipient">Recipient</InputLabel>
          <Input id="recipient" value={recipient} onChange={updateRecipient}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <Input id="amount" value={amount} onChange={updateAmount}/>
        </FormControl>
        <Button variant="contained" type="submit" className={classes.button} onClick={submitTransaction}>Submit transaction</Button>
      </FormGroup>
    </Paper>
  </div>);
}

export default ConductTransaction;
