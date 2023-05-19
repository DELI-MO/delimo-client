import react, {useRef, useState} from 'react';
import Modal from 'react-native-modal';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Diary = ({route}) => {
  const Navigation = useNavigation();
  console.log(route.params);
  const [isModalVisible, setModalVisible] = useState(false);
  const [body, setBody] = route
    ? useState(route.params?.contents)
    : useState('');
  const bodyRef = useRef();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // if (route.params !== undefined) {
  //   setBody(route.params.contents);
  // }

  console.log(body);
  const [state, setState] = useState(0); //0: 비공개, 1: 전체공개, 2: 친구공개
  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              Navigation.goBack();
            }}>
            <Text style={{fontSize: 16}}>뒤로가기</Text>
          </Pressable>
          <View style={{flexDirection: 'row'}}>
            <Pressable>
              <Text style={{fontSize: 16, marginRight: 10}}>수정</Text>
            </Pressable>
            <Pressable>
              <Text style={{fontSize: 16}}>완료</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <TextInput
            multiline
            value={body}
            onChangeText={setBody}
            placeholder="당신의 오늘을 기록해보세요."
            textAlignVertical="top"
            ref={bodyRef}
            style={styles.diaryBody}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Pressable style={styles.stateBtn} onPress={toggleModal}>
            {state === 0 && (
              <Text
                style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                비공개
              </Text>
            )}
            {state === 1 && (
              <Text
                style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                전체 공개
              </Text>
            )}
            {state === 2 && (
              <Text
                style={{fontSize: 14, fontWeight: 'bold', textAlign: 'center'}}>
                친구 공개
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      {/* ============Modal============= */}
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}>
          <View
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              width: '111%',
              height: 200,
              bottom: -20,
              marginHorizontal: -20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View style={{marginTop: 30}}>
              <TouchableOpacity
                onPress={() => {
                  setState(1);
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 5,
                    marginBottom: 25,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  전체 공개
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setState(2);
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 5,
                    marginBottom: 25,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  친구 공개
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setState(0);
                  setModalVisible(false);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 5,
                    marginBottom: 25,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  비공개
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 0,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  취소
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Diary;

const styles = StyleSheet.create({
  stateBtn: {
    marginTop: 20,
    backgroundColor: 'transparent',
    borderColor: '#000',
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 1,
    width: 75,
    marginLeft: 10,
  },
  diaryBody: {
    marginTop: 10,
    paddingHorizontal: 15,
    height: 600,
  },
  header: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
