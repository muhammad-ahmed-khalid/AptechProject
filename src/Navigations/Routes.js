// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AppHeader from '../Components/AppHeader/AppHeader';
import { getItem } from '../Services/storageServices';
import { useAuth } from '../Services/AuthContext';
// import AppHeader from './Cmponents/AppHeader/AppHeader';

const Stack = createNativeStackNavigator();

function Routes() {
  const { isAuthenticated, isLoading } = useAuth();
  console.log(isAuthenticated, "isAuthenticated")
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ 
        animation:'slide_from_right',
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
       {isAuthenticated ? <>{AppStack(Stack)}</>: <>{AuthStack(Stack)}</> }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;