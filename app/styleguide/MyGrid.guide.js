import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import MyGrid from 'components/Layout/MyGrid';

export default class MyGridGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="MyGrid - without properties">
                    <MyGrid />
                </SGSection>

                <SGSection title="MyGrid - with value property">
                    <MyGrid value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
