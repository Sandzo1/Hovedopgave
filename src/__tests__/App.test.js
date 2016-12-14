import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

it('handles an empty hash', () => {
    window.location.hash = ''
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
})

it('handles the about hash', () => {
    window.location.hash = 'about'
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
})
