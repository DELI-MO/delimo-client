import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BoardListItem from '../../component/BoardList/BoardListItem';
import BASE_URL from '../../api/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Board = () => {
  const [board, setBoard] = useState([]);
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBoardData = async () => {
		const tokens = await getUserToken();
    //console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    //console.log('tokentoken>>>', token);

		try {
      const res = await axios.get(BASE_URL + `/community/diaries`, {
        headers: {
          Authorization: `Bearer ${token}`,
          //Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJseWIyMzI1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCIsImV4cCI6MTY5OTYxNzg2NX0.7xNl9_6AYkBTyx1_kqZtHC7hCzXCmPrhEYRL5zlTITw`,
        },
      });
      //console.log('boarddata res>>>>>', res);
      // 게시글을 최신순으로 정렬
      const sortedData = res.data.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      setBoard(sortedData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchBoardData();
  }, []);
  
  function formatDate(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();  
    if (now.getFullYear() !== postDate.getFullYear()) {
      return `${postDate.getFullYear()}/${postDate.getMonth() + 1}/${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}:${postDate.getSeconds()}`;
    }
    if (now.getDate() !== postDate.getDate()) {
      return `${postDate.getMonth() + 1}/${postDate.getDate()},  ${postDate.getHours()}:${postDate.getMinutes()}`;
    }
    return `${postDate.getHours()}:${postDate.getMinutes()}`;
  }

  let today = new Date();
  const date = today.toDateString();

  return (
    <>
    <ScrollView
        contentContainerStyle={{paddingBottom: 150, alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
      <View>
        <Text style={styles.dateText}>{date}</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Diary Community</Text>
        <Text style={styles.subtitle}>오늘 당신의 하루는 어땠나요?</Text>
      </View>

      {board.map((data, index) => {
        return (
          <View key={index} style={styles.boardItemContainer}>
            <BoardListItem
              userName={data.nickname} 
              post={data.content}
              diaryId={data.diaryId}
              comments={data.comments || []}
              postDate={formatDate(data.createdDate)}
              fetchDiaries={fetchBoardData}
            />
          </View>
        );
      })}
    </ScrollView>
    </>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  dateText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
  },
  titleContainer: {
    //height: 110,
    padding: 30,
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#FF889E',
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    marginTop: 6,
  },
  boardItemContainer: {
    width: '90%',
    marginHorizontal: 30,
    marginVertical: 5,
  },
});

const diaryData = {
	data: [
		{
			diaryId: 1,
			userName: 'yebin',
			post: '졸업까지 얼마 안남아서 너무 슬퍼퍼',
		},
		{
			diaryId: 2,
			userName: '모험가',
			post: '오늘은 제주 여행 1일차!\n성산일출봉을 다녀와서 너무 기쁘다!\n맛집을 잘 찾아서 점심을 배부르게 잘 먹어서 그런지 더 보람찬 여행 1일차가 되었다.',
    },
		{
			diaryId: 3,
			userName: '비니',
			post: '감정일기 어려워',
		},
		{
			diaryId: 4,
			userName: '동희',
			post: '개발 파이팅',
		},
    {
			diaryId: 5,
			userName: 'gkdl',
			post: 'ㅇㅇ',
		},
    {
			diaryId: 6,
			userName: '감자',
			post: '구운 감자',
		},
    {
			diaryId: 7,
			userName: '세븐',
			post: '배고파',
		},
	],
};