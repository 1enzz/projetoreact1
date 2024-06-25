import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, TextInput, Button, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import BtnVoltar from '../components/BtnVoltar';

const RespostaQuestionario2 = ({ route, navigation }) => {
    const { questionario, idColaborador, idCategoria } = route.params;
    const [avaliados, setAvaliados] = useState([]);
    const [selectedAvaliador, setSelectedAvaliador] = useState(null);
    const [notas, setNotas] = useState({
        nota1: 0,
        nota2: 0,
        nota3: 0,
        nota4: 0,
        nota5: 0,
    });
    const [comentario, setComentario] = useState('');

    const voltar =()=>{
        navigation.goBack();
    }


    const handleSubmit = async () => {
        if (notas.nota1 > 0 && notas.nota2 > 0 && notas.nota3 > 0 && notas.nota4 > 0 && notas.nota5 > 0) {
            try {
                const response = await fetch('http://192.168.15.10:3000/api/enviarResposta', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idQuestionario: questionario.Id,
                        idColaboradorAvaliando: idColaborador,
                        idColaboradorAvaliado: selectedAvaliador,
                        notaPergunta1: notas.nota1,
                        notaPergunta2: notas.nota2,
                        notaPergunta3: notas.nota3,
                        notaPergunta4: notas.nota4,
                        notaPergunta5: notas.nota5,
                        comentario,
                        idCategoria
                    }),
                });
            
                if (response.ok) {
                    alert('Resposta enviada com sucesso');
                    navigation.goBack();
                } else {
                    alert('Erro ao enviar resposta');
                }
            } catch (error) {
                console.error('Erro ao enviar resposta:', error);
            }
        }else {
                Alert.alert('Por favor, selecione uma nota de 1 a 5 para todas as perguntas.');
        }
    };

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Ajuste conforme necessário
        >
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
            <BtnVoltar onPress={voltar}></BtnVoltar>
                <Text style={styles.title}>{questionario.NomeQuestionario}</Text>
                <View >
                   
                </View>
                {['Pergunta1', 'Pergunta2', 'Pergunta3', 'Pergunta4', 'Pergunta5'].map((pergunta, index) => (
                    <View key={index} style={styles.questionContainer}>
                        <Text style={styles.questionText}>{questionario[pergunta]}</Text>
                        <View style={styles.optionsContainer}>
                            {[1, 2, 3, 4, 5].map((nota) => (
                                <TouchableOpacity key={nota} onPress={() => setNotas({ ...notas, [`nota${index + 1}`]: nota })} style={notas[`nota${index + 1}`] === nota ? styles.selectedNota : styles.nota}>
                                    <Text>{nota}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
                <TextInput
                    style={styles.textInput}
                    placeholder="Comentário"
                    value={comentario}
                    onChangeText={setComentario}
                    multiline
                />
                <Button title="Enviar" onPress={handleSubmit} />
            </ScrollView>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#457B9D',
        marginBottom: 20,
        textAlign: 'center',
    },
    pickerContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#457B9D',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    picker: {
        height: 40,
        width: '100%',
    },
    pickerItem: {
        height: 40,
        color: 'black',
        fontSize: 16,
    },
    questionContainer: {
        marginBottom: 20,
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#457B9D',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nota: {
        fontSize: 18,
        padding: 10,
        borderWidth: 1,
        borderColor: '#457B9D',
        borderRadius: 5,
        textAlign: 'center',
        margin: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedNota: {
        fontSize: 18,
        padding: 10,
        borderWidth: 1,
        borderColor: '#457B9D',
        borderRadius: 5,
        textAlign: 'center',
        margin: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#457B9D',
        color: 'white',
    },
    textInput: {
        height: 100,
        borderColor: '#457B9D',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#457B9D',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RespostaQuestionario2;
