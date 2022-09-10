import React,{useState} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoveDetails from './moveDetails';


function MovesList({navigation}) {
  const [move,setMove]=useState([
    {title:"Ninjastar",difficulty:"2",description:"Lorem Ipsum",key:"1"},
    {title:"Corkscrew",difficulty:"3",description:"Lorem Ipsum",key:"2"},
    {title:"Prasarita Twist",difficulty:"3",description:"Lorem Ipsum",key:"3"},
  ]);
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={move}
        renderItem={({item})=>(
          <TouchableOpacity onPress={() => navigation.navigate("MoveDetails",item)}>
            <Text style={globalStyles.titleText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      /> 
    </View>
  );
}


const Stack = createNativeStackNavigator();
export default function Moves({navigation}) {
  return (

        <Stack.Navigator initialRouteName="MovesList">
        <Stack.Screen name="MovesList" component={MovesList} />
        <Stack.Screen name="MoveDetails" component={MoveDetails} />
        </Stack.Navigator>

  )
}
