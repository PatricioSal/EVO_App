import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
        <View style={styles.topBar}>
            <View style={styles.topIcons}>
                <Text style={styles.iconText}>🔥3</Text>
            </View>
      </View>

      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome back John Doe</Text>

        {/* Box for challenge */}
      <View style={styles.bigbox}>
            <Text style={styles.boxText}>Begin your Daily Challenge</Text>
            <TouchableOpacity style={styles.Button} 
            onPress={() => navigation.navigate('Challenge')}>
                <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23353A',
    padding: 20,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  topIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 30,
    textAlign:'center'
  },
    Button: {
    backgroundColor: '#1A661E',
    borderColor: '#023E05',
    borderWidth: 4,
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    width: 200
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  bigbox:{
    backgroundColor: '#1A661E',
    borderColor: '#023E05',
    borderWidth: 4,
    height:300,
    width:372,
    borderRadius:28,
    justifyContent: 'center',
    alignItems: 'center',
    padding:20
  },
  boxText:{
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 20,
    textAlign: 'center'
  },
});