import react, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import BASE_URL from '../../api/BaseURL';
import DiaryListComponent from '../DiaryList/DiaryListComponent';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const DiaryList = () => {
  const Navigation = useNavigation();
  const [list, setList] = useState([]);
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDiaryList = async () => {
		const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentoken>>>', token);

		try {
      const res = await axios.get(BASE_URL + `/diary/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
          //Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJseWJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0IiwiZXhwIjoxNjk5Nzg2MTk1fQ.vFC_RvcV06mvCSTFA18SjYVfDE_CxrSDplMtVtveApk`,
        },
      });
      //console.log('boarddata res>>>>>', res);
      // 게시글을 최신순으로 정렬
      const sortedData = res.data.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      setList(sortedData);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchDiaryList();
  }, []);

  function formatDate(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();  
    /*
    if (now.getFullYear() !== postDate.getFullYear()) {
      return `${postDate.getFullYear()}/${postDate.getMonth() + 1}/${postDate.getDate()} ${postDate.getHours()}:${postDate.getMinutes()}`;
    }
    if (now.getDate() !== postDate.getDate()) {
      return `${postDate.getMonth() + 1}/${postDate.getDate()},  ${postDate.getHours()}:${postDate.getMinutes()}`;
    }
    return `${postDate.getHours()}:${postDate.getMinutes()}`;
    */
    return `${postDate.getMonth() + 1}/${postDate.getDate()},  ${postDate.getHours()}:${postDate.getMinutes()}`;
  }

  return (
    <>
    <View style={styles.backArrow}>
      <Pressable
        onPress={() => {
          Navigation.goBack();
        }}>
        <Image
          source={require('../../assets/bx-arrow-back.png')}
          resizeMode="center"
        />
      </Pressable>
    </View>
    <ScrollView
        contentContainerStyle={{paddingBottom: 100, alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Diary List</Text>
        <Text style={styles.subtitle}>나의 감정과 기억들</Text>
      </View>

      {list.map((data, index) => {
        return (
          <View key={index} style={styles.listItemContainer}>
            <DiaryListComponent
              post={data.content}
              diaryId={data.diaryId}
              comments={data.comments || []}
              postDate={formatDate(data.createdDate)}
            />
          </View>
        );
      })}
    </ScrollView>
    </>
  );
};

export default DiaryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 50,
  },
  backArrow: {
    //marginBottom: -50,
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
    marginBottom: 15,
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
  listItemContainer: {
    width: '90%',
    marginHorizontal: 30,
    marginVertical: 5,
  },
});