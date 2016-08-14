/* eslint max-nested-callbacks:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

import Article from 'components/Blog/Article';

describe('Article Component', () => {
    it('should render without exceptions', () => {
        ReactTestUtils.renderIntoDocument(<Article />);
    });
});
