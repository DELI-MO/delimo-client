import react, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import BASE_URL from '../../api/BaseURL';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  NavigationHelpersContext,
  useNavigation,
} from '@react-navigation/native';
const ResolutionScreen = () => {
  const Navigation = useNavigation();

  const [press, setPress] = useState(false);
  const [resolution, setResolution] = useState('');
  // console.log('>>>', resolution);
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };

  const updateResolution = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);
    const data = {
      resolution,
    };
    try {
      const response = await axios.patch(
        BASE_URL + `/users/updateResolution`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      if (response.data.code === 200) {
        Navigation.push('LoginForm');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={Styles.SignInContainer}>
        <View style={Styles.backArrow}>
          <Pressable
            onPress={() => {
              Navigation.goBack();
            }}>
            <Image
              source={require('../../assets/bx-arrow-back.png')}
              resizeMode="center"
            />
          </Pressable>
        </View>
        <View style={Styles.Logo}>
          <Image
            source={require('../../assets/LoginLogo.png')}
            resizeMode="contain"
            style={{
              width: 120,
              height: 190,
            }}
          />
          <Text
            style={{
              marginTop: 30,
              fontSize: 20,
              fontWeight: '800',
              color: '#828282',
            }}>
            나의 한 줄 다짐
          </Text>
        </View>
        <View style={Styles.FormContainer}>
          <View style={Styles.FormBox}>
            <Shadow
              style={{marginBottom: 20}}
              distance={4}
              offset={[0, 2]}
              paintInside={false}>
              <TextInput
                value={resolution}
                onChangeText={setResolution}
                style={Styles.Form}
                placeholder="resolution"
                placeholderTextColor={'#828282'}
              />
            </Shadow>

            <Pressable
              onPress={() => {
                updateResolution();
              }}
              onPressIn={() => {
                setPress(true);
              }}
              onPressOut={() => {
                setPress(false);
              }}
              style={
                press === true
                  ? Styles.LoginBtnPressIn
                  : Styles.LoginBtnPressOut
              }>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: '#fff',
                  textAlign: 'center',
                }}>
                시작하기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default ResolutionScreen;

const Styles = StyleSheet.create({
  SignInContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  backArrow: {},
  Logo: {
    alignItems: 'center',
    marginLeft: -10,
  },
  FormContainer: {
    flex: 1,
  },
  FormBox: {
    marginTop: 50,
    alignItems: 'center',
  },
  Form: {
    textAlign: 'center',
    width: 280,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    color: '#222',
  },
  LoginBtnPressOut: {
    marginTop: 70,
    width: 280,
    backgroundColor: '#FF889E',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
  },
  LoginBtnPressIn: {
    marginTop: 70,
    width: 280,
    backgroundColor: '#FF617E',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
  },
});
