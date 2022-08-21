import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { SafeAreaView, Switch, StyleSheet, Text, View, Button, TouchableOpacity, Platform } from 'react-native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native"

import styles from './Appstyles';

import Dashboard from './Dashboard';
import Character from './Character';

function HomeScreen({navigation}){
  const [fontsLoaded, setFontsLoaded]=useState(false);
  const loadFonts = async() =>{
    await Font.loadAsync({
      "Morris-Roman":require("./assets/morris-roman.ttf")
    })
    setFontsLoaded(true);
  }

  useEffect(()=>{
    loadFonts()
  })

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.homeContent}>
        <Text style={[styles.title, {fontFamily:"Morris-Roman"}]}>Lord of the Rings Characters</Text>
        <TouchableOpacity style={styles.navButton} onPress={()=>navigation.navigate("Dashboard")}><Text style={[styles.navButtonText, {fontFamily:"Morris-Roman"}]}>Dashboard</Text></TouchableOpacity>
        <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    );
  } else{
    return null;
  }
}

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Dashboard' component={Dashboard}/>
        <Stack.Screen name='Character' component={Character} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}