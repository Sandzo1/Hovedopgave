import React from 'react';
import {
  core as Core
} from 'zingchart-react';
import axios from 'axios'

class BarChart_Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFromServer: [],
      dateTime: []
    };
    this.GetTransactions = this.GetTransactions.bind(this);
    this.GetTransactions();
  }

  componentDidMount() {
    setInterval(this.GetTransactions, 10000); //8640 1 time - 69120 8 timer
  }
  GetTransactions() {
    console.log("GETTING TRANSACTIONS FROM SERVER")

    let _this = this;
    let transactionsCollection = [];
    let dateTimeCollection = [];


    this.serverRequest =
      axios
      .get('https://localhost:44370/api/smartpay/GetSmartPayTransactions')
      .then(function (result) {
        console.log(result);
       { /* Setting state to empty */ }
        _this.setState({
          dataFromServer: [],
          dateTime: []
        });

        { /* STATE IS READONLY, NEED TO SAVE VALUE TO ANTOTHER VARIABLE*/ }
        transactionsCollection = _this.state.dataFromServer.slice();
        dateTimeCollection = _this.state.dateTime.slice();

        result.data.forEach(function (element) {
          dateTimeCollection.push((element["WeekNumber"]));
          transactionsCollection.push(element["InvoiceID"]);
        }, this);

        { /* Deleting the oldest week*/ }
        if (transactionsCollection.length > 30 || dateTimeCollection.length > 30) {
          transactionsCollection.shift();
          dateTimeCollection.shift();
        }

        _this.setState({
          dataFromServer: transactionsCollection,
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
          true3d: false,
        },

        "title": {
          "text": "SmartPay - Transactions peer week",
          "font-family": "Georgia",
          "offset-y": -12,
        },
        "plot": {
          "animation": {
            "delay": "1000",
            "effect": "5",
            "method": "6",
            "sequence": "3"
          },
          "tooltip": {
            "text": "Transactions %vt <br> Week %kt  ",
            "placement": "node:top",
            "border-radius": "5px",
            "font-size": 20

          },
          "value-box": {
            "font-color": "#FFFFFF",
            "font-family": "Georgia",
            "font-size": 20,
            "font-style": "normal"
          },
          mediaRules: [{
            maxWidth: 400,
            label: {
              fontSize: 5
            },
            "value-box": {
              "font-size": 5
            },
            item: {
              fontSize: 5
            }
          }, ]

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
            "font-size": 15,
          },
          "label": {
            "text": "Number of Transactions",
            "font-size": 20,
          },
          mediaRules: [{
            maxWidth: 400,
            "label": {
              "text": "Number of Transactions",
              "font-size": 10,
            },
            item: {
              color: "#FFFFFF",
              "font-size": 8,
            }
          }]
        },
        "series": [{
          values: this.state.dataFromServer
        }]
      }]
    }
    return ( <
      Core id = "myBarChart_Transactions"
      width = "100%"
      height = "100%"
      data = {
        config
      }
      theme = "dark" / >
    )
  }
}

export default BarChart_Transactions