import { StyleSheet, FlatList, View } from "react-native";
import ListItem from "./ListItem";

import { useState } from "react";

import styles from "../Appstyles";

export default function ListContainer({data}){
    const renderItem=({item})=>{
       return <ListItem id={item._id}>{item.name}</ListItem>
    }

    return(
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item=>item._id}
        style={styles.listContainer}
        />
    )
}