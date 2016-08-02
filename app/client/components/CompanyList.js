
import React from 'react';

import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Table from 'react-bootstrap/lib/Table';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import AppInfo from 'containers/AppInfo';

export default class CompanyList extends React.Component {

    static propTypes = {
        companies: React.PropTypes.object,
        setActive: React.PropTypes.func,
        viewCompany: React.PropTypes.func,
    }

    static defaultProps = {
        companies: {},
        setActive: () => {},
        viewCompany: React.PropTypes.func,
    }

    state = {
        filter: '',
        sortBy: {
            column: 'lastChange',
            direction: 'asc',
        }
    }

    setFilter(filter){
        this.setState({filter});
    }

    setSorting(sortBy){
        this.setState({sortBy});
    }

    buildCompare() {
        var { column, direction } = this.state.sortBy;
        var ret = direction == 'desc' ? 1 : -1;
        return (a, b) => {
            if( a.company[column] < b.company[column] ){
                return -ret;
            }
            if( a.company[column] > b.company[column] ){
                return ret;
            }
            return 0;

        }
    }

    buildCompanyRow(key, company, viewCompany){
        return (<tr key={key}  onClick={()=>(viewCompany(key))} style={{cursor: "pointer"}}>
                <td>{company.name}</td>
                <td>{company.lastChange}</td>
            </tr>);
    }

    render() {
        var { companies, viewCompany } = this.props;
        var filteredCompanies = [];

        var { filter } = this.state;
        for(var key in companies){
            var company = companies[key];
            if(filter.length === 0 || company.name.toLowerCase().indexOf(filter.toLowerCase()) > -1){
                filteredCompanies.push({
                    key: key,
                    company: company
                });
            }
        }
        var compare = this.buildCompare();
        var sortedCompanies = filteredCompanies.sort(compare);

        var rows = [];

        for(var i in sortedCompanies){
            var company = sortedCompanies[i];
            rows.push(this.buildCompanyRow(company.key, company.company, viewCompany));
        }

        return (
            <Row>
                <Col md={9}>
                    <FormControl  placeholder="Filter" onChange={(e)=>{this.setFilter(e.target.value)}} value={filter} />
                    <Table>
                        <thead><tr>
                            {this.buildHeader('Company', 'name')}
                            {this.buildHeader('Last change', 'lastChange')}
                        </tr></thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Col>
                <Col md={3}><AppInfo/></Col>
            </Row>
        );
    }

    buildHeader(label, name){
        var { column, direction } = this.state.sortBy;

        var glyph, newDirection = 'desc';
        if(name == column){
            if(direction == newDirection){
                newDirection = 'asc';
                glyph = <Glyphicon glyph="chevron-up" />;
            } else {
                glyph = <Glyphicon glyph="chevron-down" />;
            }
        }

        return <th style={{cursor: "pointer"}} onClick={ ()=> { this.setSorting({column: name, direction: newDirection }) } }>
                {label}
                <span className="order-indicator">{glyph}</span>
            </th>;
    }
}
