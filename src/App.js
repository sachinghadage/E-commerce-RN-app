/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {DefaultTheme,Provider as PaperProvider } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen'
import CreateAdScreen from './screens/CreateAdScreen';
import HomeScreen from './screens/ListItemScreen'
import AccountScreen from './screens/AccountScreen';
import Feather from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'deepskyblue',
    
  },
};

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();
const AuthNavigator = ()=>{
  return(
  <Stack.Navigator>
   <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
   <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
   
</Stack.Navigator>
  )
}

const TabNavigator = ()=>{
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home'
        }
        else if(route.name==='create'){
          iconName='plus-circle'
        }
        else if (route.name==='account'){
          iconName="user" 
        }
        

        // You can return any component that you like here!
        return <Feather name={iconName} size={35} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'deepskyblue',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{title:""}}/>
    <Tab.Screen name="create" component={CreateAdScreen} options={{title:""}}/>
    <Tab.Screen name="account" component={AccountScreen} options={{title:""}}/>

  </Tab.Navigator>
  )
}

const Navigation = ()=>{
  const [user,setuser] =useState('')
  useEffect(()=>{
    const unsubscribe = auth().onAuthStateChanged((userExist)=>{
      if (userExist){
        setuser(userExist)
      }
      else{
        setuser("")
      }
    })
    return unsubscribe
  },[])
  return(
    <NavigationContainer>
     {user? <TabNavigator />:<AuthNavigator />}
    </NavigationContainer>
  )
}

const App = () => {
  

  return (
    <>
    <PaperProvider>
    <StatusBar barStyle="dark-content" backgroundColor="deepskyblue" />
    <View style={styles.container}>
          <Navigation />
    </View>
    </PaperProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
    // backgroundColor:'#fff'
  }
  
});

export default App;
