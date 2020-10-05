import React, { useRef } from 'react';
import Transaction, { TransactionProps } from '../Transaction';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem } from '@material-ui/core';

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
    list: {
      justifyContent: 'center',
    },
    listItem: {
      justifyContent: 'center',
    }
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
      <strong>Timestamp: {timestampDisplay}</strong>
      <div>Hash: {hashDisplay}</div>
      <div className={classes.root} >
          <Accordion  ref={ref}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
              </AccordionSummary>
              <AccordionDetails className={classes.list}>
                <List>
                  {data.map(transaction => (
                    <ListItem className={classes.listItem}>
                      <Transaction
                        key={transaction.id}
                        input={transaction.input}
                        output={transaction.output}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
      </div>
    </Container>
  );
}

export default Block;
