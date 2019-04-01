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

//import { DropDown } from "react-native-dropdown";

const state = {
  tableHead: [
    "Employee Name",
    "Shift Date",
    "Shift Type",
    "Start Time",
    "End Time"
  ],
  tableData: [
    ["Suresh", "20-Mar-2019", "Morning Shift", "10AM", "6.00PM"],
    ["Rahul", "20-Mar-2019", "Afternoon Shift", "12PM", "8.00PM"]
  ]
};

export default class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddSchedule = this.handleAddSchedule.bind(this);
  }

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
  handleAddSchedule = () => {
    this.props.navigation.navigate("Schedule_form");
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.schedules}>Welcome to Schedule Page</Text>
        </View>

        <View style={styles.schedule}>
          <Button
            title="Add Schedule"
            onPress={this.handleAddSchedule}
            color="darkblue"
          />
        </View>
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
  heading: {
    textAlign: "center"
    //flexDirection: "row"
  },
  schedules: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 25,
    color: "blue"
  },
  schedule: {
    marginTop: 25,
    width: "40%",
    flexDirection: "row",
    marginLeft: "63%"
    //justifyContent: "center",
    // alignSelf: "center"
  },
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
    height: 50,
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
