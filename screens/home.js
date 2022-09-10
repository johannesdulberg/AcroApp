import React from 'react';
import { StyleSheet, View, Text, Flatlist,TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Home() {
  const [moves,setMoves]=useState([
    {title:"Ninjastar",difficulty:"2",description:"Lorem Ipsum",key:1},
    {title:"Corkscrew",difficulty:"3",description:"Lorem Ipsum",key:2},
    {title:"Prasarita Twist",difficulty:"3",description:"Lorem Ipsum",key:3}
  ])
  return (
    <View style={globalStyles.container}>
      <Flatlist
        data={moves}
        renderItem={({item})=>(
          <TouchableOpacity onPress={() => NavigationPreloadManager.navigate("moves",item )}>
            <Text style={globalStyles.titleText}>{item.title}</Text>
          </TouchableOpacity>
        )}/>
    </View>
  );
}