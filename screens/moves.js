import React,{useState} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity ,Modal} from 'react-native';
import { globalStyles } from '../styles/global';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MoveDetails from './moveDetails';
import { MaterialIcons } from '@expo/vector-icons';
import MoveForm from "./moveForm";


function MovesList({navigation}) {
  const [modalOpen, setModalOpen] = useState(false);

  const [move,setMove]=useState([
    {title:"Ninjastar",difficulty:"2",description:"Lorem Ipsum",key:"1"},
    {title:"Corkscrew",difficulty:"3",description:"Lorem Ipsum",key:"2"},
    {title:"Prasarita Twist",difficulty:"3",description:"Lorem Ipsum",key:"3"},
  ]);

  const addMove =(newMove) =>{
    move.key=Math.random().toString();
    setMove((currentMoves)=>{
        return[newMove,...currentMoves]
      
    });
    setModalOpen(false);
  }
  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType='slide'>
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
const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
});