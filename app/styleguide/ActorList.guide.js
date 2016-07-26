import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import ActorList from 'components/ActorList';

export default class ActorListGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="ActorList - without properties">
                    <ActorList />
                </SGSection>

                <SGSection title="ActorList - with value property">
                    <ActorList value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
