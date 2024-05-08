import { SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from "react-native"
import BtnVoltar from "../components/BtnVoltar"
import { useNavigation } from "@react-navigation/native"
import React, {useState} from "react"
export const LoginColaborador = () =>{
    const navigation = useNavigation();


    const[emailColaborador, setEmailColaborador] = useState('');
    const[senhaColaborador, setSenhaColaborador] = useState('');

    const atualizaEmail = (txtEmail) =>{
        setEmailColaborador(txtEmail);
    }
    const atualizaSenha = (txtSenha) =>{
        setSenhaColaborador(txtSenha);
    }


    const voltar =()=>{
        navigation.goBack();
    }


    const login = async () =>{
        if(emailColaborador === "" || emailColaborador === null){
            Alert.alert("Insira o Email")
        }else if(senhaColaborador === "" || senhaColaborador === null){
            Alert.alert("Insira a senha")
        }else{
            try{
                const data = {
                    emailColaborador: emailColaborador,
                    senhaColaborador: senhaColaborador
                }

                const respostaApi = await fetch('http://172.20.14.23:3000/api/loginColaborador',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if(respostaApi.ok){
                    const dadosResposta = await respostaApi.json()
                    setEmailColaborador('')
                    setSenhaColaborador('')
                    Alert.alert("Bem vindo!")
                    navigation.navigate('colaboradorHome', {nomeColaborador: dadosResposta.nmColaborador, id: dadosResposta.id, nomeEmpresa: dadosResposta.nmEmpresa})

                }else{
                    console.log(respostaApi.status)
                    Alert.alert("Erro de login, tente novamente")
                }
            }catch(err){
                
                console.log(respostaApi.status)
                Alert.alert("Erro de login, tente novamente")

            }
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <BtnVoltar onPress={voltar}></BtnVoltar>
            <View style={styles.vTxtLogEmp}>
                <Text style={styles.txtLogEmp}>Bem vindo, Colaborador!</Text>
            </View>
            <View style={styles.txtInfosLogin}>
                <TextInput style={styles.txts} 
                placeholder="Email"
                value={emailColaborador}
                onChangeText={setEmailColaborador}
               ></TextInput>
                <TextInput style={styles.txts} 
                placeholder="Senha"
                value={senhaColaborador}
                onChangeText={setSenhaColaborador}
                secureTextEntry={true}
                ></TextInput>
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