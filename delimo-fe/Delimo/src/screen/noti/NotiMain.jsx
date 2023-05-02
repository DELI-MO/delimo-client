import {useState, useEffect} from 'react';
import {Pressable, Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FriendListItem from '../../component/FriendList/FriendListItem';
import FriendAddListItem from '../../component/NotiItem/FriendListItem';
const NotiMain = () => {
  const [menu, setMenu] = useState('noti');
  const [friendAdd, setFriendAdd] = useState([]);
  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    RequestedFriendList();
  }, []);

  const RequestedFriendList = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);

    try {
      const friend = await axios.get(
        `http://delimo-env.eba-ufdmrhpz.us-east-1.elasticbeanstalk.com/friend/requested`,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyM2J3NGQiLCJleHAiOjE2ODMwMjc2NjZ9.81WM_P2SML4_3Jv6288hXVx0mq0Fbj2KmhR8vufe83c`,
          },
        },
      );
      setFriendAdd(friend.data.data);
      console.log(friendAdd);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            borderBottomColor: 'black',
            height: 70,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Pressable onPress={() => setMenu('noti')}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>알림</Text>
          </Pressable>
          <Pressable onPress={() => setMenu('addFriend')}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>친구 신청</Text>
          </Pressable>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flexDirection: 'column', marginTop: 10}}>
          {menu === 'noti' ? (
            <>
              <Text>ㅎㅇㅎㅇ</Text>
            </>
          ) : (
            <>
              {friendAdd?.map(friend => {
                return (
                  <FriendAddListItem
                    key={friend.friendId}
                    nickname={friend.nickname}
                    resolution={friend.resolution}
                    friendId={friend.friendId}
                  />
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default NotiMain;
