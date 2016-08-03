import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import CookiePage from 'components/CookiePage';

export default class CookiePageGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="CookiePage - without properties">
                    <CookiePage />
                </SGSection>

                <SGSection title="CookiePage - with value property">
                    <CookiePage value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
