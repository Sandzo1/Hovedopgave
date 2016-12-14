import React from 'react';
import { core as Core } from 'zingchart-react';
import axios from 'axios'
import {Page, Header, Title, Button, Content, Panel, Image, Input, PrimaryButton } from '@cdkglobal/react-jqm'

class TestChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromServer: []
        };
    }
    componentDidMount() 
    {

    }
    render() {
        let config = {
            "graphset": [
                {
                    "type": "bar",
                    "utc": true,        /* Force UTC time */
                    "timezone": +1,
                    "title": {
                        "text": "Test",
                        "font-family": "Georgia",

                    },
                    "plot": {
                        "animation": {
                            "delay": "1000",
                            "effect": "5",
                            "method": "6",
                            "sequence": "2"
                        }
                    },
                    "plotarea": {
                        "adjust-layout": true
                    },

                    "scaleX": {
                       
                        "step": "minute", //unix time in milliseconds (this is a one minute step)
                        transform: { //makes unix timestamps humon readable 
                            "type": "date",
                            "all": "%d/%m-%y <br> %H:%i"
                        },
                        item: {
                            color: "#FFFFFF",
                            "font-size": 15,
                        }
                    },

                    "scaleY": {
                        item: {
                            color: "#FFFFFF",
                            "font-size": 15
                        },
                        format: "%v DKK",

                    },
                    "series": [
                        {
                            values: [[ 1480670871000,10]
                            ]
                        }
                    ]
                }]
        }
        return (
            
            <Core id="myTestChart"
                height="450"
                width="100%"
                data={config}
                theme="dark" />
        )
    }
}

export default TestChart;