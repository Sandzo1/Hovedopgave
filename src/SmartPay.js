import React from 'react'
import { Page, Header, Title, Button,Popup, Content, Panel, Image, Input, PrimaryButton, InputGroup } from '@cdkglobal/react-jqm'
import logo from '@cdkglobal/react-jqm/img/cdk.png'
import 'react-datagrid/index.css'
import DataGrid from 'react-datagrid'
import axios from 'axios'

const onBack = () => {
    window.location.hash = ''
}
const onClose = () => {
}

class SmartPay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup:  false,
            dataFromServer: [],
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
        this.postDataToServer = this.postDataToServer.bind(this);
    }
    handleDealerIDChange() {
        let value = this.refs.dealerID.input.value;
        this.setState({ DealerID: value });
    }
    handleDealerName() {
        let value = this.refs.dealerName.input.value;
        this.setState({ DealerName: value });
    }
    handleCreated() {
        let gmtDate = new Date();
        let timeOffset = gmtDate.getTimezoneOffset() / 60;
        let localDate = new Date(gmtDate.getTime() - timeOffset * 3600 * 1000);
        return localDate.toISOString().replace("T", " ").replace("Z", "");
    }

    handlePassword() {
        let value = this.refs.password.input.value;
        this.setState({ Password: value });
    }
    handleMobilePayWord() {
        let value = this.refs.mobilePayWord.input.value;
        this.setState({ MobilePayWord: value });
    }
    handleSubmit() {
        // event.preventDefault();
        let dateTime = this.handleCreated();
        this.setState({ Created: dateTime, popup:true });
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
            })
                .catch(function (error) {
                    console.log(error);
                });
                this.setState({
                popup: false
            })
        }

    render() {
          const onClose = () => {
            this.setState({
                popup: false
            })
        }

        let popup
        if (this.state.popup) {
            popup = (
                <Popup>
                    <h1>DealerID:{this.state.DealerID}</h1><hr/>
                    <h1>DealerName:{this.state.DealerName}</h1><hr/>
                    <h1>Created:{this.state.Created}</h1><hr/>
                    <h1>Password:{this.state.Password}</h1><hr/>
                    <h1>MobilePayWord:{this.state.MobilePayWord}</h1>
                
                    <Button onClick={this.postDataToServer}>OK</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </Popup>
            )
        }
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
                        <form >
                            <Input type="text" ref="dealerID" placeholder="Enter DealerID Here" onChange={this.handleDealerIDChange} />
                            <Input type="text" ref="dealerName" placeholder="Enter DealerName Here" onChange={this.handleDealerName} />
                            <Input type="text" ref="password" placeholder="Enter Password Here" onChange={this.handlePassword}  />
                            <Input type="text" ref="mobilePayWord" placeholder="Enter MobilePayWord Here" onChange={this.handleMobilePayWord} />

                            <PrimaryButton onClick={this.handleSubmit}> Create New Dealer </PrimaryButton>
                                {popup}
                        </form>
                    </Panel>
                    <br />
                  
                    <Panel centre>
                        <DataGrid
                            idProperty="id"
                            dataSource="https://localhost:44370/api/smartpay/GetSmartPayUsers"
                            columns={columns}
                   />
                    </Panel>
                </Content>
            </Page>
        )
    }
}

export default SmartPay;

