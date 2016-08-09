import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import WelcomePage from 'components/Pages/WelcomePage';

export default class WelcomePageGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="WelcomePage - without properties">
                    <WelcomePage />
                </SGSection>

                <SGSection title="WelcomePage - with value property">
                    <WelcomePage value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
