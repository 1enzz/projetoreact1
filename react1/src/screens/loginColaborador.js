import { SafeAreaView, Text, StyleSheet, View, TextInput, TouchableOpacity, Alert,  Modal } from "react-native"
import BtnVoltar from "../components/BtnVoltar"
import { useNavigation } from "@react-navigation/native"
import React, {useState} from "react"

let mail;
export const LoginColaborador = () =>{
    const navigation = useNavigation();


    const[emailColaborador, setEmailColaborador] = useState('');
    const[senhaColaborador, setSenhaColaborador] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [novaSenha, setNovaSenha] = useState('');
    
    const atualizaEmail = (txtEmail) =>{
        setEmailColaborador(txtEmail);
        mail =txtEmail;
    }
    const atualizaSenha = (txtSenha) =>{
        setSenhaColaborador(txtSenha);
    }


    const voltar =()=>{
        navigation.goBack();
    }

    const atualizaSenhaModal = (txtNovaSenha) =>{
        setNovaSenha(txtNovaSenha);
    }


    const alteraSenha = async () =>{
        

        if(novaSenha == "" ){
            Alert.alert("Insira a nova senha para alterar");
        }else{
            try{
                console.log(mail)
                const data = {
                    email: mail,
                    senhaColaboradorAtual: novaSenha
                }

                const resposta = await fetch('http://192.168.15.6:3000/api/alteraSenha',{
                    method: 'PUT',
                    headers:{
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                if(resposta.ok){
                    const dadosResposta = await resposta.json();
                    Alert.alert(
                        dadosResposta.message,
                        '',
                        [{ text: 'OK', onPress: () => setIsModalVisible(false) }]
                    );

                    
                }else{
                    const Resposta = await resposta.json();
                    Alert.alert(Resposta.message)
                }
            }catch(err){
                Alert.alert(err)
                console.log(err)
            }
        }
    }
    const login = async () =>{
        if(emailColaborador === "" || emailColaborador === null){
            Alert.alert("Insira o Email")
        }else if(senhaColaborador === "" || senhaColaborador === null){
            Alert.alert("Insira a senha")
        }else{
            try{
                mail = emailColaborador;
                const data = {
                    email: emailColaborador,
                    senhaColaborador: senhaColaborador
                }
                const respostaApi = await fetch('http://192.168.15.6:3000/api/loginColaborador',{
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify(data)
                });

                if (respostaApi.ok) {
                    const dadosResposta = await respostaApi.json();
                  
                     if(dadosResposta.resposta == '2'){
                        Alert.alert(
                            dadosResposta.message,
                            '',
                            [{ text: 'OK', onPress: () => setIsModalVisible(true) }]
                        );
                    }else{
                        const respostaString = dadosResposta.resposta;
                        const [nomeString, formulariosString] = respostaString.split('],[').map((str, index) => index === 0 ? str + ']' : '[' + str);
                        const nomeObj = JSON.parse(nomeString)[0];  // O [0] aqui é porque o nome está dentro de um array
                        const formulariosArray = JSON.parse(formulariosString);
                        
                        const nome = nomeObj.Nome;
                        const formularios = formulariosArray;
                        const idColaborador = nomeObj.IdColaborador;


                        Alert.alert(
                            dadosResposta.message,
                            '',
                            [{ text: 'OK', onPress: () => navigation.navigate('colaboradorHome', {nomeColaborador: nome, formularios: formularios, idColaborador: idColaborador}) }]
                        );
                    }

                    setEmailColaborador('');
                    setSenhaColaborador('');
                    
               
                 
                } else {
                    const dResposta = await respostaApi.json();
                    if(dResposta.resposta == '1'){
                        Alert.alert(dResposta.message);
                    }else if(dResposta.resposta == '3'){
                        Alert.alert(dResposta.message);
                    }
                }
            } catch (err) {
                console.log(err);
                Alert.alert("Erro de login, tente novamente");
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
            <Modal visible={isModalVisible} transparent={true} animationType="slide"onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Digite a nova senha"
                            value={novaSenha}
                            onChangeText={setNovaSenha}
                            secureTextEntry={true}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.btnalter} title="Enviar" onPress={alteraSenha}><Text style={{color:'white',fontWeight:"bold", }}>Alterar</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    btnalter:{
        width: "80%",
        alignItems:"center",
        paddingLeft: 55,
        paddingRight: 55,
        paddingBottom: 10,
        paddingTop: 10,
        margin:10,
        marginLeft: 25,
        backgroundColor: '#457B9D',
        borderRadius: 10
    }

});