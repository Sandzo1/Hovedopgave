import React from 'react';
import { core as Core } from 'zingchart-react';
import axios from 'axios'

class BarChart_Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromServer: [],
      dateTime: []
    };
    this.GetTransactions = this.GetTransactions.bind(this);
  }

  componentDidMount() {
    setInterval(this.GetTransactions, 10000);
  }
  GetTransactions() {
    console.log("GETTING TRANSACTIONS FROM SERVER")

    let _this = this;
    let transactionsCollection = [];
    let dateTimeCollection = [];
    let unixTime;

    this.serverRequest =
      axios
        .get('https://localhost:44370/api/smartpay/GetSmartPayTransactions')
        .then(function (result) {
          {/* STATE IS READONLY, NEED TO SAVE VALUE TO ANTOTHER VARIABLE*/ }
          transactionsCollection = _this.state.dataFromServer.slice();
          transactionsCollection.push(result.data);

          unixTime = Date.now();
          dateTimeCollection = _this.state.dateTime.slice();
          dateTimeCollection.push(unixTime);

          _this.setState({
            dataFromServer: transactionsCollection,
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
          "utc": true,        /* Force UTC time */
          "timezone": +1,
          "title": {
            "text": "SmartPay Transactions",
            "font-family": "Georgia",
            "offset-y": -12

          },
          "plot": {
            "animation": {
              "delay": "1000",
              "effect": "4",
              "method": "1",
              "sequence": "1"
            },
            "value-box": {
              "placement": "middle",
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
            labels: this.state.dateTime
          },
          "scaleY": {
            item: {
              color: "#FFFFFF",
              "font-size": 15,
            },
            "label": {
              "text": "Number of Transactions",
              "font-size": 20,

            }
          },
          "series": [
            { values: this.state.dataFromServer }
          ]
        }]
    }
    return (
      <Core id="myBarChart_Transactions"
        width="100%"
        height="100%"
        data={config}
        theme="dark" />
    )
  }
}




export default BarChart_Transactions