import React from 'react';
import {
  TextInput, StyleSheet, Button, View, Image, Text, ImageBackground, KeyboardAvoidingView,
  TouchableOpacity, StatusBar, Platform, SafeAreaView, AsyncStorage, Alert, Keyboard
} from 'react-native';


import Entypo from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements'
import Snackbar from 'react-native-snackbar';
import Loading from 'react-native-whc-loading'


const ACCESS_TOKEN = 'access_token';


import PasswordInputText from 'react-native-hide-show-password-input';
import { ScrollView } from 'react-native-gesture-handler';


export default class Login extends React.Component {

  constructor() {
    super();

    this.state = {
      hidePassword: true,
      check: true,
      email: "",
      password: "",
      error: "",
      isLoading: false,
      checked: false,

    }
  }

  componentDidMount() {
    // alert('hello')
    AsyncStorage.getItem('savedPassword').then(
      save => {

        if (save) {

          this.refs.loading.show();
          // alert(`https://devportal.albertapayments.com/api/me?token=${encodeURIComponent(data)}`);
          fetch(`https://devportal.albertapayments.com/api/me?token=${encodeURIComponent(save)}`, {
            method: 'GET',
            // headers: {
            //   Accept: 'application/json',
            //   'Content-Type': 'application/json',
            // },
          }).then((response) => response.json())
            .then((responseJson) => {
              this.refs.loading.show(false);

              if (responseJson.error) {
                this.props.navigation.navigate('Home_screen')

              }
              if (responseJson.user.email) {
                AsyncStorage.setItem('fname', responseJson.user.fname);
                AsyncStorage.setItem('lname', responseJson.user.lname);
                AsyncStorage.setItem('emailid', responseJson.user.email);
                AsyncStorage.setItem('role_name', (responseJson.user.roles[0].name));
                this.props.navigation.navigate('Dashboard_screen');
                // alert('success')

              }

              //Keyboard.dismiss();


            })
            .catch((error) => {
              console.error(error);
            });


        }

      }

    )
  }


  loginWithToken = () => {
    // alert(this.state.checked)
    if (this.state.checked) {
      //AsyncStorage.setItem('savedPassword', 1);
      AsyncStorage.getItem('token').then((data) => {
        if (data) {
          AsyncStorage.setItem('savedPassword', data);

          AsyncStorage.getItem('savedPassword').then((save) => {
            if (save) {
              // alert(save)
            }
          })
        }
      })
     

    }

    this.refs.loading.show();
    AsyncStorage.getItem('token').then((data) => {
      if (data) {

        // alert(`https://devportal.albertapayments.com/api/me?token=${encodeURIComponent(data)}`);
        fetch(`https://devportal.albertapayments.com/api/me?token=${encodeURIComponent(data)}`, {
          method: 'GET',
          // headers: {
          //   Accept: 'application/json',
          //   'Content-Type': 'application/json',
          // },
        }).then((response) => response.json())
          .then((responseJson) => {
            this.refs.loading.show(false);

            if (responseJson.error) {
              alert('session expired')
              this.props.navigation.navigate('Home_screen')

            }
            if (responseJson.user.email) {
              AsyncStorage.setItem('fname', responseJson.user.fname);
              AsyncStorage.setItem('lname', responseJson.user.lname);
              AsyncStorage.setItem('emailid', responseJson.user.email);
              AsyncStorage.setItem('Storename', responseJson.user.stores[0].name);
              AsyncStorage.setItem('Sid', JSON.stringify(responseJson.user.stores[0].SID));
              AsyncStorage.setItem('void', JSON.stringify(responseJson.user.stores[0].voids));
              AsyncStorage.setItem('sales', responseJson.user.stores[0].sales);
              AsyncStorage.setItem('delete', JSON.stringify(responseJson.user.stores[0].deletes));
              AsyncStorage.setItem('role_name', (responseJson.user.roles[0].name));
              //alert(responseJson.user.stores[0].voids)

              this.Gonext()
            }
            Keyboard.dismiss();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

    
  }


  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }


  Nextscreen = () => {
    Keyboard.dismiss();
    const { email } = this.state;
    const { password } = this.state;
    if (email == "") {
      Snackbar.show({
        title: 'Please enter valid email',
        duration: Snackbar.LENGTH_SHORT,
        color: 'red',
        fontSize: 20,
        backgroundColor: '#f2f2f2'

      });
    } else if (password == "") {

      Snackbar.show({
        title: 'Please enter valid password',
        duration: Snackbar.LENGTH_SHORT,
        color: 'red',
        fontSize: 20,
        backgroundColor: '#f2f2f2'

      });
    }
    else {
      this.onLoginPressed()
      //this.props.navigation.navigate('Stacknav');
    }

  }

  Gonext = () => {
    this.props.navigation.navigate('Dashboard_screen');
  }

  // alert(this.state.password)




  onLoginPressed = () => {

    this.refs.loading.show();

    fetch('https://devportal.albertapayments.com/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,

      }),
    }).then((response) => response.json())
      .then((responseJson) => {

        this.refs.loading.show(false);


        if (responseJson.error) {

          Snackbar.show({
            title: 'Invalid credentials ',
            duration: Snackbar.LENGTH_SHORT,
            color: 'red',
            backgroundColor: '#f2f2f2',
            fontSize: 20,

          });
          return;
        }
        if (responseJson.token) {
          AsyncStorage.setItem('token', responseJson.token);
          this.loginWithToken();
          //alert(responseJson);   
        }
      })
      .catch((error) => {
        console.error(error);
      });


  }

  checkbox = () => {
    this.setState({ checked: !this.state.checked })
    // AsyncStorage.getItem('token').then((data) => {
    //  if (!data) {
    //       //this.props.navigation.navigate('Loginscreen')
    //       alert('np')
    //   }
    //   else
    //   alert('workong')
    // })
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




  render() {


    return (

      <View style={styles.safeAreaView}>
        <KeyboardAvoidingView behavior="position" enabled style={styles.formcontainer}>

          <View style={styles.inputbar}>

            <View style={{
              height: 40, width: "10%",
              alignItems: 'center', justifyContent: 'center', backgroundColor: '#286fb7',
              borderRightWidth: 1, borderRightColor: '#ebebeb',
              borderTopLeftRadius: 3, borderBottomLeftRadius: 3,
            }}>
              <FontAwesome name="user" size={16} color="#fff" />
            </View>

            <TextInput
              style={styles.input}
              placeholder="User Name (Email)"
              placeholderTextColor='white'
              returnKeyType="next"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
              onSubmitEditing={() => this.PasswordInput.focus()} />

          </View>




          <View style={styles.inputbarr}>
            <View style={{
              height: 40, width: "10%",
              alignItems: 'center', borderTopLeftRadius: 3,
              borderBottomLeftRadius: 3, justifyContent: 'center',
              borderRightWidth: 1, borderRightColor: '#ebebeb',
              backgroundColor: '#286fb7'
            }}>
              <FontAwesome name="lock" size={16} color="#fff" />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Password"
              returnKeyType="go"
              secureTextEntry={this.state.hidePassword}
              ref={(input) => this.PasswordInput = input}
              onChangeText={password => this.setState({ password })}
              placeholderTextColor='white' />





            <TouchableOpacity activeOpacity={0.8}
              style={styles.visibilityBtn}
              onPress={this.managePasswordVisibility}>
              <FontAwesome name={(this.state.hidePassword) ? "eye-slash" : "eye"}
                size={25} color="#fff">
              </FontAwesome>

            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btncontainer} onPress={this.Nextscreen}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>




          <View style={{ marginStart: "25%", marginEnd: "25%", marginTop: "5%" }}>
            <CheckBox
              checkedIcon={<Entypo name="checksquare" size={25} color="#f15a2c" />}
              uncheckedIcon={<FontAwesome name="square-o" size={25} color="#286fb7" />}
              title='Save Password'

              checked={this.state.checked}
              onPress={() => this.checkbox()}>
            </CheckBox>
            <Loading ref="loading" />
          </View>



        </KeyboardAvoidingView>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formcontainer: {


    marginTop: 150,
    backgroundColor: '#fff',
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
  titleStylesuc: {
    fontSize: 15

  },
  messageStyle: {
    fontSize: 15
  },

  messageStyled: {
    fontSize: 13

  },
  titleStylenotrgt: {

    fontSize: 15
  },

  cancelButtonStyle: {
    width: 80,
    height: 40,
    alignItems: 'center'
  },

  confirmButtonTextStyle: {

    width: 80,
    height: 40,
    alignItems: 'center'
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

    borderRadius: 10,
    height: 40,
    marginStart: "28%",
    width: "45%",

    alignItems: 'center',
    justifyContent: 'center'
  },

  btntext: {

    textAlign: 'center',
    fontSize: 20,

    alignItems: 'center',
    color: '#fff',
  },
});