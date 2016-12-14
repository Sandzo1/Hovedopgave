import React, { Component } from 'react'
import MainPage from './MainPage'
import AboutPage from './AboutPage'
import DashBoard from './DashBoard'
import SmartPay from './SmartPay'
export default class App extends Component {
    state = { hash: '' }

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
        switch (this.state.hash) {
        default:
        case '':
            return <MainPage />
        case 'about':
            return <AboutPage />
        case 'dashboard':
            return <DashBoard />
        case 'smartpay':
            return <SmartPay />
        }
    }
}
