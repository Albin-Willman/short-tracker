import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ContentWell from 'components/Wells/ContentWell';

const STYLES = {
  jumbo: {
    minHeight: '300px',
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
          <Row className="well-row">
            <Col md={4} sm={6}>
              <ContentWell
                title="Intro"
                glyph="stats"
                type="highlight"
                morePage="/stocks"
                moreText="Get going">
                <p>
                  On this site you will find how all major short positions on the swedish
                  stock exchange has changed over time since november 2012.
                </p>
                <p>
                  My goal is to make the positions a
                  little bit more visible and accessible than the 5000 line excell sheet that FI
                  publishes on a daily basis.
                </p>
                <p>
                  This site was first concieved in july of 2016 and is intended to be a living
                  and growing project.
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
              <ContentWell
                title="Contribute"
                glyph="thumbs-up"
                morePage={repoLink}
                moreText="View code"
                moreExternal={true}>
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
        <Jumbotron>
          <Grid>
            <p>
              Keep up with the latest changes
            </p>
          </Grid>
        </Jumbotron>
        <Grid>
          <Row className="well-row">
            <Col md={4} sm={6}>
              <ContentWell title="Updates" glyph="refresh">
                <p>
                  If you are interested in updates about this project please follow med on
                  twitter <a href={twitterLink} target="_blank">@SvenssonAlbin</a>.
                </p>
                <p>
                  I will post there whenever I post new content or publish new features.
                </p>
              </ContentWell>
            </Col>
            <Col md={4} sm={6}>
              <ContentWell title="Share" type="highlight" glyph="share">
                <p>
                  If you find this site worthwhile or if you think that someone you know might do
                  so: Please share this site in your preferred social media.
                </p>
              </ContentWell>
            </Col>
            <Col md={4} sm={12}>
              <ContentWell title="Performance" type="accent" glyph="signal">
                <p>
                  This site runs on the cheapest possible hardware. This means that there might
                  be performance issues and/or downtime. I will do my best to avoid this but
                  please bear in mind that this is a 100% free web service I am providing.
                </p>
                <p>
                  If you are experiencing a lot problems with pages not loading please let me know
                  and I will try to fix the issues.
                </p>
              </ContentWell>
            </Col>
          </Row>
        </Grid>
      </div>
      );
  }
}
