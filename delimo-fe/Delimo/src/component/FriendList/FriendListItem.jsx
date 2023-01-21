import react, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
const FriendListItem = Props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <View style={Styles.container}>
        <View>
          <Text style={{fontSize: 16, color: '#000'}}>{Props.userName}</Text>
          <Text style={{fontSize: 12, color: '#959595'}}>{Props.title}</Text>
        </View>
        <Pressable>
          <Image
            source={require('../../assets/Group17.png')}
            resizeMode="contain"
            style={{
              width: 50,
              height: 35,
              marginRight: 10,
            }}
          />
        </Pressable>
        <Pressable
          onPress={toggleModal}
          style={{position: 'absolute', right: 10}}>
          <Image
            source={require('../../assets/Group18.png')}
            resizeMode="contain"
            style={{width: 15, height: 15}}
          />
        </Pressable>
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
              height: 120,
              bottom: -20,
              marginHorizontal: -20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}>
            <View style={{marginTop: 30}}>
              <TouchableOpacity>
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 5,
                    marginBottom: 20,
                    fontWeight: '700',
                    color: '#000',
                  }}>
                  친구 삭제
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

export default FriendListItem;

const Styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    borderColor: '#959595',
    borderWidth: 0.75,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
