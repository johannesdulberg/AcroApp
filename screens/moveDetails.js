import React,{useState} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';


export default function MoveDetails({route,navigation}){
    const {title,difficulty,description,key}= route.params;
    return(
      <View>
          <Text>{difficulty} {title}</Text>
      </View>
    )
}