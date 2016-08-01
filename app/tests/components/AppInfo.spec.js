/* eslint max-nested-callbacks:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import AppInfo from 'components/AppInfo';

describe('AppInfo Component', () => {
    it('should render without exceptions', () => {
        ReactTestUtils.renderIntoDocument(<AppInfo />);
    });
});
