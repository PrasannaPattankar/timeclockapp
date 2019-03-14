import React from "react";

import {
  AppRegistry,
  StyleSheet,
  View,
  Platform,
  Picker,
  ActivityIndicator,
  Alert,
  Button,
  TextInput,
  Text
} from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import Clock from "./Clock";
export default class Attendence extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PickerValueHolder: "",
      // dataSource: "",
      isLoading: true
    };
    this.handleLogInPress = this.handleLogInPress.bind(this);
    this.handleLogInPress = this.handleLogInPress.bind(this);
    this.handleShortinPress = this.handleShortinPress.bind(this);
    this.handleShortOutPress = this.handleShortOutPress.bind(this);
    this.handleLongBreakOutPress = this.handleLongBreakOutPress.bind(this);
    this.handleLongBreakInPress = this.handleLongBreakInPress.bind(this);
  }
  componentDidMount() {
    return fetch(
      "https://devportal.albertapayments.com/timeclockusers/getusers?sid=1097"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {
            // console.log(responseJson);
            // In this block you can do something with new state.
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleLogInPress = () => {
    alert("Login success");
  };
  handleLogOutPress = () => {
    alert("Logout success");
  };
  handleShortinPress = () => {
    alert("Short In success");
  };
  handleShortOutPress = () => {
    alert("Short Out  Success");
  };
  handleLongBreakOutPress = () => {
    alert("Long Break Out success");
  };
  handleLongBreakInPress = () => {
    alert("Long Break In success");
  };

  render() {
    console.log("test");
    // console.log("come here");
    // let user_id = [
    //   {
    //     value: "Prasanna"
    //   },
    //   {
    //     value: "Adrash"
    //   },
    //   {
    //     value: "Prathibha"
    //   }
    // ];

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          {/* <ActivityIndicator /> */}
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.sid}>
          {/* <Text style={styles.sidtext}>Enter SID</Text> */}
          <TextInput
            placeholder="SID:1097"
            onChangeText={text => this.setState({ text })}
          />
        </View>

        <Text style={styles.attendence}>Welcome to Attendence Page</Text>

        <View style={styles.employee}>
          {/* <Dropdown
            placeholder="Select Employee"
            data={this.state}
            style={{ textAlign: "center" }}
          /> */}
          <Picker
            selectedValue={this.state.PickerValueHolder}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ PickerValueHolder: itemValue })
            }
          >
            {this.state.dataSource.map((item, key) => (
              <Picker.Item
                label={item.user_name}
                value={item.user_name}
                key={key}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.employees}>
          <Clock />
        </View>

        <View style={styles.container}>
          <View style={styles.login}>
            <Button title="Login" onPress={this.handleLogInPress} />
          </View>
          <View style={styles.logout}>
            <Button title="Logout" onPress={this.handleLogOutPress} />
          </View>
        </View>
        <View style={styles.containertwo}>
          <View style={styles.shortin}>
            <Button title="ShortIn" onPress={this.handleShortinPress} />
          </View>
          <View style={styles.shortout}>
            <Button title="ShortOut" onPress={this.handleShortOutPress} />
          </View>
        </View>
        <View style={styles.containerthree}>
          <View style={styles.longbreakout}>
            <Button
              title="LongBreakOut"
              onPress={this.handleLongBreakOutPress}
              //style={{ color: "white" }}
            />
          </View>
          <View style={styles.longbreakin}>
            <Button
              title="LongBreakIn!"
              onPress={this.handleLongBreakInPress}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    //marginTop: 50
  },
  attendence: {
    textAlign: "center",
    fontSize: 20,
    //marginTop: 25,
    color: "darkblue",
    marginTop: 30
  },
  employee: {
    textAlign: "center",
    fontSize: 15,
    // borderRadius: 4,
    //borderWidth: 0.5
    borderColor: "#d6d7da",
    marginLeft: "35%",
    width: "40%",
    color: "darkblue",

    borderWidth: 0.1

    //justifyContent: "center",
    //alignItems: "center"
  },
  employees: {
    color: "darkblue",
    alignItems: "center"
    // backgroundColor: "blue",
  },
  login: {
    width: "45%",
    margin: 10,
    textAlign: "center",
    borderRadius: 2
    //flexDirection: "row"
  },
  logout: {
    width: "45%",
    margin: 10,
    textAlign: "center"
  },
  shortout: {
    width: "45%",
    margin: 10,
    textAlign: "center"
    //flexDirection: "row"
  },
  shortin: {
    width: "45%",
    margin: 10,
    textAlign: "center",
    backgroundColor: "#f15a2c"
  },
  longbreakout: {
    width: "45%",
    margin: 10,
    textAlign: "center"
  },
  longbreakin: {
    width: "45%",
    margin: 10,
    textAlign: "center"
    // backgroundColor: "#f15a2c",
    // paddingVertical: 15,
    // borderRadius: 10,
    // height: 50,
    // marginLeft: 10,
    // marginRight: 40,
    // width: "45%",
    // alignItems: "center",
    // justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    marginTop: 15
  },
  containertwo: {
    flexDirection: "row",
    marginTop: 15
  },
  containerthree: {
    flexDirection: "row",
    marginTop: 15
  },
  containerthree: {
    flexDirection: "row",
    marginTop: 15
  },
  sid: {
    // borderRadius: 1,
    // borderWidth: 0.2,
    // borderColor: "#d6d7da",
    // marginLeft: "35%",
    // width: "35%",
    // //textAlign: "right",
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginTop: 0,
    position: "absolute"
    //backgroundColor: "#f15a2c"
  },
  sidtext: {
    marginLeft: "35%",
    width: "35%",
    textAlign: "center",
    fontSize: 15
    //display: none
  }
});
