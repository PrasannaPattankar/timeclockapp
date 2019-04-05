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
  ScrollView,
  Image
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

export default class DateWiseReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: null,
      tableData: null
    };
  }
  handleIndividualReport = () => {
    fetch("https://devportal.albertapayments.com/timeclock/allreports", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sid: this.state.sid
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

  render() {
    if (this.state.isSubmitting) {
      return (
        <ScrollView>
          <View style={{ margin: "2%" }}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={this.state.tableHead}
                style={styles.tablehead}
                textStyle={styles.textHead}
                flexArr={[3, 3, 2, 2, 2, 2]}
              />
              <Rows
                data={this.state.tableData}
                textStyle={styles.textData}
                flexArr={[3, 3, 2, 2, 2, 2]}
              />
            </Table>
          </View>
        </ScrollView>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.logocontainer}>
          {/* <Text style={styles.sidtext}>Enter SID</Text> */}
          <Text style={styles.setTextSize}>SID</Text>
          <TextInput
            style={styles.input}
            placeholder="SID:1097"
            onChangeText={TextInputValue =>
              this.setState({ sid: TextInputValue })
            }
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
  tablehead: {
    backgroundColor: "blue"
  },
  textHead: {
    textAlign: "center",
    color: "white",
    fontSize: 14
  },
  textData: {
    textAlign: "center",
    fontSize: 13,
    color: "blue"
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
  logocontainer: {
    marginTop: 0,
    marginBottom: 3,
    marginRight: 10,
    flexDirection: "row"
  },
  workreport: {
    color: "darkblue",
    textAlign: "center",
    fontSize: 20,
    marginTop: 30,
    marginBottom: 20
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
  // headText: {
  //   color: "white",
  //   fontSize: 13,
  //   textAlign: "center",
  //   fontWeight: "bold"
  // },
  // head: {
  //   height: 60,
  //   backgroundColor: "darkblue",
  //   borderColor: "white",
  //   flex: 1,
  //   padding: 15
  // },
  // text: { margin: 6, fontSize: 12, textAlign: "center", color: "darkblue" },

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
  containerfour: {
    flexDirection: "row",
    //flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    color: "#9d9d9d"
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
