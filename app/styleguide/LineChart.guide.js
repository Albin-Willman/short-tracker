import React from 'react';
import { SGPage, SGSection } from 'reapp-dev-tools';


import LineChart from 'components/LineChart';

export default class LineChartGuideComponent extends React.Component {
    render() {
        return (
            <SGPage>

                <SGSection title="LineChart - without properties">
                    <LineChart />
                </SGSection>

                <SGSection title="LineChart - with value property">
                    <LineChart value="Content for the component" />
                </SGSection>

            </SGPage>
        );
    }
}
