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
  Text
} from "react-native";
import { Header } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { Table, Row, Rows } from "react-native-table-component";
export default class IndividualReportTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: null,
      tableData: null
    };
  }
  componentDidMount() {
    console.log("teeesssssssssssstt");
    console.log(AsyncStorage.getItem("table_data"));
    // API_URL = "https://devportal.albertapayments.com/timeclock/report";
    // return fetch(API_URL)
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //     this.setState({
    //       isLoading: false,
    //       tableHead: responseJson.table_title,
    //       tableData: responseJson.table_data
    //       // chartData: responseJson.chart_data
    //     });
    //   });
    this.setState({
      isLoading: false,
      tableHead: AsyncStorage.getItem("table_title"),
      tableData: AsyncStorage.getItem("table_data")
      // chartData: responseJson.chart_data
    });
  }
  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Welcome to Individual Report
        </Text>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row
            data={this.state.tableHead}
            style={styles.head}
            textStyle={styles.text}
          />
          <Rows data={this.state.tableData} textStyle={styles.text} />
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#FFFF00" },
  text: { margin: 6 }
});
