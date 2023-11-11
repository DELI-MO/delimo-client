import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {Press} from 'hammerjs';
import {ClientRequest} from 'http';
import react, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import BASE_URL from '../api/BaseURL';
import Modal from 'react-native-modal';
import FriendAddItem from './FriendAdd/FriendAddItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendAdd = () => {
  const [code, setfriendcode] = useState('');
  const [search, setSearch] = useState(false);
  const [fri, setFriend] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (e) {
      console.log(e);
    }
  };
  const searchFriend = async () => {
    const tokens = await getUserToken();
    console.log('token>>>>', tokens);
    const token = tokens.replace(/\"/gi, '');
    console.log('tokentokne>>>', token);
    const params = {
      code,
    };
    try {
      const friend = await axios.post( BASE_URL + `/friend/findByCode/${code}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(friend);
      setFriend(friend.data);
      console.log(fri);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <View style={Styles.Container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#000000',
          }}>
          친구 코드 검색
        </Text>
        <Pressable
          onPress={toggleModal}
          style={{
            backgroundColor: '#FF889E',
            paddingVertical: 10,
            paddingHorizontal: 13,
            borderRadius: 13,
            marginTop: 17,
          }}>
          <Image
            source={require('../assets/search.png')}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: '#fff',
            }}
          />
        </Pressable>
      </View>
      {/* ==========Modal============ */}
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: '#fff',
              marginBottom: -250,
              width: '111%',
              marginLeft: -20,
              height: '68%',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#282828',
                textAlign: 'center',
                marginLeft: -10,
                marginTop: 20,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              친구 코드 입력
            </Text>
            <View
              style={{
                borderColor: '#525252',
                borderWidth: 0.95,
                width: '75%',
                height: 40,
                paddingLeft: 15,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 10,
              }}>
              <TextInput
                style={{flex: 1}}
                placeholder="친구 코드를 입력해 주세요"
                onChangeText={setfriendcode}
                value={code}
              />
              <Pressable
                onPress={() => {
                  setSearch(true);
                  searchFriend();
                  console.log('친구코드:', code);
                }}>
                <Image
                  source={require('../assets/search.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    paddingRight: 50,
                    tintColor: '#FF889E',
                  }}
                />
              </Pressable>
            </View>
            <View style={{marginTop: 100}}>
              {fri ? (
                <FriendAddItem
                  name={fri.data.nickname}
                  resolution={fri.data.resolution}
                  friendId={fri.data.friendId}
                />
              ) : (
                <Text>검색해주세요</Text>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default FriendAdd;

const Styles = StyleSheet.create({
  Container: {
    // backgroundColor: 'red',
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignItems: 'center',

    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
});
