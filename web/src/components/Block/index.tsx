import React, { useRef } from 'react';
import Transaction, { TransactionProps } from '../Transaction';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Container } from './styles';

const MILESECONDS_PY = 1000 * 1000;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }),
);
interface BlockProps {
  timestamp: string;
  hash: string;
  data: TransactionProps[];
}

const Block: React.FC<BlockProps> = ({timestamp, hash, data}) => {
  const timestampDisplay = new Date(Number(timestamp)/MILESECONDS_PY).toLocaleString();
  const hashDisplay = `${hash.substr(0,15)}...`;
  const ref = useRef();

  const classes = useStyles();

  return (
    <Container>
      <div>Timestamp: {timestampDisplay}</div>
      <div>Hash: {hashDisplay}</div>
      <div className={classes.root} >
        {
          data.map(transaction => (
            <Accordion key={transaction.id} ref={ref}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{transaction.id}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Transaction
                  input={transaction.input}
                  output={transaction.output}
                />
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </Container>
  );
}

export default Block;
