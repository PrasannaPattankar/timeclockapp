import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
  AsyncStorage
} from "react-native";
import Login from "./src/components/Login";
import Dashboard from "./src/components/Dashboard";
import Schedule from "./src/components/Schedule";
import Attendence from "./src/components/Attendence";
import WorkHours from "./src/components/WorkHours";
import DatewiseReport from "./src/components/DatewiseReport";
import ScheduleAdd from "./src/components/ScheduleAdd";
import IndividualReport from "./src/components/IndividualReport";
import IndividualReportTable from "./src/components/IndividualReportTable";
import Clock from "./src/components/Clock";
import Storetableview from "./src/components/Storetableview";
import Popupmenu from "./src/components/Popupmenu";

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

    Attendence_screen: {
      screen: Attendence
    },
    Schedule_screen: {
      screen: Schedule
    },
    Storetableview: { screen: Storetableview },
    Popupmenu: { screen: Popupmenu },
    WorkHoursReport_screen: {
      screen: WorkHours
    },
    DatewiseReport_screen: {
      screen: DatewiseReport
    },
    Schedule_form: {
      screen: ScheduleAdd
    },
    Individual_report: {
      screen: IndividualReport
    },
    IndividualTable_screen: {
      screen: IndividualReportTable
    },
    Dashboard_screen: {
      screen: Dashboard,
      navigationOptions: ({ navigate, navigation }) => ({
        headerVisible: true,
        headerLeft: null,
        headerTitle: (
          <View style={{ flex: 1, alignItems: "center", marginLeft: 30 }}>
            <Image
              source={require("./src/images/poslogo.jpg")}
              style={{
                height: "60%",
                width: "50%",
                resizeMode: "contain",
                flex: 1
              }}
            />
          </View>
        ),
        headerRight: (
          <Popupmenu
            menutext="Menu"
            menustyle={{
              marginRight: 16,
              flexDirection: "row",
              justifyContent: "flex-end"
            }}
            //Menu Text Style
            textStyle={{
              color: "white"
            }}
            //Click functions for the menu items
            role={() => {}}
            barcode={() => {
              navigation.navigate("BarcodeSettings");
            }}
            Store={() => {
              navigation.navigate("Storetableview");
            }}
            logout={() => {
              //AsyncStorage.clear()
              AsyncStorage.removeItem("savedPassword");

              navigation.navigate("Loginscreen");
            }}
          />
        )
      })
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
