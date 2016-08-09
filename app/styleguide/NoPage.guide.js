import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import NoPage from 'components/Pages/NoPage';

export default class NoPageGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="NoPage - without properties">
                    <NoPage />
                </SGSection>

                <SGSection title="NoPage - with value property">
                    <NoPage value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
