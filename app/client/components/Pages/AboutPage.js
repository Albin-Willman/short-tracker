import React from 'react';
import Helmet from 'react-helmet';

import MyGrid from 'components/Layout/MyGrid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';
import AppInfo from 'containers/AppInfo';
import ChitikaAd from 'containers/Ads/ChitikaAd';
import OptimalAd from 'containers/Ads/OptimalAd';

export default class AboutPage extends React.Component {

  render() {

    return (
      <MyGrid>
        <Helmet titleTemplate="Kortapositioner.se" title="Kortapositioner.se"/>
        <Row>
          <Col md={8}>
            <Well className="highlight">
              <h1>Kortapositioner.se</h1>
              <p>
                Kortapositioner.se is a small personal side project built to give an overview of
                the current status of short postions on
                the <a
                  href="https://en.wikipedia.org/wiki/Stockholm_Stock_Exchange"
                  target="_blank">
                  Stockholm Stock Exchange
                </a>.
              </p>
              <p>
                There are two main reasons for me building it:
              </p>
              <ol>
                <li>I like building things.</li>
                <li>
                  I kept doing the same charts and calculations in excel and wanted to automate it.
                </li>
              </ol>
              <p>
                The project is 100% open source and entirely developed on my spare time. Since
                the data collectionis not 100% automatic (yet) I cannot guarantee that the
                data is up to date at any given point.
              </p>
            </Well>
            <Well>
              <h2>Shorting</h2>
              <p>
                Shorting a stock is when you borrow shares in a company and sell them hoping that
                the stock price is going to fall so that when you repurchase them and return them
                to the owner you will have made a profit. Since this is a loan the entity shorting
                the stock will have to pay interest to the entity lending them the shares.
              </p>
              <p>
                According to swedish regulations if a single entity have shorted more than 0.5% of
                a company they are obligated to report that to
                the <a
                  href="https://en.wikipedia.org/wiki/Financial_Supervisory_Authority_(Sweden)">
                  Financial Supervisory Authority
                </a>. The lists of all such positions are made public on a daily basis.
              </p>
            </Well>
            <Well className="accent">
              <h2>Why care?</h2>
              <p>
                Since the entity shorting the stock is paying interest on their position holding
                that position for an extended period of time will be expensive. Especially if
                the price of stock in question starts to rise.
              </p>
              <p>
                If there are multiple entities shorting a stock or someone haveing a really large
                short position. It will be hard for them to repurchase all the shares they need
                to return without influencing the price of the stock.
              </p>
              <p>
                If the price of a shorted stock starts to rise and an entity with a large short
                position realises that they need to close their position this causes a
                cascading effect called a "short squeeze" forcing the stock price even higher.
                This can in turn force other people holding a short position to close theirs
                and so on.
              </p>
              <p>
                The same is true in the opposite direction if a stock price is fallnig and
                someone or someones starts taking large short positions the price can be
                pushed even lower.
              </p>
              <p>
                For these reasons it seems reasonable to keep track of changes in short
                positions.
              </p>
            </Well>
          </Col>
          <Col md={4}>
            <AppInfo />
            <Well className="add-well">
              <OptimalAd config={{ width: 300, height: 250 }}/>
              <ChitikaAd config={{ width: 250, height: 250 }}/>
            </Well>
          </Col>
        </Row>
      </MyGrid>
      );
  }
}
