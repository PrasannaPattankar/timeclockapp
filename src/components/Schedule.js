import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Schedule extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.schedule}>Welcome to Schedule Page</Text>
        <Text style={styles.schedule}>Coming soon..</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  schedule: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 25,
    color: "black"
  }
});
