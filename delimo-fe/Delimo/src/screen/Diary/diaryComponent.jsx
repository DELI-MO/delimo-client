import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const DiaryComponent = props => {
  const Navigation = useNavigation();
  return (
    <>
      <Pressable
        onPress={() =>
          Navigation.push('Diary', {
            contents: props?.contents,
            privacy: props?.privacy,
            sentiment: props?.sentiment,
          })
        }
        style={styles.container}>
        <Text>{props.contents}</Text>
      </Pressable>
    </>
  );
};

export default DiaryComponent;

const styles = StyleSheet.create({
  container: {
    width: 300,
    // height: 150,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
});
