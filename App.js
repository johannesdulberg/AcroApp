import * as React from 'react';
import { Button, View, Text ,Image,TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Moves from './screens/moves';
import MoveDetails from './screens/moveDetails';
import {useState, useEffect} from 'react'
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
function HomeScreen({ navigation }) {

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


  useEffect(() => {
    (async() => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
      setHasGalleryPermission(galleryStatus.status==="granted")

    })()
  },[])





  const pickImage =async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[4,3],
      quality:1,
    })

    if (!result.cancelled){
      setImage(result.uri)
      saveImage(result.uri)
      console.log("RESULT",result.uri)

    }
    

  }
  if (hasGalleryPermission === false){
    return <Text>No access to storage</Text>
  }

    //IMAGE PICKER END
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Button title="pick Image" onPress={() => pickImage()}/>
        <Image source={{uri:image}} style={{flex:1/2}}/>
      </View>
      <Button
        title="Moves"
        onPress={() => navigation.navigate('Moves')}
      />
    </View>
  );
}


/*const Stack = createNativeStackNavigator();*/
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Moves" component={Moves} 
      options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
