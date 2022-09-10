import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Moves from './screens/moves';
import MoveDetails from './screens/moveDetails';


function HomeScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen ficken</Text>
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
