import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DiaryListComponent = props => {
  const Navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <Text style={{marginRight: 10, marginBottom: 10, textAlign: 'right'}}>{props.postDate}</Text>
        <Text style={{marginHorizontal: 10, marginBottom: 25}}>{props.post}</Text>
      </View>
    </>
  );
};

export default DiaryListComponent;

const styles = StyleSheet.create({
  container: {
    borderColor: '#959595',
    borderWidth: 0.75,
    borderRadius: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#AAAAAA',
  },
});
