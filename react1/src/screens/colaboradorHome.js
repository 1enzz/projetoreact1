import { SafeAreaView, Text, StyleSheet } from "react-native"
import React from "react";
import BtnVoltar from "../components/BtnVoltar";
import { useNavigation } from "@react-navigation/native";


export const ColaboradorHome = ({route}) =>{
    const navigation = useNavigation();
    const{nomeColaborador, id, nomeEmpresa} = route.params;

    const voltar = () =>{
        navigation.goBack();
    }
    return(
    <SafeAreaView style={styles.container}>
        <BtnVoltar  onPress={voltar}></BtnVoltar>
        <Text>Olá: {nomeColaborador}</Text>
        <Text>Empresa: {nomeEmpresa}</Text>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center"
    }
})