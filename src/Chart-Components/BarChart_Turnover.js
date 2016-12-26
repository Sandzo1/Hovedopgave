import React from 'react';
import {
    core as Core
} from 'zingchart-react';
import axios from 'axios'

class BarChart_Turnover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromServer: [],
            dateTime: []
        };
        this.GetTurnOver = this.GetTurnOver.bind(this);
        this.GetTurnOver();
    }

    componentDidMount() {
        setInterval(this.GetTurnOver, 10000); //24 timer -- //8640 1 time - 69120 8 time
    }
    GetTurnOver() {
        console.log("GETTING TURNOVER FROM SERVER");

        let _this = this;
        let turnOverCollection = [];
        let dateTimeCollection = [];

        this.serverRequest =
            axios
            .get('https://localhost:44370/api/smartpay/GetSmartPayTurnover')
            .then(function (result) {
                console.log(result)
                { /* Setting state to empty */ }
                _this.setState({
                    dataFromServer: [],
                    dateTime: []
                });

                { /* STATE IS READONLY, NEED TO SAVE VALUE TO ANTOTHER VARIABLE*/ }
                turnOverCollection = _this.state.dataFromServer.slice();
                dateTimeCollection = _this.state.dateTime.slice();

                result.data.forEach(function (element) {
                    dateTimeCollection.push((element["WeekNumber"]));
                    turnOverCollection.push(element["Amount"]);
                }, this);

                { /* Deleting the oldest week*/ }
                if (turnOverCollection.length > 30 || dateTimeCollection.length > 30) {
                    turnOverCollection.shift();
                    dateTimeCollection.shift();
                }

                _this.setState({
                    dataFromServer: turnOverCollection,
                    dateTime: dateTimeCollection
                });
            });
    }

    render() {
        let config = {
            "graphset": [{
                "type": "bar3d",
                "3d-aspect": {
                    depth: 7,
                    true3d: false
                },
                "title": {
                    "text": "SmartPay - Turnover per week in DKK",
                    "font-family": "Georgia",
                    mediaRules: [{
                        maxWidth: 600,
                        "font-size": 14
                    }]

                },
                "plot": {
                    "animation": {
                        "delay": "1000",
                        "effect": "5",
                        "method": "6",
                        "sequence": "3"
                    },
                    "tooltip": {
                        "text": " Amount %vt,- DKK <br> Week %kt ",
                        "placement": "node:middle",
                        "border-radius": "5px",
                        "font-size": 20
                    },
                    "value-box": {
                        "text": "%v DKK",
                        "font-color": "#FFFFFF",
                        "font-family": "Georgia",
                        "font-size": 20,
                        "font-style": "normal",
                    },
                    mediaRules: [{
                        maxWidth: 400,
                        label: {
                            fontSize: 5
                        },
                        "value-box": {
                            "font-size": 5,
                            "font-weight": "normal",
                        },
                        item: {
                            fontSize: 5
                        }
                    }, {
                        maxWidth: 800,
                        "value-box": {
                            "font-size": 10,
                            "font-weight": "normal",
                        }
                    }]

                },

                "plotarea": {
                    "adjust-layout": true
                },

                "scaleX": {
                    item: {
                        color: "#FFFFFF",
                        "font-size": 12,
                    },
                    "label": {
                        "text": "Week",
                        "font-size": 20,
                    },
                    maxItems: 30,
                    labels: this.state.dateTime,

                    mediaRules: [{
                        maxWidth: 400,
                        maxItems: 40,
                        label: {
                            fontSize: 6
                        },
                        item: {
                            fontSize: 6
                        }
                    }, {
                        maxWidth: 800,
                        item: {
                            color: "#FFFFFF",
                            "font-size": 10,
                        },
                    }]
                },

                "scaleY": {
                    item: {
                        color: "#FFFFFF",
                        "font-size": 15
                    },
                    format: "%vk",
                    "label": {
                        "text": "DKK",
                        "font-size": 20,
                    },

                },
                "series": [{
                    values: this.state.dataFromServer
                }]
            }]
        }
        return ( <
            Core id = "myBarChart_Turnover"
            width = "100%"
            height = "100%"
            data = {
                config
            }
            theme = "dark" / >
        )
    }
}





export default BarChart_Turnover