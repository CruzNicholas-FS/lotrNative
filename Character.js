import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as Linking from "expo-linking";
import { SafeAreaView, Switch, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import styles from './Appstyles';

export default function Character({navigation, route}) {
  const [characters, setCharacters]=useState(null);
  const [loading, setLoading]=useState(false);
  const [error, setError]=useState(null);

  const [values, setValues]=useState({
    name:"",
    race:""
  })

  const {id}=route.params

  const API_BASE=process.env.NODE_ENV==="development"
  ? "http://localhost:9000/api/v1" : process.env.REACT_APP_BASE_URL

  let ignore=false;
  useEffect(()=>{
    if (!ignore) {
      getCharacter();
    }

    return ()=>{
      ignore = true
    }
  }, [])

  const getCharacter = async ()=>{
    setLoading(true)
    try {
      await fetch(`${API_BASE}/characters/${id}`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        setValues({name:data.name, race:data.race})
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const deleteCharacter=async()=>{
    try {
      await fetch(`${API_BASE}/characters/${id}`,{
        method:"DELETE"
      })
      .then(res=>res.json())
      .then(data=>{
        navigation.navigate("Dashboard");
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
      console.log(error.message);
    } finally{
      setLoading(false)
    }
  }

  const updateCharacter=async()=>{
    try {
      await fetch(`${API_BASE}/characters/${id}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(values)
      })
      .then(res=>res.json())
      .then(data=>{
        setCharacters(data)
        navigation.navigate("Dashboard");
      })
    } catch (error) {
      setError(error.message||"Unexpected Error")
    } finally{
      setLoading(false)
    }
  }

  const handleSubmit=(event)=>{
    event.preventDefault();
    updateCharacter();
  }

  const handleInputChanges=(event)=>{
    event.persist();
    setValues((values)=>({
      ...values,
      [event.target._internalFiberInstanceHandleDEV.memoizedProps.name]:event.nativeEvent.text
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.characterContent}>
        <Text style={[styles.dashboardTitle, {fontFamily:"Morris-Roman"}]}>Character Profile:</Text>
        <Text>{values.name}</Text>
        <TouchableOpacity onPress={()=>deleteCharacter()}><Text>Delete Character</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={()=>navigation.navigate("Home")}><Text style={[styles.navButtonText, {fontFamily:"Morris-Roman"}]}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={()=>navigation.navigate("Dashboard")}><Text style={[styles.navButtonText, {fontFamily:"Morris-Roman"}]}>Dashboard</Text></TouchableOpacity>

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
}