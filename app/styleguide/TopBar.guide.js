import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import TopBar from 'components/TopBar';

export default class TopBarGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="TopBar - without properties">
                    <TopBar />
                </SGSection>

                <SGSection title="TopBar - with value property">
                    <TopBar value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
