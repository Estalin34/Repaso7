import React, { useState } from "react";
import {StyleSheet,Text,View,TextInput,Button,Alert,TouchableOpacity,} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function RegistroScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function registrar() {
    if (!correo || !contrasenia) {
      Alert.alert("Error", "Por favor, ingresa todos los campos.");
      return;
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        Alert.alert("Registro exitoso", "Usuario registrado correctamente");
        navigation.navigate("Login");
        // Limpiar los campos después del registro exitoso
        setCorreo("");
        setContrasenia("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let titulo = "";
        let mensaje = "";
        if (errorCode === "auth/email-already-in-use") {
          titulo = "Error de registro";
          mensaje = "El correo electrónico ya está en uso";
        } else if (errorCode === "auth/invalid-email") {
          titulo = "Error de registro";
          mensaje = "El correo electrónico no es válido";
        } else if (errorCode === "auth/weak-password") {
          titulo = "Error de registro";
          mensaje = "La contraseña es muy débil";
        } else {
          titulo = "Error de registro";
          mensaje = errorMessage;
        }
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo electrónico"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
        value={correo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa una contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
        value={contrasenia}
      />
      <TouchableOpacity style={styles.button} onPress={registrar}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>👉 Iniciar sesión 👈</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#6200ee",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#6200ee",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
