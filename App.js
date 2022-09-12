import * as React from 'react';
import { Button, View, Text ,Image,TextInput,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Moves from './screens/moves';
import MoveDetails from './screens/moveDetails';
import {useState, useEffect} from 'react'
import * as ImagePicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Video } from 'expo-av';
import {primaryColor,secondaryColor,backgroundColor,thirdColor} from './styles/global'
import Ionicons from 'react-native-vector-icons/Ionicons';


function HomeScreen({ navigation }) {
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
      setImage(result.uri)
      saveImage(result.uri)
      console.log("RESULT",result.uri)

    }
    

  }
  if (hasGalleryPermission === false){
    return <Text>No access to storage</Text>
  }
    //<Button title="pick Image" onPress={() => pickImage()}/>
    //<Button
    //title="Moves"
    //onPress={() => navigation.navigate('Moves')}
    ///>
    //IMAGE PICKER END
  return (

    <View style={styles.homeContainer}>
      <View>
        
        
        <View style={styles.logoContainer}>
        <Image source={require("./assets/Logo.png")} style={styles.imageStyle}/>
        </View>
      </View>
      
    </View>
  );
}


/*const Stack = createNativeStackNavigator();*/
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={{
    tabBarStyle: {backgroundColor:thirdColor,position:"absolute",bottom:10,height:60,borderRadius:10,left:10,right:10},tabBarLabelStyle:{color:primaryColor,fontSize:15},tabBarActiveTintColor:primaryColor,tabBarInactiveTintColor:secondaryColor,
  }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
          title: 'Home',
          headerStyle: {
            backgroundColor:primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-home"
                size={24}
                color={tabInfo.focused ? primaryColor: secondaryColor}
              />
            );
          },
        }}/>
      <Tab.Screen name="Moves" component={Moves} 
      options={{headerShown: false,tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="list-outline"
            size={24}
            color={tabInfo.focused ? primaryColor: secondaryColor}
          />
        );
      },}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
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

export default App;
