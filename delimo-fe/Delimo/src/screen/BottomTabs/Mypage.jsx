import react, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyPageScrollMenu from '../../component/MyPageScrollMenu';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import BASE_URL from '../../api/BaseURL';
const Mypage = () => {
  const Navigation = useNavigation();
  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState('');
  const [userCode, setUserCode] = useState('');
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  const getUserData = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);
    try {
      const res = await axios.get(BASE_URL + `/users/myPage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.data);
      console.log(res);
      setUserData(res.data);
      // setUserCode(userData.data.code);
      // setUserName(userData.data.nickname);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {userData ? (
        <>
          <LinearGradient
            colors={['pink', 'purple']}
            style={Styles.container}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'space-between',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
              <Pressable
                onPress={() => {
                  Navigation.navigate('Noti');
                }}
                style={{
                  paddingVertical: 4,
                  backgroundColor: 'white',
                  width: 50,
                  borderRadius: 10,
                  shadowColor: '#000',
                  elevation: 2,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#000',
                    fontweight: '700',
                    fontSize: 10,
                  }}>
                  알림
                </Text>
              </Pressable>

              <TouchableOpacity
                style={{
                  backgroundColor: '#FF889E',
                  width: 50,
                  paddingVertical: 4,
                  borderRadius: 10,
                  shadowColor: '#000',
                  elevation: 2,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 10,
                  }}>
                  수정
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{paddingLeft: 40}}>
              <Text style={Styles.text}>
                "{userData.data.nickname}" 님의 하루가{'\n'}행복하길 바래요.
              </Text>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 13,
                  color: '#fff',
                  textShadowColor: 'rgba(0,0,0,0.35)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                }}>
                ID: {userData.data.code}
              </Text>
            </View>

            <View style={Styles.mainContainer}>
              <MyPageScrollMenu />
            </View>
          </LinearGradient>
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#FF889E" />
        </View>
      )}
    </>
  );
};

export default Mypage;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 40,
    paddingTop: 30,
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 30,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    lineHeight: 36,
  },
  mainContainer: {
    flex: 1,
    marginTop: 60,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: 'white',
  },
});
