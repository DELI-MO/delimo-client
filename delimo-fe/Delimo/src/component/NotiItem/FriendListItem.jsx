import {Text, View, Pressable} from 'react-native';
import axios from 'axios';
import BASE_URL from '../../api/BaseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FriendAddListItem = props => {
  console.log('props', props);
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };

  const acceptRequest = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);
    const data = {
      friendId: props.friendId,
    };
    try {
      const res = await axios.post( BASE_URL + `/friend/acceptRequest`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            //Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyM2J3NGQiLCJleHAiOjE2ODMwMjc2NjZ9.81WM_P2SML4_3Jv6288hXVx0mq0Fbj2KmhR8vufe83c`,
          },
        },
      );
      console.log('=======res', res);
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRequest = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);
    const data = {
      friendId: props.friendId,
    };
    try {
      const res = await axios.post( BASE_URL + `/friend/rejectRequest`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            //Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyM2J3NGQiLCJleHAiOjE2ODMwMjc2NjZ9.81WM_P2SML4_3Jv6288hXVx0mq0Fbj2KmhR8vufe83c`,
          },
        },
      );
      console.log('=======res', res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View
        style={{
          marginVertical: 7,
          marginHorizontal: 10,
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderWidth: 0.5,
          borderColor: 'black',
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {props.nickname}
          </Text>
          <Text style={{fontSize: 14, fontWeight: 'bold'}}>
            {props.resolution}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={() => acceptRequest()} style={{marginRight: 10}}>
            <Text style={{color: '#FF889E', fontWeight: 'bold'}}>수락</Text>
          </Pressable>
          <Pressable onPress={() => rejectRequest()}>
            <Text style={{fontWeight: 'bold'}}>거절</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default FriendAddListItem;
