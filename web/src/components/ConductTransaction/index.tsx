import { Button, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect,  ChangeEvent } from 'react';

import api from '../../services/api';

import { Container } from './styles';

const ConductTransaction: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipinet] = useState('');

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
  <Container>
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
      <Button type="submit" onClick={submitTransaction}>Submit transaction</Button>
    </FormGroup>
  </Container>);
}

export default ConductTransaction;
