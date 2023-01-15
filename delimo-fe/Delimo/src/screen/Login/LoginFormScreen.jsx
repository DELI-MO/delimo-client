import {useNavigation} from '@react-navigation/native';
import react, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
const LoginFormScreen = () => {
  const [press, setPress] = useState(false);
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('');

  const Navigation = useNavigation();
  return (
    <>
      <View style={Styles.LoginFormContainer}>
        <View style={Styles.Logo}>
          <Image
            resizeMode="contain"
            source={require('../../assets/LoginLogo.png')}
            style={{
              marginTop: 60,
              width: 120,
              height: 190,
            }}
          />
          <Text
            style={{
              marginTop: 40,
              fontWeight: '700',
              fontSize: 20,
              color: '#828282',
            }}>
            델리모에 오신 것을 환영합니다!
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
                placeholder="Email"
                placeholderTextColor={'#828282'}
                style={Styles.Form}
              />
            </Shadow>
            <Shadow distance={4} offset={[0, 2]} paintInside={false}>
              <TextInput
                value={passWord}
                onChangeText={setPassWord}
                placeholder="Password"
                placeholderTextColor={'#828282'}
                style={Styles.Form}
                secureTextEntry={true}
              />
            </Shadow>
            <Pressable
              onPress={() => {}}
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
              <Text style={{fontSize: 20, fontWeight: '500', color: '#fff'}}>
                로그인
              </Text>
            </Pressable>
            <View style={{flexDirection: 'row', marginTop: 100}}>
              <Text>아직 계정이 없으신가요? </Text>
              <Pressable
                onPress={() => {
                  Navigation.navigate('SignIn');
                }}>
                <Text style={{color: '#FF889E'}}>회원가입</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default LoginFormScreen;

const Styles = StyleSheet.create({
  LoginFormContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  Logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  FormContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  FormBox: {
    marginTop: 60,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  Form: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  LoginBtnPressOut: {
    backgroundColor: '#FF889E',
    paddingHorizontal: 114,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 20,
  },
  LoginBtnPressIn: {
    backgroundColor: '#FF617E',
    paddingHorizontal: 114,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 20,
  },
});
