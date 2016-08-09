TobT/* eslint max-nested-callbacks:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import Footer from 'components/Layout/Footer';

describe('Footer Component', () => {
    it('should render without exceptions', () => {
        ReactTestUtils.renderIntoDocument(<Footer />);
    });
});
