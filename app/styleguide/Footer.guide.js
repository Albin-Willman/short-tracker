import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import Footer from 'components/Layout/Footer';

export default class FooterGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="Footer - without properties">
                    <Footer />
                </SGSection>

                <SGSection title="Footer - with value property">
                    <Footer value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
