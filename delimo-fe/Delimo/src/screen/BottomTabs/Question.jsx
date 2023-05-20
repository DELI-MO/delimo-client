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
import {useIsFocused} from '@react-navigation/native';

import BASE_URL from '../../api/BaseURL';
import DiaryComponent from '../Diary/diaryComponent';
const Question = () => {
  const Navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const bodyRef = useRef();
  let today = new Date();
  const date = today.toDateString();
  console.log(date);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [state, setState] = useState(0); //0: 비공개, 1: 친구공개, 2: 전체공개
  const [data, setData] = useState([]);
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
          Authorization: `Bearer ${token}`,
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
  }, [isFocused]);

  const sentiment = [
    '없음',
    '기쁨',
    '당황',
    '분노',
    '불안',
    '슬픔',
    '상처',
    '성취',
  ];

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
                bottom: 130,
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
              {data?.data?.privacy === 0 && (
                <Text style={{textAlign: 'center', marginBottom: 10}}>
                  비공개
                </Text>
              )}

              {data?.data?.privacy === 1 && (
                <Text style={{textAlign: 'center', marginBottom: 10}}>
                  친구공개
                </Text>
              )}

              {data?.data?.privacy === 2 && (
                <Text style={{textAlign: 'center', marginBottom: 10}}>
                  전체공개
                </Text>
              )}
              {sentiment.map((value, idx) => {
                return (
                  data.data.sentiment === idx && (
                    <Text style={{textAlign: 'center', marginVertical: 10}}>
                      {value}
                    </Text>
                  )
                );
              })}
              <DiaryComponent
                contents={data.data.content}
                privacy={data.data.privacy}
                sentiment={data.data.sentiment}
              />
            </View>
          </>
        )}
      </View>
      <Pressable
        onPress={() => {
          toggleModal2();
        }}
        style={{
          position: 'absolute',
          bottom: 130,
          right: 30,
          backgroundColor: '#000',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 50,
        }}>
        <Text>전</Text>
      </Pressable>
      {/* ============sentiment Modal============= */}
      <View>
        <Modal
          isVisible={isModalVisible2}
          onBackdropPress={() => setModalVisible2(false)}
          onBackButtonPress={() => setModalVisible2(false)}>
          <View
            style={{
              backgroundColor: '#fff',

              borderRadius: 20,
            }}>
            <View style={{paddingVertical: 30, paddingHorizontal: 30}}>
              {sentiment.map((value, idx) => {
                return (
                  data?.data?.sentiment === idx && (
                    <>
                      <Text style={{textAlign: 'center', marginVertical: 10}}>
                        오늘의 감정은 {value} 이네요.
                      </Text>
                      <Text style={{textAlign: 'center', marginVertical: 10}}>
                        기쁘고 행복한 하루를 보내고 있나요?
                      </Text>
                      <Text style={{textAlign: 'center', marginVertical: 10}}>
                        감정 변경하기
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                        }}>
                        {sentiment.map(value => {
                          return (
                            <>
                              <Text style={{marginHorizontal: 30}}>
                                {value}
                              </Text>
                            </>
                          );
                        })}
                      </View>
                    </>
                  )
                );
              })}
            </View>
          </View>
        </Modal>
      </View>
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
