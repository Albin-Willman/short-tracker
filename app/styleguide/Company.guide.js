import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import Company from 'components/Company';

export default class CompanyGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="Company - without properties">
                    <Company />
                </SGSection>

                <SGSection title="Company - with value property">
                    <Company value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
