import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions = {{
          headerShown: false,
          tabBarStyle: {backgroundColor: "#40C032",
            borderRadius: 15,
            position: 'absolute'
          },
          tabBarActiveTintColor: "#000000",
          tabBarInactiveTintColor:'#000000'
        }}
        
      >
        <Tab.Screen name ="Home" component={HomeScreen} />
        <Tab.Screen name ="Settings" component={SettnigScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}



function SettnigScreen(){
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23353A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
