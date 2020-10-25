import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderContend, Contend } from './styles';

import logo from '../../assets/logo.png';
import Wallet from '../../components/Wallet';
import { Container, createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: 50,
    },
    paper: {
      padding: theme.spacing(6),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const Home: React.FC = () => {
  const classes = useStyles();

  return (

    <Container fixed>
      {/* <Header /> */}
      <HeaderContend>
        <img src={logo} alt="Logo"/>

        <h1>Welcome to pychain</h1>
      </HeaderContend>

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Wallet />
          </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Link to="blockchain">
                Blockchain
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Link to="transactions">
                Transaction
              </Link>
            </Paper>
          </Grid>
        </Grid>


      </div>
    </Container>
  );
}

export default Home;
