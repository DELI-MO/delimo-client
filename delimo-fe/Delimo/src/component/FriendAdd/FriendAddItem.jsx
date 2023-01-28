import react, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
const FriendAddItem = () => {
  return (
    <>
      <View style={Styles.container}>
        <View>
          <Text style={{fontSize: 16, color: '#000'}}>마로니에</Text>
          <Text style={{fontSize: 12, color: '#959595'}}>
            1일 1감정일기 화이팅
          </Text>
        </View>
        <Pressable
          style={{
            marginLeft: 90,
            justifyContent: 'center',
            backgroundColor: '#FF889E',
            paddingHorizontal: 13,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff'}}>친구추가</Text>
        </Pressable>
      </View>
    </>
  );
};

export default FriendAddItem;

const Styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: '60%',
    borderColor: '#959595',
    borderWidth: 0.75,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
