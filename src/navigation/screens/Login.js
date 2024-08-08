import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import { LoginManager,AccessToken } from "react-native-fbsdk-next";


const Login = () => {
    const navigation=useNavigation();
    //FaceBook Login function
  const handleFacebookLogin = async () => {
    try {
      //setIsLoading(true); // Set loading to true when starting login process
      const result = await LoginManager.logInWithPermissions(["public_profile"]);
      if (result.isCancelled) {
        console.log("Login cancelled");
      } else {
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
          throw new Error('Something went wrong obtaining access token');
        }
        const credential = auth.FacebookAuthProvider.credential(data.accessToken);
        await auth().signInWithCredential(credential);
        console.log("Login success");
        navigation.dispatch(StackActions.replace("Home"));
      }
    } catch (error) {
      console.log("Login fail with error: " + error);
    }
  };

    //Google Login function
  const handleGoogleLogin = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      if (userCredential.user) {
        navigation.dispatch(StackActions.replace("Home"));
      }
    } catch (error) {
      console.error('Login failed with error: ', error.message);
    }
  };

  useEffect(()=>{
    GoogleSignin.configure({
        webClientId: '411334143166-r0156jifuood5enqk1s0ptfe37l7857v.apps.googleusercontent.com',
      });
},[])
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={handleFacebookLogin}>
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleGoogleLogin}>
          <Text>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: '#000',
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
});
