import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import CaseExplain from 'components/CaseExplain';

export default class CaseExplainGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="CaseExplain - without properties">
                    <CaseExplain />
                </SGSection>

                <SGSection title="CaseExplain - with value property">
                    <CaseExplain value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
