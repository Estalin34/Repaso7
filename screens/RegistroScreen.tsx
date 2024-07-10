import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function RegistroScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigation.navigate("Login");
            Alert.alert("Registro exitoso", "¡Te has registrado correctamente!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("Error en el registro", errorMessage);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>REGISTRO</Text>
            <TextInput
                style={styles.input}
                placeholder='Ingresa tu correo electrónico'
                onChangeText={(texto) => setCorreo(texto)}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                placeholder='Ingresa contraseña'
                onChangeText={(texto) => setContrasenia(texto)}
                secureTextEntry={true}
            />
            <Button title='Ingresar' onPress={registro} color="#841584"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});
