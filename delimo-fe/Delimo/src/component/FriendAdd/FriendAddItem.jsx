import react, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FriendAddItem = props => {
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  const requestFriend = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);
    const data = {
      friendId: props.friendId,
    };
    try {
      const res = await axios.post(
        `http://Delimo-env.eba-ufdmrhpz.us-east-1.elasticbeanstalk.com/friend/request`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('res', res);
      if (res.data.code === 201) {
        Alert.alert('친구 신청을 성공적으로 보냈습니다.', '', [
          {
            text: '확인',
            onPress: () => {},
          },
        ]);
      }
    } catch (e) {
      console.log('e', e);
      if (e.response.data.message === '친구 신청이 이미 완료됐습니다.') {
        Alert.alert('친구 신청이 이미 완료됐습니다.', '', [
          {
            text: '확인',
            onPress: () => {},
          },
        ]);
      }
    }
  };
  console.log(props);
  return (
    <>
      <View style={Styles.container}>
        <View>
          <Text style={{fontSize: 16, color: '#000'}}>{props.name}</Text>
          <Text style={{fontSize: 12, color: '#959595'}}>
            {props.resolution}
          </Text>
        </View>
        <Pressable
          style={{
            marginLeft: 90,
            justifyContent: 'center',
            backgroundColor: '#FF889E',
            paddingHorizontal: 13,
            borderRadius: 10,
          }}
          onPress={() => {
            requestFriend();
          }}>
          <Text style={{color: '#fff'}}>친구추가</Text>
        </Pressable>
      </View>
    </>
  );
};

export default FriendAddItem;

const Styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: 320,
    borderColor: '#959595',
    borderWidth: 0.75,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
