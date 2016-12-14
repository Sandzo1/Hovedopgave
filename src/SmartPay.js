import React from 'react'
import { Page, Header, Title, Button, Content, Panel, Image, Input, PrimaryButton, InputGroup } from '@cdkglobal/react-jqm'
import logo from '@cdkglobal/react-jqm/img/cdk.png'
import 'react-datagrid/index.css'
import DataGrid from 'react-datagrid'
import axios from 'axios'

const onBack = () => {
    window.location.hash = ''
}

class SmartPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromServer: this.getDataFromServer(),
            DealerID: '',
            DealerName: '',
            Created: '',
            Password: '',
            MobilePayWord: ''
        };
        this.handleDealerIDChange = this.handleDealerIDChange.bind(this);
        this.handleDealerName = this.handleDealerName.bind(this);
        this.handleCreated = this.handleCreated.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleMobilePayWord = this.handleMobilePayWord.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
    }
    handleDealerIDChange() {
        let value = this.refs.dealerID.input.value;
        this.setState({ DealerID: value });
    }
    handleDealerName(event) {
        let value = this.refs.dealerName.input.value;
        this.setState({ DealerName: value });
    }
    handleCreated() {
        let gmtDate = new Date();
        let timeOffset = gmtDate.getTimezoneOffset() / 60;
        let localDate = new Date(gmtDate.getTime() - timeOffset * 3600 * 1000);
        return localDate.toISOString().replace("T", " ").replace("Z", "");

    }

    handlePassword(event) {
        let value = this.refs.password.input.value;
        this.setState({ Password: value });
    }
    handleMobilePayWord(event) {
        let value = this.refs.mobilePayWord.input.value;
        this.setState({ MobilePayWord: value });
    }
    handleSubmit(event) {
        // event.preventDefault();
        let dateTime = this.handleCreated();
        this.setState({ Created: dateTime });
        this.postDataToServer();
        this.getDataFromServer();
    }

    postDataToServer() {
        console.log("posting data to server from SmartPay APP");

        let Dealer = {};
        Dealer.dealerID = this.state.DealerID;
        Dealer.dealerName = this.state.DealerName;
        Dealer.created = this.state.Created;
        Dealer.password = this.state.Password;
        Dealer.mobilePayWord = this.state.MobilePayWord;

        if (Dealer.created === null) {
            alert("Try again")
            return
        }
        this.serverRequest =
            axios({
                method: "POST",
                url: 'https://localhost:44370/api/smartpay/PostNewDealer',
                data: Dealer
            }).then(function (response) {
                console.log(response)
                console.log("Dealer created " + response.config.data)
                alert("Dealer Created " + response.config.data)
            })
                .catch(function (error) {
                    console.log(error);
                });

    }
    getDataFromServer() {
        console.log("GETTING SMARTPAY USERS FROM SERVER");

        let _this = this;
        this.serverRequest =
            axios
                .get('https://localhost:44370/api/smartpay/GetSmartPayUsers')
                .then(function (result) {
                    console.log(result)
                    _this.setState({ dataFromServer: result.data })

                        .catch(function (error) {
                            console.log(error);
                            alert("An error occured")
                        });
                });
    }
    render() {
        const columns = [
            { name: 'DealerID', width: '15%' },
            { name: 'DealerName', width: '15%' },
            { name: 'Created', width: '15%' },
            { name: 'Password', width: '35%' },
            { name: 'MobilePayWord', width: '20%' }
        ];

        return (
            <Page>
                <Header>
                    <Button icon="carat-l" onClick={onBack}>Back</Button>
                    <Title>CDK SmartPay App</Title>
                </Header>

                <Content>
                    <Image src={logo} />

                    <Panel centre >
                        <form onSubmit={this.handleSubmit} method="post">
                            <Input type="text" ref="dealerID" placeholder="DealerID.............." onChange={this.handleDealerIDChange} /><br />
                            <Input type="text" ref="dealerName" placeholder="DealerName........" value={this.state.DealerName} onChange={this.handleDealerName} /><br />
                            <Input type="text" ref="password" placeholder="Password............" value={this.state.Password} onChange={this.handlePassword} /><br />
                            <Input type="text" ref="mobilePayWord" placeholder="MobilePayWord..." value={this.state.MobilePayWord} onChange={this.handleMobilePayWord} />

                            <PrimaryButton onClick={this.handleSubmit}> Create New Dealer</PrimaryButton>
                        </form>
                    </Panel>
                    <br /><br />

                    <Panel centre>
                        <DataGrid
                            idProperty="id"
                            dataSource={this.state.dataFromServer}
                            columns={columns} />
                    </Panel>
                </Content>
            </Page>
        )
    }
}

export default SmartPay;

