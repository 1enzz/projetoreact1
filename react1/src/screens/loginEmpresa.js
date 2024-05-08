import { Text, View, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import BtnVoltar from "../components/BtnVoltar"
import {useNavigation} from '@react-navigation/native'
import { useState } from "react";

export const LoginEmpresa = () =>{
    const navigation = useNavigation();

    const[cnpjEmpresa, setCnpjEmpresa] = useState('');
    const[senhaEmpresa, setSenhaEmpresa] = useState('');

    const atualizaCnpj = (txtcnpj) =>{
        setCnpjEmpresa(txtcnpj)
    }
    const atualizaSenha = (txtsenha) =>{
        setSenhaEmpresa(txtsenha);
    }
    const voltar = () =>{
        navigation.goBack();
    }

    
    const login = async () =>{
        if(cnpjEmpresa === "" | cnpjEmpresa === null){
            Alert.alert("Insira o Cnpj")
        }else if(cnpjEmpresa.length !== 14){
            Alert.alert("Insira um cnpj válido")
        }else if(senhaEmpresa === "" | senhaEmpresa === null){
            Alert.alert("Insira a senha")
        }else{
            try{
                const data = {
                    cnpjEmpresa : cnpjEmpresa,
                    senhaEmpresa: senhaEmpresa
                };
                

                const respostaApi = await fetch('http://172.20.14.23:3000/api/loginEmpresa',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(data)
                });

                if(respostaApi.ok){
                    const dadosResposta = await respostaApi.json();
                    setCnpjEmpresa('');
                    setSenhaEmpresa('');
                    Alert.alert("Bem vindo!");
                    navigation.navigate('empresaHome', {nomeEmpresa: dadosResposta.nmEmpresa, id: dadosResposta.id})
                }else{
                    console.log(respostaApi.status)
                    Alert.alert("Erro de login, tente novamente")
                }
            }catch(err){
                Alert.alert("Erro de conexao, tente novamente")
               console.log()
            }
        }
    }
    return(
        <SafeAreaView style={styles.container}>
            <BtnVoltar onPress={voltar}></BtnVoltar>
            <View style={styles.vTxtLogEmp}>
                <Text style={styles.txtLogEmp}>Bem vindo de volta, Gestor!</Text>
            </View>
            <View style={styles.txtInfosLogin}>
                <TextInput style={styles.txts} 
                placeholder="CNPJ"
                value={cnpjEmpresa}
                maxLength={14}
                onChangeText={atualizaCnpj}></TextInput>
                <TextInput style={styles.txts} 
                placeholder="Senha"
                value={senhaEmpresa}
                secureTextEntry={true}
                onChangeText={atualizaSenha}></TextInput>
            </View>
            <View style={styles.btn}>
                <TouchableOpacity style={styles.btnLogin} onPress={login}>
                    <Text style={styles.txtBtnLogin}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center"
    },
    txtLogEmp:{
        fontSize:25,
        fontWeight: "bold"
    },
    vTxtLogEmp:{
        marginTop: 70
    },
    txtInfosLogin:{
        alignItems:"center",
        width: "100%",
        marginTop: 200
     
    },
    txts:{
        width: '80%',
        borderWidth: 2,
        borderColor: '#9797A0',
        borderStyle:"solid",
        padding: 10,
        marginTop: 0,
        borderRadius:15,
        marginBottom: 15,
        height: "19%"
    },
    btn:{
        alignItems:"center",
        width: "100%",
        marginBottom:100
    },
    btnLogin:{
        width: "80%",
        alignItems:"center",
        paddingLeft: 55,
        paddingRight: 55,
        paddingBottom: 10,
        paddingTop: 10,
        margin:10,
        backgroundColor: '#457B9D',
        borderRadius: 10
    },
    txtBtnLogin:{
        fontWeight:"bold",
        color:"white"
    }
})