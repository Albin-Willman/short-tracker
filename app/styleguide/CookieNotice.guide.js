import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import CookieNotice from 'components/CookieNotice';

export default class CookieNoticeGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="CookieNotice - without properties">
                    <CookieNotice />
                </SGSection>

                <SGSection title="CookieNotice - with value property">
                    <CookieNotice value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
