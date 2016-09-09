
import React from 'react';

import MyGrid from 'components/Layout/MyGrid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import Description from 'components/Meta/Description';
import Helmet from 'react-helmet';

export default class NoPage extends React.Component {

  render() {
    return (
      <MyGrid>
        <Helmet title="Kortapositioner.se"/> 
        <Description
      description="A small service providing historic data over short positions in swedish stocks."
      keywords="finance, swedish-stocks, nasdaq, short, shorting, trading" />
        <Row>
          <Col md={6} mdOffset={3}>
            <Well className="testing">
              <h1>No such page</h1>
              <p>
                The page you are looking for does not exist. If you typed the url please
                try again or use a link on this page to navigate to the correct place.
              </p>
              <p>
                If a link brought you here, please inform me via twitter (@SvenssonAlbin)
                so that I can solve the issue.
              </p>
            </Well>
          </Col>
        </Row>
      </MyGrid>
      );
  }
}
