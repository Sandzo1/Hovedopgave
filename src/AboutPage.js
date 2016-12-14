import React from 'react'
import { Page, Header, Title, Button, Content, Panel, Image } from '@cdkglobal/react-jqm'
import logo from '@cdkglobal/react-jqm/img/cdk.png'

const AboutPage = () => {
    const onBack = () => {
        window.location.hash = ''
    }

    return (
        <Page>
            <Header>
                <Button icon="carat-l" onClick={onBack}>Back</Button>
                <Title>CDK Mobile App</Title>
            </Header>

            <Content>
                <Image src={logo} />

                <Panel centre>
                    <h1>CDK SmartPay Tool App</h1>
                    <h3>Version 1.0</h3>
                    <p>CDK Global Vejle</p>
                </Panel>
            </Content>
        </Page>
    )
}

export default AboutPage
