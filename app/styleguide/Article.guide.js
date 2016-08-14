import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import Article from 'components/Blog/Article';

export default class ArticleGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="Article - without properties">
                    <Article />
                </SGSection>

                <SGSection title="Article - with value property">
                    <Article value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
