import React from 'react';
import {
  TextInput, StyleSheet, Button, View, Image, Text, ImageBackground, KeyboardAvoidingView,
  TouchableOpacity, StatusBar, Platform, SafeAreaView, AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { CheckBox } from 'react-native-elements'


import PasswordInputText from 'react-native-hide-show-password-input';


export default class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      hidePassword: true,
      check: true
    }
  }


  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  // static navigationOptions = {

  // header: { visible:false } };






  // };



  getUserDetails = () => {



    const value = AsyncStorage.getItem('responseTokenKey');
    alert(value);
    if (value !== null) {
      // We have data!!

      //  alert(value);

      fetch('https://devportal.albertapayments.com/api/me?', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: value,


        }),
      }).then((response) => response.json())
        .then((responseJson) => {
          alert("User Details Coming");
          if (responseJson.error) {
            alert(responseJson.error)

          }
          if (responseJson.user) {
            // alert(responseJson.user);
            //   alert("User Details Coming");

          }

        })
        .catch((error) => {
          console.error(error);
        });

    }
  }




  Nextscreen = () => {

    //  this.addcustomer();
    this.props.navigation.navigate('Dashboard_screen');
    //  console.log("Login Tapped");

    //  alert('Under development')
    // this.props.navigation.navigate('Submit_screen');

    // fetch('https://devportal.albertapayments.com/authenticate?', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: this.state.username,
    //     password: this.state.password


    //   }),
    // }).then((response) => response.json())
    //   .then((responseJson) => {

    //     if (responseJson.error) {
    //       alert(responseJson.error)

    //     }
    //     if (responseJson.token) {

    //       AsyncStorage.setItem('responseTokenKey', responseJson.token);
    //       //   alert(responseJson.token);
    //       this.getUserDetails();
    //     }

    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

  }
  static navigationOptions = {

    Title: 'Home',
    headerTitle: (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image source={require('../images/poslogo.jpg')}
          style={{ height: 42, width: '50%', resizeMode: 'contain' }} />
      </View>
    )
  }


  render() {
    return (
      // <View style={styles.safeAreaView}>
      // {/* // <ImageBackground source ={require('C:/Users/Lenovo 1/Desktop/react_native/login/assets/white1.jpg')}  
      // // <SafeAreaView style={styles.safeAreaView}>
      // // <CardView
      // //           cardElevation={4}
      // //           cardMaxElevation={4}
      // //           cornerRadius={5}
      // //           style={styles.cardd}>
      //           */}

      // <StatusBar barStyle = "light-content"/>


      <KeyboardAvoidingView behavior="position" enabled style={styles.formcontainer}>

        <View style={styles.inputbar}>

          <View style={{
            height: 40, width: "10%",
            alignItems: 'center', justifyContent: 'center', backgroundColor: '#286fb7',
            borderRightWidth: 1, borderRightColor: '#ebebeb',
            borderTopLeftRadius: 3, borderBottomLeftRadius: 3,
          }}>
            <Icon name="user" size={16} color="#fff" />
          </View>
          <TextInput
            style={styles.input}
            placeholder="User Name (Email)"
            placeholderTextColor='white'
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.PasswordInput.focus()}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}

          />

        </View>


        {/* <View style = { styles.textBoxBtnHolder }> */}

        <View style={styles.inputbarr}>
          <View style={{
            height: 40, width: "10%",
            alignItems: 'center', borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3, justifyContent: 'center',
            borderRightWidth: 1, borderRightColor: '#ebebeb',
            backgroundColor: '#286fb7'
          }}>
            <Icon name="lock" size={16} color="#fff" />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Password"
            returnKeyType="go"
            secureTextEntry={this.state.hidePassword}
            ref={(input) => this.PasswordInput = input}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            placeholderTextColor='white'

          />





          <TouchableOpacity activeOpacity={0.8}
            style={styles.visibilityBtn}
            onPress={this.managePasswordVisibility}>
            <Entypo name={(this.state.hidePassword) ? "eye-with-line" : "eye"}
              size={25} color="#fff">
            </Entypo>
            {/* <Image source = { ( this.state.hidePassword ) 
            ? require('../images/hide.png') 
            : require('../images/show.png') } 
            style = { styles.btnImage } /> */}
          </TouchableOpacity>
        </View>

        {/* </View> */}


        <TouchableOpacity style={styles.btncontainer} onPress={this.Nextscreen}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>


        {/* <CheckBox
      value={this.state.checked}
      onValueChange={() => this.setState({ checked: !this.state.checked })}
    />
    <Text style={{marginTop: 5}}> Save Password</Text> */}

        <View style={{ marginStart: "25%", marginEnd: "25%", marginTop: "5%" }}>
          <CheckBox
            checkedIcon={<Icon name="check-square" size={25} color="#f15a2c" />}
            uncheckedIcon={<Icon name="square" size={25} color="#286fb7" />}
            title='Save Password'

            checked={this.state.checked}
            onPress={() => this.setState({ checked: !this.state.checked })}>
          </CheckBox>
        </View>
        {/*     
    <View style={{marginRight : 50,margingStart: 5}}>
    <Text style={{marginTop: 10,fontSize : 18,}}> Save Password</Text>
    </View> */}


      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  formcontainer: {
    marginTop: 150,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  textBoxBtnHolder: {
    flexDirection: 'row',
  },

  checkboxstyle: {


  },

  container: {
    flexGrow: 1,
    backgroundColor: '#FAFBFD'
  },
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#16a0db'
  },
  bcontainer: {
    padding: 10,
    justifyContent: 'center',
    marginBottom: 0,
  },

  logocontainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center'
  },
  inputbar: {
    marginStart: 10,
    marginEnd: 10,
    flexDirection: 'row',

  },
  inputbarr: {
    marginStart: 10,
    flexDirection: 'row',
    marginEnd: 10,
    marginTop: 5
  },
  seprator: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#ebebeb',
    marginBottom: 5,
    marginTop: 5
  },

  visibilityBtn:
  {
    position: 'absolute',
    right: 15,
    height: 40,
    width: 35,
    padding: 5,

  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  input: {
    //width: 250,
    alignSelf: "stretch",
    height: 40,
    width: "90%",
    marginEnd: 10,
    borderRadius: 3,
    backgroundColor: '#636466',
    marginBottom: 10,
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  btnImage:
  {
    resizeMode: 'contain',
    height: '100%',
    width: '100%'
  },

  btncontainer: {
    backgroundColor: '#f15a2c',
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginStart: "28%",
    width: "45%",
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btntext: {
    textAlign: 'center',
    fontSize: 17,
    alignItems: 'center',
    color: '#fff',
  },
});