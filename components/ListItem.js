import { StyleSheet, Item, TouchableOpacity, Text, View } from "react-native";
import { useState, useEffect } from 'react';
import {useNavigation} from "@react-navigation/native"
import * as Font from 'expo-font';

import styles from "../Appstyles";

export default function ListItem({children, id}){
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded]=useState(false);
    const loadFonts = async() =>{
        await Font.loadAsync({
          "Morris-Roman":require("../assets/morris-roman.ttf")
        })
        setFontsLoaded(true);
      }

      useEffect(()=>{
        loadFonts()
      })
    return(
        <View>
            <TouchableOpacity onPress={()=>navigation.navigate("Character", {id:id})}><Text style={[styles.character,{fontFamily:"Morris-Roman"}]}>{children}</Text></TouchableOpacity>
        </View>
    )
}