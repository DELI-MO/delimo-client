import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
  const [press, setPress] = useState(false);
  const Navigation = useNavigation();

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log('result', token);
        Navigation.replace('BottomTabs');
      } else {
        console.log('없음', token);
        Navigation.replace('LoginForm');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={Styles.Container}>
      <View style={Styles.logo}>
        <Image
          source={require('../../assets/Logo.png')}
          resizeMode="contain"
          style={{
            marginTop: 80,
            width: 400,
            height: 190,
          }}
        />
        <View style={Styles.LoginText}>
          <Text style={{color: '#897D85', fontSize: 13, fontWeight: '500'}}>
            Share Your Mood
          </Text>
          <Text
            style={{
              color: '#897D85',
              fontSize: 13,
              fontWeight: '500',
              lineHeight: 14,
            }}>
            On Your Diary
          </Text>
        </View>
      </View>
      <View style={Styles.LoginBtnContainer}>
        <Pressable
          onPress={() => {
            // Navigation.navigate('LoginForm');
            getUserToken();
          }}
          onPressIn={() => {
            setPress(true);
          }}
          onPressOut={() => {
            setPress(false);
          }}
          style={
            press === true ? Styles.LoginBtnPressIn : Styles.LoginBtnPressOut
          }>
          <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>
            시작하기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const Styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  LoginText: {
    alignItems: 'center',
  },
  logo: {
    // backgroundColor: 'red',
    flex: 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginBtnContainer: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  LoginBtnPressOut: {
    backgroundColor: '#FF889E',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 10,
  },
  LoginBtnPressIn: {
    backgroundColor: '#FF617E',
    paddingHorizontal: 60,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
