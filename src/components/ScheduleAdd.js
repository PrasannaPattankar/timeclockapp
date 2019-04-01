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
  Text
} from "react-native";
import DatePicker from "react-native-datepicker";

import TimePicker from "react-native-modal-datetime-picker";

export default class ScheduleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PickerValueHolder: "null",
      isLoading: true,
      sid: "",
      StartTime: "",
      EndTime: "",
      Fromdate: "",
      PickerShiftType: "null"
    };
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

  static navigationOptions = {
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "blue", textAlign: "center", fontSize: 20 }}>
          Alberta Time Clock
        </Text>
      </View>
    )
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            color: "blue",
            marginTop: 10,
            marginBottom: 20
          }}
        >
          Add Schedule
        </Text>

        <View style={styles.logocontainer}>
          <Text style={styles.setTextSize}>Employee Name</Text>

          <Picker
            style={styles.input}
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

        <View style={styles.logocontainer}>
          <Text style={styles.setTextSize}>Shift Type</Text>

          <Picker
            style={styles.input}
            selectedValue={this.state.PickerShiftType}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ PickerShiftType: itemValue })
            }
          >
            <Picker.Item label="Select Type" value="0" key="-1" />
            <Picker.Item label="Full day" value="Full day" />
            <Picker.Item label="Part Time" value="Part Time" />
          </Picker>
        </View>

        <View style={styles.logocontainer}>
          <Text style={styles.setTextSize}>Shift Date</Text>

          <DatePicker
            style={{ width: 250 }}
            date={this.state.Fromdate}
            mode="date"
            placeholder="select date"
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: 0,
                top: 4,
                marginRight: 0
              },
              dateInput: {
                marginLeft: 36
              },
              dateText: {
                fontSize: 25,
                Color: "#A9A9A9",
                justifyContent: "flex-start"
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ Fromdate: date });
            }}
          />
        </View>

        <View style={styles.logocontainer}>
          <Text style={styles.setTextSize}>Start Time</Text>
          <DatePicker
            style={{ width: 250 }}
            fontSize="35"
            date={this.state.StartTime}
            mode="time"
            androidMode="spinner"
            placeholder="select time"
            format="hh:mm:ss"
            is24Hour={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("../images/clock.png")}
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: 0,
                top: 4,
                marginRight: 0
              },
              dateInput: {
                marginLeft: 36
              },
              dateText: {
                fontSize: 25,
                color: "#000000",
                justifyContent: "flex-start"
              }
            }}
            onDateChange={STime => {
              this.setState({ StartTime: STime });
            }}
          />
        </View>
        <View style={styles.logocontainer}>
          <Text style={styles.setTextSize}>End Time</Text>
          <DatePicker
            style={{ width: 250 }}
            date={this.state.EndTime}
            mode="time"
            androidMode="spinner"
            placeholder="select time"
            format="hh:mm:ss"
            is24Hour={true}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            iconSource={require("../images/clock.png")}
            customStyles={{
              dateIcon: {
                position: "absolute",
                right: 0,
                top: 4,
                marginRight: 0
              },
              dateInput: {
                marginLeft: 36
              },
              dateText: {
                fontSize: 25,
                color: "#000000",
                justifyContent: "flex-start"
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={ETime => {
              this.setState({ EndTime: ETime });
            }}
          />
        </View>
        <View style={styles.logocontainer}>
          <TouchableOpacity
            style={styles.btncontainer}
            onPress={this.saveNPLItemDetails}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btncontainer}
            onPress={this.cancelBtnPress}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: "center"
    //flexDirection: "row"
  },
  schedule: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 25,
    color: "black"
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
  attendence: {
    textAlign: "center",
    fontSize: 20,
    //marginTop: 25,
    color: "darkblue",
    marginTop: 30
  },
  schedule: {
    marginTop: 25,
    width: "40%",
    flexDirection: "row",
    //justifyContent: "center",
    alignSelf: "center"
  },
  logocontainer: {
    marginTop: 0,
    marginBottom: 3,
    marginLeft: 10,
    flexDirection: "row"
  },
  MainContainer: {
    flex: 1,

    // Set content's vertical alignment.
    justifyContent: "center",

    // // Set content's horizontal alignment.
    alignItems: "center",

    // Set hex color code here.
    backgroundColor: "#fff"
  },
  setTextSize: {
    marginTop: 10,
    width: 90,
    height: 50,
    marginLeft: 0,
    fontWeight: "bold",
    flexDirection: "row",
    color: "#286fb7"
  },
  input: {
    //width: 250,
    alignSelf: "stretch",
    marginRight: 10,
    marginLeft: 20,
    height: 40,
    width: 230,
    borderRadius: 10,
    borderColor: "#636466",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 15,
    paddingHorizontal: 20
  },
  btncontainer: {
    flex: 1,
    backgroundColor: "#f15a2c",
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 40,
    width: "45%",
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    marginLeft: 10,
    fontSize: 20,
    color: "#fff"
  }
});
