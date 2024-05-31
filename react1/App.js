import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import { Home } from "./src/screens/index";
import { LoginColaborador } from "./src/screens/loginColaborador";
import { ColaboradorHome } from "./src/screens/colaboradorHome";
import { NavigationContainer } from '@react-navigation/native';
import  RespostaQuestionario from "./src/screens/respostaQuestionario";

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{headerShown: false}}>
                {/*aq  "crio" a tela home na pilha  */}
            <Stack.Screen 
            name="Home" 
            component={Home}
            options={{title:"Tela inical"}} />
            {/* criacao tela cadempresa na pilha*/}
            <Stack.Screen name="loginColaborador" component={LoginColaborador}/>
            <Stack.Screen name="colaboradorHome" component={ColaboradorHome}/>
            <Stack.Screen name="respostaQuestionario" component={RespostaQuestionario}/>
        </Stack.Navigator>  
    </NavigationContainer>

  );
}
