import React,{useState, useEffect} from 'react';
import { StyleSheet,Image, View, Text, FlatList, TouchableOpacity,Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { Video } from 'expo-av'
import {primaryColor,secondaryColor,backgroundColor,thirdColor} from '../styles/global'

export default function MoveDetails({route,navigation}){
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const {title,difficulty,description,key,videoUri}= route.params;


    return(

<View style={globalStyles.detailContainer}>
<View style={globalStyles.videoContainer}>
<Video
        ref={video}
        style={globalStyles.videoWindow}
        source={{
          uri:videoUri
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        />



</View>
<Text style={globalStyles.detailTextHeader}>{title}</Text>
<Text style={globalStyles.detailText}>Level {difficulty}</Text>
<Text style={globalStyles.detailText}>Description: {description}</Text>
</View>
      
    )
}
const styles = StyleSheet.create({
  homeContainer:{
    flex:1,

    backgroundColor: backgroundColor,
  },
  logoContainer:{
    alignItems: 'center',
    paddingTop:100,

    
  },
  imageStyle:{
    width:300,
    height:100,
    borderRadius:10,
    
  }

});