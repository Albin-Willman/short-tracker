
import React from 'react';

import FormControl from 'react-bootstrap/lib/FormControl';
import Table from 'react-bootstrap/lib/Table';

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

    buildCompanyRow(key, company, setActive){
        return (<tr key={key} onClick={() =>{setActive(company)} }>
                <td>{company.name}</td>
            </tr>);
    }

    render() {
        var { companies, setActive } = this.props;
        var rows = [];

        var { filter } = this.state;
        for(var key in companies){
            var company = companies[key];
            if(filter.length === 0 || company.name.toLowerCase().indexOf(filter.toLowerCase()) > -1){
                rows.push(this.buildCompanyRow(key, companies[key], setActive));
            }
        }

        return (
            <div>
                <FormControl  placeholder="Filter" onChange={(e)=>{this.setFilter(e.target.value)}} value={filter} />
                <Table>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}
