import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FriendListItem from './FriendListItem';

const FriendList = () => {
  return (
    <>
      <ScrollView
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}>
        {userData.user.map(data => {
          return (
            <View style={Styles.Container}>
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
      userName: '새로미',
      title: '1일 1감정일기 화이팅',
    },
    {
      userName: '모험가',
      title: '몬스터 잡자',
    },
    {
      userName: '비니',
      title: '감정일기 어려워',
    },
    {
      userName: '동희',
      title: '개발 파이팅',
    },
    {
      userName: '동희',
      title: '개발 파이팅',
    },
    {
      userName: '동희',
      title: '개발 파이팅',
    },
  ],
};
