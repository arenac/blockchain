import React from 'react';
import { createStyles, makeStyles, Paper, Theme } from '@material-ui/core';

import { Container } from './styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }),
);

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
  const classes = useStyles();
  const recipients = Object.keys(output);

  return (
    <Paper className={classes.paper}>
      <div>From: {input.address}</div>
      {
        recipients.map(recipient => (
          <div key={recipient}>
            To: {recipient } | Sent: {output[recipient]}
          </div>
        ))
      }
    </Paper>
  );
}

export default Transaction;
