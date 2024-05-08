import { SafeAreaView, Text, StyleSheet } from "react-native"
import React from "react";
import BtnVoltar from "../components/BtnVoltar";
import { useNavigation } from "@react-navigation/native";


export const EmpresaHome = ({route}) =>{
    const navigation = useNavigation();
    const{nomeEmpresa, id} = route.params;

    const voltar = () =>{
        navigation.goBack();
    }
    return(
    <SafeAreaView style={styles.container}>
        <BtnVoltar  onPress={voltar}></BtnVoltar>
        <Text>Area Admnistrativa: {nomeEmpresa}</Text>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center"
    }
})