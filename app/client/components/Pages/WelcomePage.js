
import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class WelcomePage extends React.Component {
  render() {

    return (
      <Jumbotron className="welcome">
        <Grid>
          <h1>Welcome to kortapositioner.se</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        </Grid>
      </Jumbotron>
      );
    }
  }
