import React, { Component } from "react";
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
  ScrollView
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Header } from "react-native-elements";
import DatePicker from "react-native-datepicker";
export default class IndividualReport extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "blue", textAlign: "center", fontSize: 20 }}>
          Welcome to Individual report
        </Text>
      </View>
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      PickerValueHolder: "null",
      isLoading: true,
      isSubmitting: false,
      sid: "",

      Fromdate: "",
      Todate: "",
      tableHead: null,
      tableData: null
    };
  }
  handleIndividualReport = () => {
    fetch("https://devportal.albertapayments.com/timeclock/report", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid,
        user_id: this.state.PickerValueHolder,
        to_date: this.state.Todate,
        from_date: this.state.Fromdate
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            isSubmitting: true,
            tableHead: responseJson.table_title,
            tableData: responseJson.table_data
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.isSubmitting) {
      return (
        <ScrollView>
          <View style={{ margin: "2%" }}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={this.state.tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={this.state.tableData} textStyle={styles.text} />
            </Table>
          </View>
        </ScrollView>
      );
    }
    return (
      <View style={styles.container}>
        {/* <Text style={{ textAlign: "center", fontSize: 20 }}>
          Welcome to Individual report
        </Text> */}
        <ScrollView>
          <View style={styles.sid}>
            {/* <Text style={styles.sidtext}>Enter SID</Text> */}
            <TextInput
              placeholder="SID:1097"
              onChangeText={TextInputValue =>
                this.setState({ sid: TextInputValue })
              }
            />
          </View>
          <View style={styles.logocontainer}>
            <Text style={styles.setTextSize}>Employee Name</Text>
            <Picker
              style={{ width: 200, alignContent: "center" }}
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
            <Text style={styles.setTextSize}>From</Text>
            <DatePicker
              style={{ width: 250 }}
              date={this.state.Fromdate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              //minDate="01-01-2019"
              // maxDate="2016-06-01"
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
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ Fromdate: date });
              }}
            />
          </View>
          <View style={styles.logocontainer}>
            <Text style={styles.setTextSize}>To </Text>
            <DatePicker
              style={{ width: 250 }}
              date={this.state.Todate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              //minDate="01-01-2019"
              // maxDate="2016-06-01"
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
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ Todate: date });
              }}
            />
          </View>
          <View style={styles.containerfour}>
            <Button
              title="Submit"
              onPress={this.handleIndividualReport}
              color={"#286fb7"}
              style={{
                //alignItems: "center",
                width: "30%",
                textAlign: "center",
                margin: 10
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     marginTop: "20%"
//   },
//   heading: {
//     textAlign: "center"
//     //flexDirection: "row"
//   },
//   schedule: {
//     textAlign: "center",
//     fontSize: 20,
//     marginTop: 25,
//     color: "black"
//   },
//   employee: {
//     textAlign: "center",
//     fontSize: 15,
//     // borderRadius: 4,
//     //borderWidth: 0.5
//     borderColor: "#d6d7da",
//     marginLeft: "35%",
//     width: "40%",
//     color: "darkblue",

//     borderWidth: 0.1
//   },
//   attendence: {
//     textAlign: "center",
//     fontSize: 20,
//     //marginTop: 25,
//     color: "darkblue",
//     marginTop: 30
//   },
//   schedule: {
//     marginTop: 25,
//     width: "40%",
//     flexDirection: "row",
//     //justifyContent: "center",
//     alignSelf: "center"
//   },
//   logocontainer: {
//     marginTop: 0,
//     marginBottom: 3,
//     //marginLeft: 5,
//     flexDirection: "row"
//   },
//   MainContainer: {
//     flex: 1,

//     // Set content's vertical alignment.
//     justifyContent: "center",

//     // // Set content's horizontal alignment.
//     alignItems: "center",

//     // Set hex color code here.
//     backgroundColor: "#fff"
//   },
//   setTextSize: {
//     marginTop: 10,
//     width: 90,
//     height: 50,
//     marginLeft: 0,
//     fontWeight: "bold",
//     flexDirection: "row",
//     color: "#286fb7"
//   },
//   input: {
//     //width: 250,
//     alignSelf: "stretch",
//     marginRight: 10,
//     marginLeft: 20,
//     height: 40,
//     width: 230,
//     borderRadius: 10,
//     borderColor: "#636466",
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     marginBottom: 10,
//     fontSize: 15,
//     paddingHorizontal: 20
//   },
//   btncontainer: {
//     backgroundColor: "#f15a2c",
//     paddingVertical: 10,
//     borderRadius: 10,
//     height: 50,
//     marginStart: "28%",
//     width: "45%",
//     marginTop: 10,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   btnText: {
//     marginLeft: 10,
//     fontSize: 20,
//     color: "#fff"
//   }
// });
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
  containerfour: {
    flexDirection: "row",
    //flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    color: "#9d9d9d"
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
  },
  sid: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "flex-end",
    marginTop: 0,
    position: "absolute"
  },
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 }
});
