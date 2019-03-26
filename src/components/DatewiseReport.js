import React from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Button
} from "react-native";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

const state = {
  tableHead: ["Employee Name", "Date", "Total Working Hours", "Break Hours"],
  tableData: [
    ["Prasanna", "20-Mar-2019", "9", "2"],
    ["Suresh", "20-Mar-2019", "10", "2"],
    ["Priya", "20-Mar-2019", "9", "1"]
  ]
};
export default class DateWiseReport extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ color: "blue", textAlign: "center", fontSize: 20 }}>
          Alberta Time Clock
        </Text>
      </View>
    )
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.workreport}>Work Hours Report</Text>
        <ScrollView style={styles.table}>
          <Table borderStyle={{ borderWidth: 3, borderColor: "darkblue" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.headText}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // marginTop: 30,
    //marginBottom: 20,
    backgroundColor: "#fff"
  },
  workreport: {
    color: "darkblue",
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20
  },
  headText: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontWeight: "bold"
  },
  head: {
    height: 60,
    backgroundColor: "darkblue",
    borderColor: "white",
    flex: 1,
    padding: 15
  },
  text: { margin: 6, fontSize: 12, textAlign: "center", color: "darkblue" },
  table: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: "#ffff"
  },
  workHours: {
    //backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    //color: "white",
    //fontSize: 24,
    //fontWeight: "bold",
    overflow: "hidden",
    padding: 10,
    margin: 20,
    width: "80%"
    //textAlign: "center"
  },
  workIHours: {
    //backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    //color: "white",
    //fontSize: 24,
    //fontWeight: "bold",
    overflow: "hidden",
    padding: 10,
    margin: 20,
    width: "80%"
    //textAlign: "center"
  }
});
