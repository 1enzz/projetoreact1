import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import BtnVoltar from "../components/BtnVoltar";
import { useNavigation } from "@react-navigation/native";
import ClimUp from "../assets/ClimUp.png";
import Perfil from "../assets/perfil (2).png";

export const ColaboradorHome = ({ route }) => {
    const navigation = useNavigation();
    const { nomeColaborador, formularios, idColaborador } = route.params;

    const voltar = () => {
        navigation.goBack();
    };

    const vaiParaFormulario = async (idQuestionario) => {
        // Chama a API para buscar os dados do questionário
        try {
            const data = {
                idQuestionario,
                idColaborador
            };

            const response = await fetch('http://192.168.15.10:3000/api/buscarQuestionarioDetalhado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const dadosQuestionario = await response.json();

            if(dadosQuestionario[0].idCategoria == 2){
                navigation.navigate('respostaQuestionario2', {
                    questionario: dadosQuestionario[0], // Assume que a resposta é um array com um único objeto
                    idColaborador: idColaborador,
                    idCategoria: dadosQuestionario[0].idCategoria
                });
            }else{

                navigation.navigate('respostaQuestionario', {
                    questionario: dadosQuestionario[0], // Assume que a resposta é um array com um único objeto
                    idColaborador: idColaborador,
                    idCategoria: dadosQuestionario[0].idCategoria
                });
            }
        } catch (error) {
            console.error('Erro ao buscar questionário:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topo}>
                <Image style={styles.ClimUpImg} source={ClimUp}/>
                <View style={styles.divVoltar}>
                    <BtnVoltar style={styles.btnVoltar} onPress={voltar}></BtnVoltar>
                </View>
            </View>
            <View style={styles.corpo}>
                <View style={styles.divNome}>
                    <Image style={styles.perfil} source={Perfil} />
                    <Text style={{color:'black', padding:5}}> {nomeColaborador}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Formulários Disponíveis:</Text>
                </View>
                <View style={styles.formCard}>
                    {formularios.map((formulario) => (
                        <TouchableOpacity key={formulario.Id} style={styles.button} onPress={() => vaiParaFormulario(formulario.Id)}>
                            <Text style={styles.buttonText}>{formulario.Questionario}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        color: 'black',
    },
    button: {
        backgroundColor: '#457B9D',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        backgroundColor: 'white',
        padding: 10,
    },
    ClimUpImg: {
        width: 175, // Ajuste conforme necessário
        height: 50, // Ajuste conforme necessário
    },
    corpo: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: 'white',
        padding: 10,
    },
    divNome: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 5,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    perfil: {
        width: 15, // Ajuste conforme necessário
        height: 15, // Ajuste conforme necessário
        marginRight: 5,
    },
    nomeColaborador: {
        color: 'black',
    },
    formCard:{
        backgroundColor: 'transparent',
        borderTopColor:0,
        borderLeftColor:0,
        borderRightColor:0,
        borderWidth: 1,
        borderColor: "#cde4f9",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }
});

export default ColaboradorHome;
