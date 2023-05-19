import react, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Shadow} from 'react-native-shadow-2';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../../api/BaseURL';
const SignInScreen = () => {
  const Navigation = useNavigation();
  const [press, setPress] = useState(false);
  const [email, setEmail] = useState('');
  const [nickName, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  // console.log('email:', email);
  // console.log('password:', password);
  // console.log('confirm:', confirm);

  const storeUserToken = async value => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      console.log(e);
    }
  };

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  const userToken = getUserToken();

  const loginFunc = async () => {
    const data = {
      email: email,
      password: password,
      nickname: nickName,
    };
    try {
      const response = await axios.post(BASE_URL + `/users/new`, data);
      console.log('token>>>', response.data);
      storeUserToken(response.data.data.token);
      Alert.alert('회원가입 성공', '', [
        {text: '확인', onPress: () => Navigation.push('Resolution')},
      ]);
    } catch (err) {
      Alert.alert('회원가입 오류', '이미 사용중인 이메일 입니다.', [
        {text: '확인', onPress: () => ''},
      ]);
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
              marginTop: 10,
              fontSize: 20,
              fontWeight: '800',
              color: '#828282',
            }}>
            회원가입
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
                value={email}
                onChangeText={setEmail}
                style={Styles.Form}
                placeholder="Email"
              />
            </Shadow>
            <Shadow
              style={{marginBottom: 20}}
              distance={4}
              offset={[0, 2]}
              paintInside={false}>
              <TextInput
                value={nickName}
                onChangeText={setNickname}
                style={Styles.Form}
                placeholder="NickName"
              />
            </Shadow>
            <Shadow
              style={{marginBottom: 20}}
              distance={4}
              offset={[0, 2]}
              paintInside={false}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={Styles.Form}
                placeholder="Password"
              />
            </Shadow>
            <Shadow
              style={{marginBottom: 20}}
              distance={4}
              offset={[0, 2]}
              paintInside={false}>
              <TextInput
                secureTextEntry={true}
                value={confirm}
                onChangeText={setConfirm}
                style={Styles.Form}
                placeholder="Confirm Password"
              />
            </Shadow>
            <View>
              {password === '' ? (
                ''
              ) : password === confirm ? (
                <Text>비밀번호가 확인 되었습니다.</Text>
              ) : (
                <Text>비밀번호를 확인해주세요</Text>
              )}
            </View>
            <Pressable
              onPress={() => {
                loginFunc();
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
                회원가입
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignInScreen;

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
    marginTop: 35,
    alignItems: 'center',
  },
  Form: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  LoginBtnPressOut: {
    marginTop: 10,
    width: 280,
    backgroundColor: '#FF889E',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
  },
  LoginBtnPressIn: {
    marginTop: 10,
    width: 280,
    backgroundColor: '#FF617E',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
  },
});
