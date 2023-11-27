import React, { useState } from 'react';
import BASE_URL from '../../api/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';

const CommentItem = ({ comment }) => {
  //console.log('CommentItem props', comment);
  return (
    <View style={{flexDirection: 'row'}}>
      <View>
        <Text style={{fontSize: 10, color: '#000', fontWeight: 'bold', width: 60}}>{comment.nickname}</Text>
      </View>
      <View style={{flexShrink: 1}}>
        <Text style={{fontSize: 10, color: '#000'}}> {comment.content}</Text>
      </View>
    </View>
  );
};

const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (e) {
    console.log(e);
  }
};

const BoardListItem = props => {
  const [comment, setComment] = useState('');

  const postComment = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentoken>>>', token);

    if (!comment.trim()) {
      Alert.alert('알림', '댓글 내용을 입력해주세요.');
      return;
    }
    const data = {
      content: comment,
    };
    try {
      const res = await axios.post(BASE_URL + `/community/diaries/${props.diaryId}/comment`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          //Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJseWIyMzI1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCIsImV4cCI6MTY5OTYxNzg2NX0.7xNl9_6AYkBTyx1_kqZtHC7hCzXCmPrhEYRL5zlTITw`,
        },
      });
      //console.log('>>>>>>comment res', res);
      props.fetchDiaries();   // 댓글 게시 후 페이지 새로고침
    } catch (e) {
      console.log(e);
    }
    console.log(comment);
    setComment('');
  }

  //console.log('BoardListItem props', props);
  return (
    <>
      <View style={Styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={Styles.postNickname}>{props.userName}</Text>
          <Text style={{marginRight: 10}}>{props.postDate}</Text>
        </View>
        <View style={Styles.line} />
        <View style={{ paddingHorizontal: 10, marginBottom: 12 }}>
          <Text style={{fontSize: 12, color: '#000', paddingBottom: 15, marginTop: 12}}>{props.post}</Text>
          <Text style={{fontSize: 8, marginBottom: 40}}>댓글 {props.comments ? props.comments.length : 0}개</Text>
          {props.comments?.map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}
        </View>
        <View style={Styles.line} />
        <View style={Styles.inputBox}>
          <TextInput
            style={{ flex: 1, paddingHorizontal: 10, borderColor: '#AAAAAA', fontSize: 12, height: 30, paddingVertical: 0 }}
            onChangeText={text => setComment(text)}
            value={comment}
            placeholder="댓글 달기..."
          />
          <Pressable onPress={() => postComment(props.diaryId)}>
              <Text style={{ color: '#FF889E', fontSize: 16, marginRight: 10 }}>게시</Text>
          </Pressable>
        </View>

      </View>  
    </>
  );
};

export default BoardListItem;

const Styles = StyleSheet.create({
  container: {
    //backgroundColor: 'red',
    borderColor: '#959595',
    borderWidth: 0.75,
    borderRadius: 10,
    //paddingBottom: 13,
    //flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  postNickname: {
    paddingVertical: 3, 
    paddingLeft: 10, 
    fontSize: 16, 
    color: '#000'
  },
  line: {
    height: 1,
    backgroundColor: '#AAAAAA',
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center',
    //marginTop: 10,
  },
});
