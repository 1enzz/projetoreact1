
import {  Image,StyleSheet,View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import ClimUp from "../assets/ClimUp.png";
import logo from "../assets/logo.png";
import React, {useEffect, useState} from "react";
import {useNavigation} from '@react-navigation/native'
import BtnVoltar from "../components/BtnVoltar";


export const Login = () =>{
    const navigation = useNavigation();


    const voltar = () =>{
        navigation.goBack();
    }
    return(
        <SafeAreaView style={styles.container}>
            <BtnVoltar style={styles.voltar} onPress={voltar}></BtnVoltar>
            <View style={styles.imgs}>
                <Image style={styles.ClimUpImg} source={ClimUp}/>
                <Image style={styles.logoImg} source={logo}/>
            </View>

            <View style={styles.btns}>
                <TouchableOpacity style={styles.btnLogCol} onPress={() => navigation.navigate('loginColaborador')} >
                    <Text style={{ color:"white", fontWeight:"bold"}}>Entrar como Colaborador</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogEmp} onPress={() => navigation.navigate('loginEmpresa')}>
                    <Text style={{ color:"white", fontWeight:"bold"}}>Entrar como Empresa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

       
    );
}



//styles onde define a estilizacao dos elementos
//precisa ser importado do react natvie primeiro
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center"
    },
    ClimUpImg:{
        marginLeft:45,
        marginBottom: 100
    },

    btns:{
        marginTop: 150,
        
        
    },
    imgs:{
        marginTop: 100
    },
    textButtons:{
        color: "#fff"
    },
    btnLogCol:{
        
        alignItems:"center",
        paddingLeft: 55,
        paddingRight: 55,
        paddingBottom: 10,
        paddingTop: 10,
        margin:10,
        backgroundColor: '#457B9D',
        borderRadius: 10
    },
    btnLogEmp:{
        alignItems: "center",
        paddingLeft: 55,
        paddingRight: 55,
        paddingBottom: 10,
        paddingTop: 10,
        margin:10,
        backgroundColor: '#457B9D',
        borderRadius: 10
    },

})
