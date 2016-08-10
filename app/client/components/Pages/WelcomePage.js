
import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ContentWell from 'components/Wells/ContentWell';

const STYLES = {
  jumbo: {
    backgroundImage: 'url(/img/chart1.jpg)',
    minHeight: '300px',
    backgroundPosition: 'center',
  },
};

const repoLink = 'https://github.com/Albin-Willman/short-tracker';
const email = 'albin@kortapositioner.se';
const twitterLink = 'https://twitter.com/SvenssonAlbin';
const fiLink = 'https://en.wikipedia.org/wiki/Financial_Supervisory_Authority_(Sweden)';
const avanzaLink = 'https://www.avanza.se';

export default class WelcomePage extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron className="welcome" style={STYLES.jumbo}>
          <Grid>
            <h1>Welcome to kortapositioner.se</h1>
            <p>
              An easy way to assess whos shorting what
            </p>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row>
            <Col md={4} sm={6}>
              <ContentWell
                title="Intro"
                glyph="stats"
                type="highlight"
                morePage="/stocks"
                moreText="Get going">
                <p>
                  On this site you will find how all major short positions on the swedish
                  stock exchange has changed over time. My goal is to make the positions a
                  little bit more visible and accessible than the 5000 line excell sheet that FI
                  publishes on a daily basis.
                </p>
              </ContentWell>
            </Col>
            <Col md={4} sm={6}>
              <ContentWell title="Data" glyph="list" type="accent" morePage="/about">
                <p>
                  The data displayed on this page is gathered from <a
                    href={fiLink}
                    target="_blank">
                    Financial Supervisory Authority (FI)
                  </a> and <a
                    href={avanzaLink}
                    target="_blank">
                      Avanza
                  </a>. Fi publishes new data on all weekdays and I try to publish it as quickly
                  as possible but this procedure is not 100% automatic yet so there might be
                  delays.
                </p>
                <p>
                  It is important to know that the FI data is reported to them by the institutions
                  holding the short positions themselves. This might be a source for error.
                  The penalties for reporting late are quite small compared to the amount of money
                  at stake in the positions.
                </p>
                <p>
                  Verify the data yourself before taking any actions based on the data you
                  find on this site.
                </p>
              </ContentWell>
            </Col>
            <Col md={4} sm={12}>
              <ContentWell title="Contribute" glyph="thumbs-up">
                <p>
                  I am a fan of the open web and this site is 100% open source. The code is hosted
                  at <a href={repoLink} target="_blank">github</a>. Feel free to look around and
                  help out.
                </p>
                <p>
                  Regardless if you are intrested in code or not there is a multitude of ways to
                  contribute to a project such as this. Improvement suggestions and spellcheck
                  are just two examples that are really important.
                </p>
                <p>
                  If you see anything that seems wrong, broken or just odd please let me know
                  via <a href={twitterLink} target="_blank">
                    twitter
                  </a> or <a href={'mailto:' + email}>{email}</a>.
                </p>
              </ContentWell>
            </Col>
          </Row>
        </Grid>
      </div>
      );
  }
}
