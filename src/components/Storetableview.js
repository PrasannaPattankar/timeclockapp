import React, { Component } from "react";

import {
  Text,
  StyleSheet,
  View,
  ListView,
  TextInput,
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Image,
  TouchableOpacity
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loading from "react-native-whc-loading";

export default class MyProject extends Component {
  static navigationOptions = ({ navigate, navigation }) => ({
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
        <Image
          source={require("../images/poslogo.jpg")}
          style={{
            height: 130,
            width: 130,
            marginRight: 20,
            resizeMode: "contain"
          }}
        />
      </View>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Notifications");
        }}
      >
        <FontAwesome name="bell" size={25} color="#16a0db" />
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: ""
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    AsyncStorage.getItem("token").then(data => {
      if (data) {
        return fetch(
          `https://devportal.albertapayments.com/api/me?token=${encodeURIComponent(
            data
          )}`
        )
          .then(response => response.json())
          .then(responseJson => {
            //this.refs.loading.show(false);
            let ds = new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState(
              {
                isLoading: false,
                dataSource: ds.cloneWithRows(responseJson.user.stores)
              },
              function() {
                // In this block you can do something with new state.
                this.arrayholder = responseJson.user.stores;
              }
            );
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  GetListViewItem(name, voids, sales, deletes, SID) {
    //Alert.alert(name + voids + sales + deletes);
    AsyncStorage.setItem("Storename", name);
    AsyncStorage.setItem("void", JSON.stringify(voids));
    AsyncStorage.setItem("Sid", JSON.stringify(SID));
    AsyncStorage.setItem("sales", JSON.stringify(sales));
    AsyncStorage.setItem("delete", JSON.stringify(deletes));

    this.props.navigation.navigate("Dashboard_screen");
  }

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newData),
      text: text
    });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#000"
        }}
      />
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.MainContainer}>
        <TextInput
          style={styles.TextInputStyleClass}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />

        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.ListViewItemSeparator}
          renderRow={rowData => (
            <Text
              style={styles.rowViewContainer}
              onPress={this.GetListViewItem.bind(
                this,
                rowData.name,
                rowData.voids,
                rowData.sales,
                rowData.deletes,
                rowData.SID
              )}
            >
              {rowData.name} [{rowData.SID}]
            </Text>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
        />
        <Loading />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 7,
    backgroundColor: "#fff"
  },

  rowViewContainer: {
    fontSize: 17,
    padding: 10
  },

  TextInputStyleClass: {
    textAlign: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 7,
    backgroundColor: "#f2f2f2"
  }
});
