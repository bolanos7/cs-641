import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import {SafeAreaView,StyleSheet,Text,View} from 'react-native'

const App = () => {
  return (
    <SafeAreaView>
      <Stack.Navigator>
        <Stack.Screen name = "Home" component ={HomeScreen}/>
      </Stack.Navigator>
    </SafeAreaView>
  )
}

export default App