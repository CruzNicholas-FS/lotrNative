import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './Appstyles';
import ListContainer from './components/ListContainer';

export default function Dashboard({navigation}) {
  const [characters, setCharacters]=useState(null);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);
  const [fontsLoaded, setFontsLoaded]=useState(false);
  const [values, setValues]=useState({
    name:"",
    race:""
  })

  const loadFonts = async() =>{
    await Font.loadAsync({
      "Morris-Roman":require("./assets/morris-roman.ttf")
    })
    setFontsLoaded(true);
  }

  const API_BASE=process.env.NODE_ENV==="development"
    ? "http://localhost:9000/api/v1" : process.env.REACT_APP_BASE_URL

  //let ignore=false;
  useEffect(()=>{
    loadFonts()

    //if (!ignore) {
    //  getCharacters();
    //  }
    navigation.addListener("focus",()=>{
      getCharacters();
    })

      //return ()=>{
      //ignore = true
      //}
  }, [])

  const getCharacters = async()=>{
    try {
        fetch(`${API_BASE}/characters`)
    .then(response=>response.json())
    .then(data=>setCharacters(data))
    } catch (error) {
        setError(error.message)
    }
}

  const createCharacter=async()=>{
    try {
      await fetch(`${API_BASE}/characters/`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      })
      .then(()=>getCharacters())
      .then(()=>setValues({name:"", race:""}))
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    createCharacter();
  }

  const handleInputChanges=(event)=>{
    event.persist();
    setValues((values)=>({
      ...values,
      [event.target._internalFiberInstanceHandleDEV.memoizedProps.name]:event.nativeEvent.text
    }))
  }

  if (fontsLoaded) {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.dashboardContent}>
        <Text style={[styles.dashboardTitle, {fontFamily:"Morris-Roman"}]}>Characters:</Text>
        <TouchableOpacity style={styles.navButton} onPress={()=>navigation.navigate("Home")}><Text style={[styles.navButtonText, {fontFamily:"Morris-Roman"}]}>Home</Text></TouchableOpacity>
        <ListContainer style={{fontFamily:"Morris-Roman"}} data={characters}/>

        <View style={styles.inputs}>
          <View style={styles.nameAlign}>
          <Text style={[styles.label, {fontFamily:"Morris-Roman"}]}>Name:</Text>
          <TextInput style={styles.input} name="name" value={values.name} onChange={handleInputChanges}/>
          </View>

          <View style={styles.raceAlign}>
          <Text style={[styles.label, {fontFamily:"Morris-Roman"}]}>Race:</Text>
          <TextInput style={styles.input} name="race" value={values.race} onChange={handleInputChanges}/>
          </View>

          <TouchableOpacity style={styles.submit} onPress={handleSubmit}><Text style={styles.submitText}>Submit</Text></TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    );
  } else{
    return null
  }
}