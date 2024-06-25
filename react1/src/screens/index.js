//seção importações 
import {  Image,StyleSheet,View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native"
import ClimUp from "../assets/ClimUp.png";
import logo from "../assets/logo.png";
import React, {useEffect, useState} from "react";

import {useNavigation} from '@react-navigation/native'

//como se fosse o body do html, no return é onde manda para a tela todos os elementos criados
//precisa importar todos os elementos que usar do react native
export const Home = () => {
    
    //instancia funcao navegacao
    const navigation = useNavigation();
    return(
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Ajuste conforme necessário
    >
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
        <View style={styles.container}>
            <View style={styles.imgs}>
                <Image style={styles.ClimUpImg} source={ClimUp}/>
                <Image style={styles.logoImg} source={logo}/>
            </View>

            <View style={styles.btns}>
                <TouchableOpacity style={styles.btnLogCol} onPress={() => navigation.navigate('loginColaborador')} >
                    <Text style={{ color:"white", fontWeight:"bold"}}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
        alignItems:"center",
        width: "100%",
        marginTop: 150,
        
        
    },
    imgs:{
        marginTop: 100
    },
    textButtons:{
        color: "#fff"
    },
    btnLogCol:{
        width: "80%",
        alignItems:"center",
        paddingLeft: 55,
        paddingRight: 55,
        paddingBottom: 10,
        paddingTop: 10,
        margin:10,
        backgroundColor: '#457B9D',
        borderRadius: 10
    }
})
