import React from "react";

import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  Platform,
  Picker,
  ActivityIndicator,
  Alert,
  Button,
  TouchableOpacity,
  TextInput,
  Text,
  Image
} from "react-native";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import { Dropdown } from "react-native-material-dropdown";
import Clock from "./Clock";
import AwesomeButton from "react-native-really-awesome-button";

export default class Attendence extends React.Component {
  static navigationOptions = {
    Title: "Home",
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../images/poslogo.jpg")}
          style={{ height: 42, width: "50%", resizeMode: "contain" }}
        />
      </View>
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      PickerValueHolder: "null",
      isLoading: true,
      sid: ""
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
            // In this block you can do something with new state.
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleLogInPress = () => {
    fetch("https://devportal.albertapayments.com/timeclock/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid,
        user_id: this.state.PickerValueHolder,
        action_tag: "login"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "ok") {
          Alert.alert(JSON.stringify(responseJson.message));
        } else {
          alert(JSON.stringify(responseJson.error));
          //alert("You have already Logged In for today");
        }

        //  if(this.state.message.status=='error')
      })
      .catch(error => {
        console.error(error);
      });
  };
  handleLogOutPress = () => {
    fetch("https://devportal.albertapayments.com/timeclock/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid,
        user_id: this.state.PickerValueHolder,
        action_tag: "logout"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "ok") {
          Alert.alert(JSON.stringify(responseJson.message));
        } else {
          alert(JSON.stringify(responseJson.error));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  handleShortinPress = () => {
    fetch("https://devportal.albertapayments.com/timeclock/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid,
        user_id: this.state.PickerValueHolder,
        action_tag: "short_break_in"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "ok") {
          Alert.alert(JSON.stringify(responseJson.message));
        } else {
          alert(JSON.stringify(responseJson.error));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  handleShortOutPress = () => {
    fetch("https://devportal.albertapayments.com/timeclock/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid,
        user_id: this.state.PickerValueHolder,
        action_tag: "short_break_out"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "ok") {
          Alert.alert(JSON.stringify(responseJson.message));
        } else {
          alert(JSON.stringify(responseJson.error));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  handleLongBreakOutPress = () => {
    fetch("https://devportal.albertapayments.com/timeclock/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid,
        user_id: this.state.PickerValueHolder,
        action_tag: "long_break_out"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "ok") {
          Alert.alert(JSON.stringify(responseJson.message));
        } else {
          alert(JSON.stringify(responseJson.error));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  handleLongBreakInPress = () => {
    fetch("https://devportal.albertapayments.com/timeclock/attendance", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid,
        user_id: this.state.PickerValueHolder,
        action_tag: "long_break_in"
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status == "ok") {
          alert("Succesfully Long break in");
        } else {
          alert(JSON.stringify(responseJson.error));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  // static navigationOptions = {
  //   Title: "Home",
  //   headerTitle: (
  //     <View style={{ flex: 1, alignItems: "center" }}>
  //       <Image
  //         source={require("../images/poslogo.jpg")}
  //         style={{ height: 42, width: "50%", resizeMode: "contain" }}
  //       />
  //     </View>
  //   )
  // };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.sid}>
          {/* <Text style={styles.sidtext}>Enter SID</Text> */}
          <TextInput
            placeholder="SID:1097"
            onChangeText={TextInputValue =>
              this.setState({ sid: TextInputValue })
            }
          />
        </View>

        <Text style={styles.attendence}>Attendance</Text>

        <View style={styles.employee}>
          <Picker
            selectedValue={this.state.PickerValueHolder}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ PickerValueHolder: itemValue })
            }
          >
            <Picker.Item label="Select User" value="0" key="-1" />
            {this.state.dataSource.data.map((item, key) => (
              <Picker.Item
                label={item.user_name}
                value={item.user_id}
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
            {/* <AwesomeButton progress onPress={this.handleLogInPress}>
              Login
            </AwesomeButton> */}

            <Button
              title="Login"
              onPress={this.handleLogInPress}
              color={"#286fb7"}
            />
          </View>
        </View>

        <View style={styles.containertwo}>
          <View style={styles.shortout}>
            <Button
              title="Short Break Out"
              onPress={this.handleShortOutPress}
              color={"#286fb7"}
            />
          </View>
          <View style={styles.shortin}>
            <Button
              title="Short Break In"
              onPress={this.handleShortinPress}
              color={"#286fb7"}
            />
          </View>
        </View>
        <View style={styles.containerthree}>
          <View style={styles.longbreakout}>
            <Button
              title="Long Break Out"
              onPress={this.handleLongBreakOutPress}
              color={"#286fb7"}
            />
          </View>
          <View style={styles.longbreakin}>
            <Button
              title="Long Break In"
              onPress={this.handleLongBreakInPress}
              color={"#286fb7"}
            />
          </View>
        </View>
        <View style={styles.containerfour}>
          <View style={styles.logout}>
            <Button
              title="Logout"
              onPress={this.handleLogOutPress}
              color={"#286fb7"}
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
  },
  employees: {
    color: "darkblue",
    alignItems: "center"
  },
  login: {
    width: "50%",
    margin: 10,
    textAlign: "center",
    borderRadius: 2
  },
  logout: {
    width: "50%",
    margin: 10,
    textAlign: "center",
    backgroundColor: "#9d9d9d"
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
  },
  container: {
    flexDirection: "row",
    //flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  containertwo: {
    flexDirection: "row",
    marginTop: 10
  },
  containerthree: {
    flexDirection: "row",
    marginTop: 10
  },
  containerfour: {
    flexDirection: "row",
    //flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    color: "#9d9d9d"
  },
  sid: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginTop: 0,
    position: "absolute"
  },
  sidtext: {
    marginLeft: "35%",
    width: "35%",
    textAlign: "center",
    fontSize: 15
  }
});
