
import React from 'react';

import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Link } from 'react-router'
import AppInfo from 'containers/AppInfo';

export default class CompanyList extends React.Component {

    static propTypes = {
        companies: React.PropTypes.object,
        setActive: React.PropTypes.func,
    }

    static defaultProps = {
        companies: {},
        setActive: () => {},
    }

    state = {
        filter: ''
    }

    setFilter(value){
        this.setState({filter: value});
    }

    buildCompanyRow(key, company){
        return (<tr key={key}>
                <td><Link to={`/stock/${key}`}>{company.name}</Link></td>
            </tr>);
    }

    render() {
        var { companies } = this.props;
        var rows = [];

        var { filter } = this.state;
        for(var key in companies){
            var company = companies[key];
            if(filter.length === 0 || company.name.toLowerCase().indexOf(filter.toLowerCase()) > -1){
                rows.push(this.buildCompanyRow(key, companies[key]));
            }
        }

        return (
            <Row>
                <Col md={9}>
                    <FormControl  placeholder="Filter" onChange={(e)=>{this.setFilter(e.target.value)}} value={filter} />
                    <Table>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
                <Col md={3}><AppInfo/></Col>
            </Row>
        );
    }
}
