import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import BtnVoltar from "../components/BtnVoltar"
import {useNavigation} from "@react-navigation/native"



export const CadEmpresa = () =>{
    //instancia do usenavigation
    const navigation = useNavigation();
    
    //criacao das consts q vao usar o use state para poderem atualizar

    const[nomeEmpresa, setNomeEmpresa] = useState('');
    const[emailEmpresa, setEmailEmpresa] = useState('');
    const[contatoEmpresa, setContatoEmpresa] = useState('');
    const[senhaEmpresa, setSenhaEmpresa] = useState('');
    const[senhaConfirma, setSenhaConfirma] = useState('');
    const[cnpjEmpresa, setCnpjEmpresa] = useState('');
    //funcoes q vao atualizar os valores das variaveis
    const atualizaNome = (text) =>{
        setNomeEmpresa(text);
    }
    const atualizaEmail = (text) =>{
        setEmailEmpresa(text);
    }
    const atualizaContato = (text) =>{
        setContatoEmpresa(text);
    }
    const atualizaSenha = (text) =>{
        setSenhaEmpresa(text);
    }
    const atualizaSenhaConfirma = (text) =>{
        setSenhaConfirma(text);
    }

    const atualizaCnpj = (text) =>{
        setCnpjEmpresa(text);
    }


    //funcao q efetua o cadastro da aplicacao
    const cadastrar = async () =>{
        if(nomeEmpresa === ''  || emailEmpresa === '' || contatoEmpresa === '' || senhaEmpresa === '' || cnpjEmpresa ==='' ){
            Alert.alert("Preencha todos os campos antes de enviar")
        }else if(senhaEmpresa !== senhaConfirma){
            Alert.alert("As senhas diferem, por favor preencha novamente")
            setSenhaEmpresa('');
            setSenhaConfirma('');
        }
        else{
        //usando try para tentar fazer a requisiscao
            try{
                //criando objeto q ira armazenar os dados e posteriormente sera transformado em json para ser enviado no banco
                const data ={
                    nomeempresa: nomeEmpresa,
                    contatoempresa: contatoEmpresa,
                    emailempresa: emailEmpresa,
                    senhaempresa: senhaEmpresa,
                    cnpjempresa: cnpjEmpresa
                };

                //constante q recebe o resultado da funcao do fetch, q é responsavel por fazer as requisicoes http no servidor, no caso, localhost
                //o uso do await é para que a aplicacao espere pela resposta da requisicao feita no banco
                const respostaApi = await fetch('http://172.20.14.23:3000/api/empresa',{
                    //no method definimos o que vamos querer fazer no caminho empresa, no caso post, enviaremos dados
                    method: 'POST',
                    //no headers definimos o tipo do conteudo, no nosso caso mandaremos um json para a api
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    //aqui passsamos no corpo da requisicao o nosso objeto, fazndo a conversao dele para json
                    body: JSON.stringify(data)

                });
                // verifica se a api retornou sucesso se sim, retorna mensagem pro usuario e limpa os campos
                if(respostaApi.ok){
                    Alert.alert("Cadastrado com sucesso!");
                    setNomeEmpresa('');
                    setContatoEmpresa('');
                    setEmailEmpresa('');
                    setSenhaEmpresa('');
                    setSenhaConfirma('');
                    setCnpjEmpresa('');
                }else{
                    Alert.alert("Erro de cadastro, tente novamente")
                }

            }catch(error){
                Alert.alert("Erro de conexao, tente novamente")
               console.log(error)
            }
        }
    }

    //funcao feita para voltar a pagina mae no caso index.js (inicial)
    const voltar = () =>{
        navigation.goBack();
    }
    {/*sempre q tiver o return, é onde o jsx (html) vai ser montado e posteriormente retornado assim que a tela for chamada */}
    return(
        <SafeAreaView style={styles.container}> 
            {/*abaixo usams o elemento btnvoltar que criamos no components e que foi importado na secao de imports mais acima
            definimos que a funcao quando ele for pressionado seja a funcao criada acima chamada voltar*/}
            <BtnVoltar  onPress={voltar}></BtnVoltar>
            <View style={styles.lblCad}>
                <Text style={styles.lblCadTxt}>Cadastro de Empresa </Text>
            </View>
            <View style={styles.txtInfos}>
                <TextInput  style={styles.txts} 
                            placeholder="Nome da Empresa"
                            value={nomeEmpresa}
                            onChangeText={atualizaNome}
                ></TextInput>
                <TextInput style={styles.txts} 
                            placeholder="Email da Empresa"
                            value={emailEmpresa}
                            onChangeText={atualizaEmail}></TextInput>
                <TextInput  style={styles.txts} 
                            maxLength={11}
                            placeholder="Telefone"
                            value={contatoEmpresa.toString()}
                            onChangeText={atualizaContato}></TextInput>
                <TextInput  style={styles.txts}
                            secureTextEntry={true} 
                            placeholder="Senha"
                            value={senhaEmpresa}
                            onChangeText={atualizaSenha}></TextInput>
                <TextInput  style={styles.txts}
                            secureTextEntry={true} 
                            placeholder="Confirma Senha"
                            value={senhaConfirma}
                            onChangeText={atualizaSenhaConfirma}></TextInput>
                <TextInput  style={styles.txts}
                            maxLength={14}
                            placeholder="CNPJ"
                            value={cnpjEmpresa}
                            onChangeText={atualizaCnpj}></TextInput>
            </View>
            <View style={styles.btn}>
            <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrar} >
                    <Text style={styles.txtBtnCadastrar}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};


{/* abaixo secao styles, como se fosse o csss do html, mesmas propriedades */}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
    },
    lblCad:{
        marginTop: 5,
        alignItems: "center",
        marginBottom: 60
    },
    lblCadTxt:{
        fontSize: 25,
        fontWeight: "bold"
    },
    txtInfos:{
        alignItems:"center",
        width: "100%",
        marginBottom: 10
        
        
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
        height: 45
    },
    btn:{
        alignItems:"center",
        width: "100%",
        marginBottom: 100
    },
    btnCadastrar:{
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
    txtBtnCadastrar:{
        fontWeight:"bold",
        color:"white"
    }

})