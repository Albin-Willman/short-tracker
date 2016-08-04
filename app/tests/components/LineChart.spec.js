/* eslint max-nested-callbacks:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import LineChart from 'components/LineChart';

describe('LineChart Component', () => {
    it('should render without exceptions', () => {
        ReactTestUtils.renderIntoDocument(<LineChart />);
    });
});
