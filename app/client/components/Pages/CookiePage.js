
import React from 'react';
import Helmet from 'react-helmet';

import MyGrid from 'components/Layout/MyGrid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Well from 'react-bootstrap/lib/Well';

import AppInfo from 'containers/AppInfo';

export default class CookiePage extends React.Component {

  render() {
    return (
      <MyGrid>
        <Helmet titleTemplate="Kortapositioner.se" title="Kortapositioner.se"/>
        <Row>
          <Col md={8}>
            <Well className="highlight">
              <h1>Cookie policy</h1>
              <h3>About cookies</h3>
              <p>
                This website uses cookies. By using this website and agreeing to this policy,
                you consent to Kortapositioner.se's use of cookies in accordance with the
                terms of this policy.
              </p>

              <p>
                Cookies are files sent by web servers to web browsers,
                and stored by the web browsers.
              </p>

              <p>
                The information is then sent back to the server each time the browser
                requests a page from the server. This enables a web server to identify
                and track web browsers.
              </p>

              <p>
                There are two main kinds of cookies: session cookies and persistent cookies.
                Session cookies are deleted from your computer when you close your browser,
                whereas persistent cookies remain stored on your computer until deleted,
                or until they reach their expiry date.
              </p>

              <h3>Cookies on our website</h3>
              <p>
                Kortapositioner.se uses the following cookies on this website,
                for the following purposes:
              </p>
              <ul>
                <li>Cookies, to track if you have accepted cookies.</li>
                <li>Analytics, for evaluating and improving the user experience.</li>
                <li>Adds, for displaying apropriate adds.</li>
              </ul>

              <h3>Google cookies</h3>
              <p>
                Kortapositioner.se uses Google Analytics to analyse the use of this website.
                Google Analytics generates statistical and other information about website use
                by means of cookies, which are stored on users' computers. The information
                generated relating to our website is used to create reports about the use of
                the website. Google will store and use this information. Google's privacy
                policy is available
                at: <a target="_blank" href="http://www.google.com/privacypolicy.html">
                  http://www.google.com/privacypolicy.html
                </a>.
              </p>
              <h3>Ads</h3>
              <ul>
                <li>
                  Third party vendors, including Google, use cookies to serve ads based on
                  a user's prior visits to your website or other websites.
                </li>
                <li>
                  Google's use of advertising cookies enables it and its partners to serve ads to
                  your users based on their visit to your sites and/or other sites on the Internet.
                </li>
                <li>
                  Users may opt out of personalized advertising by
                  visiting <a href="https://www.google.com/settings/ads" target="_blank">
                    Ads Settings
                  </a>.
                  (Alternatively, you can direct users to opt out of a third-party vendor's
                  use of cookies for personalized advertising by
                  visiting <a href="http://www.aboutads.info/choices/" target="_blank">
                    www.aboutads.info
                  </a>.)
                </li>
              </ul>

              <h3>Refusing cookies</h3>
              <p>Most browsers allow you to refuse to accept cookies. </p>
              <p>
                In Internet Explorer, you can adjust your cookies settings by clicking
                "Tools", "Internet Options", and "Privacy".
              </p>

              <p>
                In Firefox, you can adjust your cookies settings by clicking "Tools",
                "Options" and "Privacy".
              </p>

              <p>
                In Google Chrome, you can adjust your cookies settings by clicking "Settings",
                "Show advanced settings..." and then "Content settings...".
              </p>

              <p>
                In Safari, you can adjust your cookies settings by clicking "Preferences"
                and "Privacy".
              </p>

              <p>
                Blocking cookies will have a negative impact upon the usability of this website.
              </p>
            </Well>
          </Col>
          <Col md={4}><AppInfo /></Col>
        </Row>
      </MyGrid>
      );
  }
}
