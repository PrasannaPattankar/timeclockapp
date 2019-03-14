import React, { Component } from "react";

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from "react-native";

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Id: ""
    };
    this.handleEmployee = this.handleEmployee.bind(this);
    this.handleOnsubmit = this.handleOnsubmit.bind(this);
  }

  handleEmployee = e => {
    this.setState({ Id: e.target.value });
  };
  handleOnsubmit = e => {
    this.setState({});
  };

  render() {
    return (
      <View>
        <View>
          <Text>Enter ID</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={this.handleEmployee}
          />
        </View>
        <View>
          <Button
            type="button"
            className="Logout"
            title="Logout"
            onSubmit={this.handleOnsubmit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    //backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    //color: "white",
    //fontSize: 24,
    //fontWeight: "bold",
    overflow: "hidden",
    padding: 12
    // textAlign: "center"
  }
});
