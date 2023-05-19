import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FriendListItem from './FriendListItem';
import BASE_URL from '../../api/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FriendList = () => {
  const [friend, setFriend] = useState([]);
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    FriendList();
  }, []);

  const FriendList = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);

    try {
      const res = await axios.get(BASE_URL + `/friend/list`, {
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyM2J3NGQiLCJleHAiOjE2ODMwMjc2NjZ9.81WM_P2SML4_3Jv6288hXVx0mq0Fbj2KmhR8vufe83c`,
        },
      });
      console.log(res);
      setFriend(res.data.data);
      console.log('=====fre=====', friend);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        {friend.map((data, index) => {
          return (
            <View key={index} style={Styles.Container}>
              <FriendListItem
                userName={data.nickname}
                title={data.resolution}
              />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default FriendList;

const Styles = StyleSheet.create({
  Container: {
    marginHorizontal: 30,
    marginVertical: 5,
  },
});

const userData = {
  user: [
    {
      id: 1,
      userName: '새로미',
      title: '1일 1감정일기 화이팅',
    },
    {
      id: 2,
      userName: '모험가',
      title: '몬스터 잡자',
    },
    {
      id: 3,
      userName: '비니',
      title: '감정일기 어려워',
    },
    {
      id: 4,
      userName: '동희',
      title: '개발 파이팅',
    },
    {
      id: 5,
      userName: '동희',
      title: '개발 파이팅',
    },
    {
      id: 6,
      userName: '동희',
      title: '개발 파이팅',
    },
  ],
};
