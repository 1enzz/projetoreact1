
import { SafeAreaView, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from"@react-navigation/native"
import Stack from './Stack';



export default function App() {
  return (
    <View style={{flex:1}}>
      {/*este container de navegacao é o q gerencia a navegacao entre as telas
      **ele é importado pela bibliotaeca do react navigation */}
      <NavigationContainer>
        {/*invoke do componente de navegacao dentro do container de navegacao */}
        <Stack/>
      </NavigationContainer>
    </View>
  );
}
