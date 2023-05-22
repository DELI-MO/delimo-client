import react, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
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
    console.log('tokentoken>>>', token);

    try {
      const res = await axios.get(BASE_URL + `/diary/today`, {
        headers: {
          // Authorization: `Bearer ${token}`,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0IiwiZXhwIjoxNjg0Nzc1MjE2fQ.E8dJ85iWoj-iEqAh--f9izPKrWhI-_U-9q2ROANnmpQ`,
        },
      });
      setData(res.data);
      console.log('res', data);
    } catch (e) {
      console.log('e', e);
    }
  };
  console.log(data);
  useEffect(() => {
    getDiaryToday();
  }, [isFocused]);

  useEffect(() => {
    if (data?.data?.visited === 1) {
      console.log('1이상임 시작');
      toggleModal2();
    }
  }, [data]);
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
  const [senti, setSenti] = useState('');
  const [numSenti, setNumSenti] = useState(0);
  console.log(numSenti);

  const updateSentiment = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentoken>>>', token);
    const change = {
      diaryId: data?.data.diaryId,
      sentimentId: data?.data.sentimentId,
      newSentiment: numSenti,
    };
    try {
      const res = await axios.patch(
        BASE_URL + `/diary/updateSentiment`,
        change,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0IiwiZXhwIjoxNjg0Nzc1MjE2fQ.E8dJ85iWoj-iEqAh--f9izPKrWhI-_U-9q2ROANnmpQ`,
          },
        },
      );
      console.log('sentiment res>>>>', res);
      getDiaryToday();
    } catch (e) {
      console.log('e', e);
    }
  };

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
                right: 75,
                backgroundColor: '#5C87F5',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 50,
              }}>
              <Image
                source={require('../../assets/pen.png')}
                style={{width: 20, height: 20}}
              />
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
                    <Text
                      key={idx}
                      style={{textAlign: 'center', marginVertical: 10}}>
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
        onPress={() => {}}
        style={{
          position: 'absolute',
          bottom: 130,
          right: 30,
          backgroundColor: '#4E3F42',
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 50,
        }}>
        <Image
          source={require('../../assets/Flip.png')}
          style={{width: 20, height: 20}}
        />
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
              alignItems: 'flex-end',
              borderRadius: 20,
            }}>
            <Pressable
              onPress={toggleModal2}
              style={{marginRight: 20, paddingTop: 10}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>X</Text>
            </Pressable>
            <View
              style={{
                flexDirection: 'column',
                paddingVertical: 30,
                paddingHorizontal: 30,
                alignItems: 'center',
              }}>
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
                        감정{' '}
                        <Text
                          style={{
                            textDecorationLine: 'underline',
                          }}>
                          {senti}
                        </Text>
                        으로 변경하기
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                        }}>
                        {sentiment.map((value, idx) => {
                          return (
                            <>
                              <View>
                                <Pressable
                                  onPress={() => {
                                    setSenti(value);
                                    setNumSenti(idx);
                                  }}
                                  key={idx}
                                  style={
                                    idx === 0
                                      ? {
                                          backgroundColor: '#D9D9D9',
                                          marginHorizontal: 10,
                                          marginVertical: 30,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                      : idx === 1
                                      ? {
                                          backgroundColor: '#FF9E9E',
                                          marginHorizontal: 10,
                                          marginVertical: 30,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                      : idx === 2
                                      ? {
                                          backgroundColor: '#7ACFFF',
                                          marginHorizontal: 10,
                                          marginVertical: 30,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                      : idx === 3
                                      ? {
                                          backgroundColor: '#B881FF',
                                          marginHorizontal: 10,
                                          marginVertical: 30,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                      : idx === 4
                                      ? {
                                          backgroundColor: '#949494',
                                          marginHorizontal: 10,
                                          marginVertical: 15,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                      : idx === 5
                                      ? {
                                          backgroundColor: '#D8D022',
                                          marginHorizontal: 10,
                                          marginVertical: 15,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                      : idx === 6
                                      ? {
                                          backgroundColor: '#FFB36C',
                                          marginHorizontal: 10,
                                          marginVertical: 15,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                      : idx === 7 && {
                                          backgroundColor: '#88DA81',
                                          marginHorizontal: 10,
                                          marginVertical: 15,
                                          borderRadius: 100,
                                          paddingHorizontal: 10,
                                          paddingVertical: 5,
                                        }
                                  }>
                                  {idx === 0 ? (
                                    <Text style={{color: '#000'}}>{value}</Text>
                                  ) : (
                                    <Text style={{color: '#FFF'}}>{value}</Text>
                                  )}
                                </Pressable>
                              </View>
                            </>
                          );
                        })}
                      </View>
                      <Pressable
                        onPress={() => {
                          updateSentiment();
                          toggleModal2();
                        }}
                        style={{
                          backgroundColor: '#D9D9D9',
                          marginVertical: 20,
                          borderRadius: 100,
                          paddingHorizontal: 20,
                          paddingVertical: 5,
                        }}>
                        <Text style={{color: '#000'}}>확인</Text>
                      </Pressable>
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
  sentiment: {
    marginHorizontal: 30,
    marginVertical: 30,
    borderRadius: 100,
  },
});
