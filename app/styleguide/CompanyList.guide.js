import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import CompanyList from 'components/CompanyList';

export default class CompanyListGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="CompanyList - without properties">
                    <CompanyList />
                </SGSection>

                <SGSection title="CompanyList - with value property">
                    <CompanyList value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
