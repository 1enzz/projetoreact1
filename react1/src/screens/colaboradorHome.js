import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, View, Image, Dimensions } from "react-native";
import BtnVoltar from "../components/BtnVoltar";
import { useNavigation } from "@react-navigation/native";
import ClimUp from "../assets/ClimUp.png";
import Perfil from "../assets/perfil (2).png";

export const ColaboradorHome = ({ route }) => {
    const navigation = useNavigation();
    const { nomeColaborador, formularios, idColaborador } = route.params;

    const getMaxButtonWidth = () => {
        let maxTextWidth = 0;
        formularios.forEach(formulario => {
            const textWidth = getTextWidth(formulario.Questionario);
            if (textWidth > maxTextWidth) {
                maxTextWidth = textWidth;
            }
        });
        return maxTextWidth + 40; // Adicionando um espaço extra para o layout
    };

    const getTextWidth = (text) => {
        // Implementação simples para obter uma estimativa da largura do texto
        const textLength = text.length;
        const fontSize = 16; // Tamanho do fonte, ajuste conforme necessário
        return textLength * fontSize * 0.6; // Fator de ajuste para estimativa
    };

    const voltar = () => {
        navigation.navigate('Home', { reload: true });
    };

    const vaiParaFormulario = async (idQuestionario) => {
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

            if (dadosQuestionario[0].idCategoria === 2) {
                navigation.navigate('respostaQuestionario2', {
                    questionario: dadosQuestionario[0],
                    idColaborador: idColaborador,
                    idCategoria: dadosQuestionario[0].idCategoria
                });
            } else {
                navigation.navigate('respostaQuestionario', {
                    questionario: dadosQuestionario[0],
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
                <Image style={styles.ClimUpImg} source={ClimUp} />
                <View style={styles.divVoltar}>
                    <BtnVoltar style={styles.btnVoltar} onPress={voltar}></BtnVoltar>
                </View>
            </View>
            <View style={styles.corpo}>
                <View style={styles.divNome}>
                    <Image style={styles.perfil} source={Perfil} />
                    <Text style={{ color: 'black', padding: 5 }}> {nomeColaborador}</Text>
                </View>
                <View>
                    <Text style={styles.subtitle}>Formulários Disponíveis:</Text>
                </View>
                <View style={styles.formCard}>
                    {formularios.map((formulario) => (
                        <TouchableOpacity
                            key={formulario.Id}
                            style={[styles.button, { width: getMaxButtonWidth() }]}
                            onPress={() => vaiParaFormulario(formulario.Id)}
                        >
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
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
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
        width: 175,
        height: 50,
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
        width: 15,
        height: 15,
        marginRight: 5,
    },
    nomeColaborador: {
        color: 'black',
    },
    formCard: {
        backgroundColor: 'transparent',


        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    }
});

export default ColaboradorHome;
