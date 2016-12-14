import React from 'react';
import { core as Core } from 'zingchart-react';
import axios from 'axios'

class BarChart_Turnover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromServer: [],
            dateTime: []
        };
        this.GetTurnOver = this.GetTurnOver.bind(this);
    }

    componentDidMount() {
        setInterval(this.GetTurnOver, 1000);
    }
    GetTurnOver() {
        console.log("GETTING TURNOVER FROM SERVER");

        let _this = this;
        let turnOverCollection = [];
        let dateTimeCollection = [];
        let dato = [];
        let unixTime;
        this.serverRequest =
            axios
                .get('https://localhost:44370/api/smartpay/GetSmartPayTurnover')
                .then(function (result) {

                    {/* STATE IS READONLY, NEED TO SAVE VALUE TO ANTOTHER VARIABLE*/ }
                    turnOverCollection = _this.state.dataFromServer.slice();
                    turnOverCollection.push(result.data);

                    unixTime = Date.now();
                    dateTimeCollection = _this.state.dateTime.slice();
                    dateTimeCollection.push(unixTime);

                    _this.setState({
                        dataFromServer: turnOverCollection,
                        dateTime: dateTimeCollection
                    });
                });
    }

    render() {
        let config = {
            "graphset": [
                {
                    "type": "bar3d",
                    "3d-aspect": {
                        depth: 17,
                        true3d: false
                    },
                    // mediaRules: [
                    //     {
                    //         maxWidth: 500,
                    //         "title": {
                    //             "text": "SmartPay Turnover",
                    //             "font-family": "Georgia",
                    //             "fontSize": "20"
                    //         },
                    //         "plot": {
                    //             "animation": {
                    //                 "delay": "1000",
                    //                 "effect": "5",
                    //                 "method": "6",
                    //                 "sequence": "2"
                    //             },
                    //             "value-box": {
                    //                 "placement": "middle",
                    //                 "text": "%v DKK",
                    //                 "font-color": "#FFFFFF",
                    //                 "font-family": "Georgia",
                    //                 "font-size": 15,
                    //                 "font-style": "normal",
                    //                 "angle": -90
                    //             },

                    //         },

                    //     },
                    //     {
                    //         maxWidth: 300,

                    //     }
                    // ],
                    "utc": true,        /* Force UTC time */
                    "timezone": +1,
                    "title": {
                        "text": "SmartPay Turnover",
                        "font-family": "Georgia",
                    },
                    "plot": {
                        "animation": {
                            "delay": "1000",
                            "effect": "5",
                            "method": "6",
                            "sequence": "2"
                        },
                        "value-box": {
                            "placement": "middle",
                            "text": "%v DKK",
                            "font-color": "#FFFFFF",
                            "font-family": "Georgia",
                            "font-size": 25,
                            "font-weight": "bold",
                            "font-style": "normal",
                            "angle": -90
                        },

                    },

                    "plotarea": {
                        "adjust-layout": true
                    },

                    "scaleX": {
                        transform: {
                            "type": "date",
                            "all": "%d/%m-%y <br> %H:%i"
                        },
                        item: {
                            color: "#FFFFFF",
                            "font-size": 15,
                        },
                        "items-overlap": true,
                         labels: this.state.dateTime
                    },

                    "scaleY": {
                        item: {
                            color: "#FFFFFF",
                            "font-size": 15
                        },
                        format: "DKK %v",


                    },
                    "series": [
                        {
                            values: this.state.dataFromServer
                        }
                    ]
                }]
        }
        return (
            <Core id="myBarChart_Turnover"
                width="100%"
                height="100%"
                data={config}
                theme="dark" />
        )
    }
}





export default BarChart_Turnover
