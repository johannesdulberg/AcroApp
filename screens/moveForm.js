import React,{useState,useEffect} from 'react';
import { StyleSheet, Button, TouchableOpacity,TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import {primaryColor,secondaryColor,backgroundColor,thirdColor} from '../styles/global'
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Video } from 'expo-av';

export default function MoveForm({ addMove }) {


  //Video Stuff
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  //ASYNC STUFF
  const saveImage =async(imageUri)=>{
    try{
      if (imageUri!==null){
        AsyncStorage.setItem("Image",imageUri)
        console.log("SAVED IMAGE",imageUri)
      }
      
    }catch(error){
      console.log(error)
    }
  }
const getImage=async()=>{
  try{
    const name = await AsyncStorage.getItem("Image")
    setImage(name)


  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  getImage()
},[]
)

const deleteName=()=>{
  AsyncStorage.removeItem("appData")
  setTextFromUser("")
}
  //ASYNC STUFF END


  //IMAGE PICKER

  const [hasGalleryPermission, setHasGalleryPermission] =useState(null)
  const [image,setImage]=useState(null)
  const [imageUri,setImageUri]=useState("")

  useEffect(() => {
    (async() => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status==="granted")

    })()
  },[])





  const pickImage =async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect:[4,3],
      quality:1,
    })

    if (!result.cancelled){
      //setImage(result.uri)
      //saveImage(result.uri)
      console.log("RESULT",result.uri)
      setImageUri(result.uri)
      console.log("pickImage/imageUri",imageUri)

    }
    

  }
  if (hasGalleryPermission === false){
    return <Text>No access to storage</Text>
  }
    


  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ title: '', difficulty: '', description: '' ,videoUri:""}}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addMove(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='Move title'
              onChangeText={props.handleChange('title')}
              value={props.values.title}
            />

            <TextInput
              style={globalStyles.input}
              multiline
              placeholder='Difficulty'
              onChangeText={props.handleChange('difficulty')}
              value={props.values.body}
              keyboardType='numeric'
            />

            <TextInput 
              style={globalStyles.input}
              multiline
              placeholder='Description'
              onChangeText={props.handleChange('description')}
              value={props.values.rating}
            />

            
            <TouchableOpacity onPress={() => {
              pickImage()
            }
              
              } style={globalStyles.buttonSmall}>
              <Text style={globalStyles.buttonTextSmall}>Video</Text>
            </TouchableOpacity> 
            
          

            <TouchableOpacity onPress={props.handleSubmit} onPressOut={()=>{props.values.videoUri=imageUri}} style={globalStyles.button}>
              <Text style={globalStyles.buttonText}>SUBMIT</Text>
            </TouchableOpacity> 

          </View>
        )}
      </Formik>
    </View>
    
  );
}