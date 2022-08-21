import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      width:"100%",
      height:"100%",
      backgroundColor: '#855437'
    },
    homeContent:{
      display:"flex",
      alignItems:"center",
      marginTop:"60%"
    },
    dashboardContent:{
      display:"flex",
      flex:1,
      alignItems:"center",
      marginTop:"35%"
    },
    characterContent:{
      display:"flex",
      flex:1,
      alignItems:"center",
      marginTop:"40%"
    },
    title:{
        fontSize:30,
        color:"white"
    },
    dashboardTitle:{
      fontSize:35,
      color:"white"
    },
    navButton:{
      marginTop:"10%"
    },
    navButtonText:{
      color:"#9daf5d",
      fontSize:20
    },
    listContainer:{
      marginTop:"10%"
    },
    character:{
      color:"#9daf5d",
      marginBottom:10,
      fontSize:18
    },
    inputs:{
      width:"100%",
      display:"flex",
      alignItems:"center",
      marginBottom:"42%"
    },
    input:{
      width:"35%",
      backgroundColor:"white",
      paddingVertical:2,
      paddingHorizontal:"2%",
      marginLeft:"2%",
      borderRadius:1
    },
    nameAlign:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      marginBottom:"5%"
    },
    raceAlign:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center"
    },
    label:{
      color:"white",
      fontSize:18
    },
    submit:{
      backgroundColor:"#d5b361",
      paddingVertical:2,
      paddingHorizontal:5,
      borderRadius:3,
      marginTop:10
    }
  });

export default styles;