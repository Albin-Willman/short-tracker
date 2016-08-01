import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import AppInfo from 'components/AppInfo';

export default class AppInfoGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="AppInfo - without properties">
                    <AppInfo />
                </SGSection>

                <SGSection title="AppInfo - with value property">
                    <AppInfo value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
