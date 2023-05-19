import react, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BASE_URL from '../../api/BaseURL';
import DiaryComponent from '../Diary/diaryComponent';
const Question = () => {
  const Navigation = useNavigation();
  const bodyRef = useRef();
  let today = new Date();
  const date = today.toDateString();
  console.log(date);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [state, setState] = useState(0); //0: 비공개, 1: 전체공개, 2: 친구공개
  const [data, setData] = useState('');
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  const getDiaryToday = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);

    try {
      const res = await axios.get(BASE_URL + `/diary/today`, {
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0IiwiZXhwIjoxNjg0NDc0MzE5fQ.xKfyJRFS6Qq1aiFpTAnD5ZkGuEDCoXA2A2Yi8xzpXqM`,
        },
      });
      console.log('res', res.data);
      setData(res.data);
    } catch (e) {
      console.log('e', e);
    }
  };
  console.log(data);
  useEffect(() => {
    getDiaryToday();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.pageTitle}>오늘의 일기장</Text>
        </View>

        {data.data === null && (
          <>
            <View style={{marginTop: 150}}>
              <Text>오늘의 일기가 없습니다. 일기를 써주세요</Text>
            </View>

            <Pressable
              onPress={() => {
                Navigation.push('Diary');
              }}
              style={{
                position: 'absolute',
                bottom: 150,
                right: 70,
                backgroundColor: '#97E7DD',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 50,
              }}>
              <Text>글</Text>
            </Pressable>
          </>
        )}
        {data.data && (
          <>
            <View style={{marginTop: 60}}>
              <DiaryComponent contents={data.data} />
            </View>
          </>
        )}
      </View>
      <Pressable
        onPress={() => {}}
        style={{
          position: 'absolute',
          bottom: 150,
          right: 30,
          backgroundColor: '#000',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 50,
        }}>
        <Text>전</Text>
      </Pressable>
    </>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  dateText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
  },
  pageTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#636363',
    marginTop: 10,
  },
});
