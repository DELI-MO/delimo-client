import react, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Shadow} from 'react-native-shadow-2';
const SignInScreen = () => {
  const Navigation = useNavigation();
  const [press, setPress] = useState(false);
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
              <TextInput style={Styles.Form} placeholder="Email" />
            </Shadow>
            <Shadow
              style={{marginBottom: 20}}
              distance={4}
              offset={[0, 2]}
              paintInside={false}>
              <TextInput
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
                style={Styles.Form}
                placeholder="Confirm Password"
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
    marginTop: 50,
    alignItems: 'center',
  },
  Form: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  LoginBtnPressOut: {
    width: 280,
    backgroundColor: '#FF889E',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
  },
  LoginBtnPressIn: {
    width: 280,
    backgroundColor: '#FF617E',
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 10,
  },
});
