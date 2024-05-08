import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import { Home } from "../screens/index";
import { CadEmpresa } from "../screens/cadEmpresa";
import { Login } from "../screens/login";
import { LoginEmpresa } from "../screens/loginEmpresa";
import { EmpresaHome } from "../screens/empresaHome";
import { LoginColaborador } from "../screens/loginColaborador";
import { ColaboradorHome } from "../screens/colaboradorHome";
//criacao do componente de navagecao
const Stack = createStackNavigator();

export default props => (
    //definicao q a tela iniciao vai ser o q for importado de home
    <Stack.Navigator initialRouteName="Home"
        screenOptions={{headerShown: false}}>
            {/*aq  "crio" a tela home na pilha  */}
        <Stack.Screen 
        name="Home" 
        component={Home}
        options={{title:"Tela inical"}} />
        {/* criacao tela cadempresa na pilha*/}
        <Stack.Screen name="CadEmpresa" component={CadEmpresa}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="loginEmpresa" component={LoginEmpresa}/>
        <Stack.Screen name="empresaHome" component={EmpresaHome} />
        <Stack.Screen name="loginColaborador" component={LoginColaborador}/>
        <Stack.Screen name="colaboradorHome" component={ColaboradorHome}/>
    </Stack.Navigator>  
)