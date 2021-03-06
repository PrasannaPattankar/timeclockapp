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
  ScrollView,
  Image
} from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { Header } from "react-native-elements";
import DatePicker from "react-native-datepicker";
export default class IndividualReport extends React.Component {
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
      isSubmitting: false,
      sid: "",

      Fromdate: "",
      Todate: "",
      tableHead: null,
      tableData: null
    };
  }
  handleIndividualReport = () => {
    AsyncStorage.getItem("Sid").then(sid => {
      if (sid) {
        fetch("https://devportal.albertapayments.com/timeclock/report", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            sid: sid,
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
      }
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
            <Table borderStyle={{ borderWidth: 2, borderColor: "#d6d7da" }}>
              <Row
                data={this.state.tableHead}
                flexArr={[3, 3, 2, 2, 2, 2]}
                style={styles.tablehead}
                textStyle={styles.textHead}
              />
              <Rows
                data={this.state.tableData}
                flexArr={[3, 3, 2, 2, 2, 2]}
                textStyle={styles.textData}
              />
            </Table>
          </View>
        </ScrollView>
      );
    }
    return (
      <View
        style={{
          alignContent: "center",
          alignItems: "center",
          marginTop: "10%",
          marginLeft: "5%"
        }}
      >
        <View style={styles.logocontainer}>
          <Text style={styles.setTextSize}>Employee Name</Text>
          <Picker
            style={{ width: 200, marginLeft: 20 }}
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
            style={{ width: 200, marginRight: 20 }}
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
            style={{ width: 200, marginRight: 20 }}
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
              width: "40%",
              textAlign: "center",
              marginTop: 10
            }}
          />
          {/* <TouchableOpacity
            style={styles.btncontainer}
            onPress={this.handleIndividualReport}
          >
            <Text style={styles.btntext}>Submit</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: "4%",
    marginTop: "10%",
    alignContent: "center",
    justifyContent: "center"
  },
  tablehead: {
    // backgroundColor: "#0000FF"
    backgroundColor: "#3386D6"
  },
  textHead: {
    textAlign: "center",
    color: "white",
    fontSize: 14
  },
  textData: {
    textAlign: "center",
    fontSize: 13,
    color: "#3386D6"
  },
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
    alignItems: "center",
    justifyContent: "center",
    //marginTop: 10,
    color: "#9d9d9d"
  },
  logocontainer: {
    marginTop: 0,
    marginBottom: 3,
    marginRight: 30,
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
  }
});
