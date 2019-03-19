import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import { Header } from "react-native-elements";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesignn from "react-native-vector-icons/FontAwesome";

export default class Dashboard extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "blue", textAlign: "center", fontSize: 15 }}>
          Welcome to TimeClock Application
        </Text>
      </View>
    )
  };
  constructor(props) {
    super(props);
    this.handleWorkHoursPress = this.handleWorkHoursPress.bind(this);
  }

  handleSchedulePress = () => {
    this.props.navigation.navigate("Schedule_screen");
  };
  handleAttendencePress = () => {
    this.props.navigation.navigate("Attendence_screen");
  };
  handleWorkHoursPress = () => {
    this.props.navigation.navigate("WorkHoursReport_screen");
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}> */}

        {/* <Text style={styles.timeclock}>Welcome to TimeClock Application</Text> */}
        {/* </View> */}
        <SafeAreaView style={styles.safeAreaView}>
          <View flexDirection="row">
            <LinearGradient
              colors={["#16a0db", "#16a0db", "#16a0db", "#16a0db", "#16a0db"]}
              style={styles.card1}
            >
              <TouchableOpacity onPress={this.handleSchedulePress}>
                <View style={{ marginTop: 50, marginStart: "10%" }}>
                  <FontAwesome name="calendar" size={40} color="#fff" />
                </View>
                <Text style={styles.text}>Schedule</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={["#286fb7", "#286fb7", "#286fb7", "#286fb7", "#286fb7"]}
              style={styles.card1}
            >
              <TouchableOpacity onPress={this.handleAttendencePress}>
                <View style={{ marginTop: 50, marginStart: "16%" }}>
                  <MaterialIcons name="timer" size={40} color="#fff" />
                </View>
                <Text style={styles.text}>Attenedence</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View
            flexDirection="row"
            marginBottom={80}
            marginStart={"25%"}
            marginRight={"25%"}
          >
            <LinearGradient
              colors={["#f15a2c", "#f15a2c", "#f15a2c", "#f15a2c", "#f15a2c"]}
              style={styles.card1}
            >
              <TouchableOpacity onPress={this.handleWorkHoursPress}>
                <View style={{ marginTop: 50, marginStart: "8%" }}>
                  <MaterialIcons name="report" size={40} color="#fff" />
                </View>
                <Text style={styles.text}>Reports</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
        {/* <View>
          <Text style={styles.timeclock}>
            Welcome to TimeClock Application{" "}
          </Text>
        </View>
        <View style={styles.Schedule}>
          <Button title="Schedule" onPress={this.handleSchedulePress} />
        </View>
        <View style={styles.Attenedence}>
          <Button title="Attenedence" onPress={this.handleAttendencePress} />
        </View>

        <View style={styles.workHours}>
          <Button title="Reports" onPress={this.handleWorkHoursPress} />
        </View> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: "15%",
    backgroundColor: "#fff"
  },
  timeclock: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 25,
    color: "#636466"
  },

  animation: {
    alignSelf: "stretch",
    width: 300,
    height: 0
  },

  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    borderRadius: 3,
    height: " 20%",
    width: "92%",
    marginTop: 10
  },
  card4: {
    backgroundColor: "#e3b432",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    borderTopColor: "blue",
    height: 130,
    width: 300,
    margin: 10
  },
  card1: {
    // backgroundColor: '#16a0db',
    alignItems: "center",
    borderRadius: 3,
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  card2: {
    backgroundColor: "#f15a2c",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  card3: {
    backgroundColor: "#286fb7",
    alignItems: "center",
    borderTopColor: "blue",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    height: 130,
    width: 300,
    margin: 10
  },
  cardd: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 40,
    marginBottom: 10,
    width: "100%"
  },
  container1: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  box: {
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 75,
    borderWidth: 2,
    width: 150,
    height: 150,
    marginStart: "35%",
    marginTop: 0,
    borderColor: "#fff",
    justifyContent: "center"
  },
  box1: {
    width: 50,
    height: 50,
    alignItems: "flex-end",
    borderRadius: 25,
    justifyContent: "flex-end"
  },

  // text: {
  //   color: "#fff",
  //   fontSize : 20
  // },
  storename: {
    marginStart: 18,
    color: "#000",
    marginBottom: 10,
    fontSize: 20,
    marginTop: 0
  },
  text2: {
    fontWeight: "700",
    marginStart: 100,
    color: "green",
    marginBottom: 10,
    fontSize: 25
  },
  te: {
    marginStart: 5,
    color: "#000",
    marginTop: 5,
    fontSize: 20
  },

  carddd: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    height: 200,
    width: "95%",
    margin: 10
  },
  anim: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  img: {
    marginTop: 30,
    marginStart: 10
  },
  imgg: {
    width: 180,
    height: 120,
    marginStart: "0%",
    alignItems: "center",
    resizeMode: "contain"
  },
  img1: {
    marginStart: 20,
    marginTop: 30
  },
  text1: {
    color: "#fff",
    fontSize: 15
  },
  textss: {
    color: "#000",
    marginBottom: 20,
    fontSize: 14,
    marginStart: 5
  },
  texts: {
    color: "#FFF"
  },

  text: {
    textAlign: "center",
    height: 75,
    fontSize: 15,
    marginStart: 5,
    marginTop: 10,
    color: "#fff"
  },

  text3: {
    textAlign: "center",
    height: 75,
    marginStart: 20,
    marginTop: 50,
    fontSize: 20
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
