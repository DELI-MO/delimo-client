import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/Login/LoginScreen';
import LoginFormScreen from '../screen/Login/LoginFormScreen';
import {CardStyleInterpolators} from '@react-navigation/stack';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="LoginForm"
        component={LoginFormScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
