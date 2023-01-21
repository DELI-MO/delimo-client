import react, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet, Pressable} from 'react-native';
import FriendList from './FriendList/FriendList';
import FriendAdd from './FriendAdd';
import RecommandQuestion from './RecommandQuestion';
const MyPageScrollMenu = () => {
  const [friendList, setFriendList] = useState(true);
  const [friendAdd, setFriendAdd] = useState(false);
  const [question, setQuestion] = useState(false);
  console.log(friendList, friendAdd, question);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 25,
          marginHorizontal: 15,
          marginBottom: 25,
        }}>
        <Pressable
          onPress={() => {
            setFriendList(true);
            setFriendAdd(false);
            setQuestion(false);
          }}>
          <Text
            style={
              friendList === true
                ? {color: '#282828', fontSize: 15}
                : Styles.Text
            }>
            친구 목록
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setFriendList(false);
            setFriendAdd(true);
            setQuestion(false);
          }}>
          <Text
            style={
              friendAdd === true
                ? {color: '#282828', fontSize: 15}
                : Styles.Text
            }>
            친구 추가
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setFriendList(false);
            setFriendAdd(false);
            setQuestion(true);
          }}>
          <Text
            style={
              question === true ? {color: '#282828', fontSize: 15} : Styles.Text
            }>
            질문 추천
          </Text>
        </Pressable>
      </View>
      {friendList === true ? <FriendList /> : null}
      {friendAdd === true ? <FriendAdd /> : null}
      {question === true ? <RecommandQuestion /> : null}
    </>
  );
};

export default MyPageScrollMenu;

const Styles = StyleSheet.create({
  Text: {
    fontSize: 15,
    color: '#767676',
  },
});
