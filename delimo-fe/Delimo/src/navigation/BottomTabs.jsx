import react from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Question from '../screen/BottomTabs/Question';
import Calender from '../screen/BottomTabs/Calender';
import Mypage from '../screen/BottomTabs/Mypage';
import Board from '../screen/BottomTabs/Board';
import DiaryList from '../screen/BottomTabs/DiaryList';
import {Image, View} from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Question"
        screenOptions={{
          tabBarShowLabel: false,
          // tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 18,
            right: 18,
            elevation: 0,
            backgroundColor: '#282828',
            borderRadius: 18,
            height: 65,
            paddingHorizontal: 15,
          },
        }}>
        <Tab.Screen
          name="Question"
          component={Question}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../assets/question.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#fff' : '#959595',
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="DiaryList"
          component={DiaryList}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../assets/diary_list.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#fff' : '#959595',
                  }}
                />
              </View>
            ),
          }}
        />
      {
        /*        
        <Tab.Screen
          name="Calender"
          component={Calender}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../assets/Calendar.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#fff' : '#959595',
                  }}
                />
              </View>
            ),
          }}
        />
        */
      }
        <Tab.Screen
          name="Board"
          component={Board}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../assets/board.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#fff' : '#959595',
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="MyPage"
          component={Mypage}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Image
                  source={require('../assets/mypage.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? '#fff' : '#959595',
                  }}
                />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabs;
