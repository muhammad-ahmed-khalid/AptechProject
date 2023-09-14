// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AppHeader from '../Components/AppHeader/AppHeader';
// import AppHeader from './Cmponents/AppHeader/AppHeader';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        animation:'fade',
        headerShown: false,
         header: props => {
          let state = props.navigation.getState();
          let routeIndex = state?.routes[state?.index]?.state?.index;
          let routeName = state.routes[state.index].name;
          return (
            <AppHeader
              {...props}
              routeName={routeName}
              routeIndex={routeIndex}
            />
          );
        },
      }}>
       {false ? <>{AuthStack(Stack)}</> : <>{AppStack(Stack)}</>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;