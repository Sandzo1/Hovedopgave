import React, { Component } from 'react'
import { Page, Header, Title, Button, Content, Panel, Image, PanelContainer, Aside, Grid, Cell } from '@cdkglobal/react-jqm'
import logo from '@cdkglobal/react-jqm/img/cdk.png'
import BarChart_Transactions from './Chart-Components/BarChart_Transactions'
import BarChart_Turnover from './Chart-Components/BarChart_Turnover'

import './styles/style.css'


const onBack = () => {
    window.location.hash = ''
}

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    state = {
        hash: ''
    }

    componentDidMount() {
        // Start listening for hash changes
        window.addEventListener('hashchange', this.onHashChange, false)
        // Render the initial page
        this.onHashChange()
    }

    onHashChange = () => {
        // The hash has changed so update the state
        // This will call render and display the new page
        this.setState({ hash: window.location.hash.substr(1) })
    }


    render() {


        return (
            <Page>
                <Header>
                    <Button icon="carat-l" onClick={onBack}>Back</Button>
                    <Title>CDK SmartPay App</Title>
                </Header>
                <div id="myBar1">
                    <BarChart_Turnover/>
                    <BarChart_Transactions/>
                </div>
            </Page>
        );
    }
}
export default Dashboard