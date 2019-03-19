// import React from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   Header
// } from "react-native";
// import dateformat from "dateformat";

// export default class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       //time: new Date().toLocaleString()
//       time: new Date().getTime()
//     };
//   }

//   componentDidMount() {
//     this.intervalID = setInterval(() => this.tick(), 1000);
//   }
//   componentWillUnmount() {
//     clearInterval(this.intervalID);
//   }
//   tick() {
//     this.setState({
//       time: new Date().toLocaleString()
//     });
//   }
//   render() {
//     return (
//       <View>
//         <Text style={{ color: "darkblue", fontSize: 20 }}>
//           {this.state.time}
//         </Text>
//       </View>
//     );
//   }
// }

import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import KeepAwake from "react-native-keep-awake";
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  timeText: {
    color: "#999999",
    fontSize: 15
  },
  dateText: {
    color: "#999999",
    fontSize: 15
  }
});

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("LTS"),
      date: moment().format("LL")
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: moment().format("LTS"),
      date: moment().format("LL")
    });
  }

  render() {
    return (
      <View>
        <StatusBar style={{ backgroundColor: "transparent" }} />
        <Text style={{ color: "darkblue", fontSize: 20 }}>
          {this.state.date},{this.state.time}
        </Text>

        <KeepAwake />
      </View>
    );
  }
}
