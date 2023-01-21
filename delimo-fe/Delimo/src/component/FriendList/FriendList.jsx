import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FriendListItem from './FriendListItem';

const FriendList = () => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        {userData.user.map((data, index) => {
          return (
            <View key={index} style={Styles.Container}>
              <FriendListItem userName={data.userName} title={data.title} />
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
