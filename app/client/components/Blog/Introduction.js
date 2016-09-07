import React from 'react';
import Well from 'react-bootstrap/lib/Well';

const twitterLink = 'https://twitter.com/SvenssonAlbin';
const email = 'albin@kortapositioner.se';

export default class Introduction extends React.Component {

  render() {
    return (
      <Well className="highlight">
        <h3>About me</h3>
        <p>
          My name is Albin and I am a webdeveloper with an interest in finance.
          I am currently working as an consultant for a small bank.
        </p>
        <p>
          If you want to discuss anything related or unrelated to what I have
          written please contact me via any of the channels below.
        </p>
        <p>
          <a href={'mailto:' + email}>{email}</a> <br />
          <a href={twitterLink} target="_blank">@SvenssonAlbin</a>
        </p>
      </Well>
    );
  }
}
