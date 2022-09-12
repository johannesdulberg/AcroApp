import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity ,Modal} from 'react-native';
import { globalStyles } from '../styles/global';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoveDetails from './moveDetails';
import { MaterialIcons } from '@expo/vector-icons';
import MoveForm from "./moveForm";
import {primaryColor,secondaryColor,backgroundColor,thirdColor} from '../styles/global'
import AsyncStorage from '@react-native-async-storage/async-storage';

function difficultyOverTwo(move){
  return move.difficulty>2
}
function MovesList({navigation}) {
  






  const [modalOpen, setModalOpen] = useState(false);

  const [move,setMove]=useState([
    {title:"Ninjastar",difficulty:"2",description:"Lorem Ipsum",key:"1"},
    {title:"Corkscrew",difficulty:"3",description:"Lorem Ipsum",key:"2"},
    {title:"Prasarita Twist",difficulty:"5",description:"Lorem Ipsum",key:"3"},
  ]);

  //SAVE AND RETRIEVE
  const saveMoveToUserDevice = async move => {
    console.log("saveMoveToUserDevice/move",move);
    try {
      const stringifyMove = JSON.stringify(move);
      await AsyncStorage.setItem('move', stringifyMove);
    } catch (error) {
      console.log("saveMoveToUserDevice",error);
    }
  };

  const getMoveFromUserDevice = async () => {
    try {
      const move = await AsyncStorage.getItem('move');
      if (move != null) {
        setMove(JSON.parse(move));
      }
    } catch (error) {
      console.log("getMoveFromUserDevice",error);
    }
  };



  const addMove =(newMove) =>{
    newMove.key=Math.random().toString();
    setMove((currentMoves)=>{
        return[newMove,...currentMoves]
    });
    saveMoveToUserDevice(move)
    setModalOpen(false);
  }

  const deleteMove = moveId => {
    console.log("DELETE/MOVE ID",moveId)
    const newMoveList = move.filter(item => item.key != moveId);
    console.log("DELTE/NEWMOVELIST",newMoveList)
    setMove(newMoveList);
  };

  React.useEffect(() => {
    getMoveFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveMoveToUserDevice(move);
  }, [move]);


  return (


    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType='slide' >
        <View style={styles.modalContent}>
          <MaterialIcons 
            name='close'
            size={24} 
            style={{...styles.modalToggle, ...styles.modalClose}} 
            onPress={() => setModalOpen(false)} 
          />
          <MoveForm addMove={addMove}/>
        </View>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)} 
      />



      <FlatList
        data={move}
        renderItem={({item})=>(
          <TouchableOpacity onPress={() => navigation.navigate("MoveDetails",item)} style={styles.listItem}>
            <Text style={globalStyles.titleTextM}>{item.title} </Text>
            <Text style={globalStyles.titleTextD}>{item.difficulty}</Text>
            <TouchableOpacity onPress={() => deleteMove(item.key)} style={styles.delete}>
            <Text style={globalStyles.titleTextX}>x</Text>
            
            
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      /> 
    </View>
  );
}


const Stack = createNativeStackNavigator();
export default function Moves({navigation}) {
  return (

        <Stack.Navigator initialRouteName="MovesList" >
        <Stack.Screen name="MovesList" component={MovesList} options={{
          title: 'Moves',
          headerStyle: {
            backgroundColor:primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="MoveDetails" component={MoveDetails} options={{
          title: 'Move Details',
          headerStyle: {
            backgroundColor:primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        </Stack.Navigator>

  )
}
const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 10,
  },
  modalContent: {
    flex: 1,
    backgroundColor:primaryColor
  },
  listItem:{
    borderRadius:5,
    borderColor:"gray",
    borderWidth:2,
    marginBottom:7,
    paddingHorizontal:5,
    paddingVertical:5,
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    alignSelf:"center",
    width:"90%",

  },
  delete:{
    width:25,
    height:25,
  }
});