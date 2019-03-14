import React, { Component } from "react";
import { Platform, StyleSheet, Image, Text, View } from "react-native";
import Login from "./src/components/Login";
import Dashboard from "./src/components/Dashboard";
import Schedule from "./src/components/Schedule";
import Attendence from "./src/components/Attendence";
import WorkHours from "./src/components/WorkHours";
import DatewiseReport from "./src/components/DatewiseReport";
import Clock from "./src/components/Clock";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
const AppStackNavigator = createStackNavigator(
  {
    Home_screen: { screen: Login },
    Dashboard_screen: {
      screen: Dashboard
    },
    Attendence_screen: {
      screen: Attendence
    },
    Schedule_screen: {
      screen: Schedule
    },
    WorkHoursReport_screen: {
      screen: WorkHours
    },
    DatewiseReport_screen: {
      screen: DatewiseReport
    }
  },
  {
    //headerMode: "none",
    navigationOptions: {
      headerVisible: true
    }
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator({
    //Splash: Splash,

    Main: AppStackNavigator
  })
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
