import react, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MyPageScrollMenu from '../../component/MyPageScrollMenu';
const Mypage = () => {
  const [userName, setUserName] = useState('하루');
  const [userID, setUserID] = useState('I3Ja2z');
  return (
    <>
      <LinearGradient
        colors={['pink', 'purple']}
        style={Styles.container}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={{alignItems: 'flex-end', paddingRight: 20}}>
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
            "{userName}" 님의 하루가{'\n'}행복하길 바래요.
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
            ID: {userID}
          </Text>
        </View>
        <View style={Styles.mainContainer}>
          <MyPageScrollMenu />
        </View>
      </LinearGradient>
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
