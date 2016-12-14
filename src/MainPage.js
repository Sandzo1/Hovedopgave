import React from 'react'
import { Page, Header, Title, Button, Content, Panel, Image, NavBar } from '@cdkglobal/react-jqm'
import logo from '@cdkglobal/react-jqm/img/cdk.png'

const MainPage = () => {
    const onAbout = () => {
        window.location.href = '#about'
    }
     const onDashboard = () => {
        window.location.href = '#dashboard'
    }
     const onSmartPay = () => {
        window.location.href = '#smartpay'
    }

    return (
        <Page>
            <Header>
                <Title>CDK SmartPay App</Title>
                 <NavBar>
                <Button icon="info" onClick={onAbout}>About</Button>
                <Button icon="info" onClick={onDashboard}>Dashboard</Button>
                <Button icon="info" onClick={onSmartPay}>SmartPay</Button>
                </NavBar>
            </Header>

            <Content>
                <Image src={logo} />

                <Panel centre>
                    <h1>Welcome to SmartPay App</h1>
                </Panel>
            </Content>
        </Page>
    )
}

export default MainPage
