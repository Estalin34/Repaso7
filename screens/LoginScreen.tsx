import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Config";

export default function LoginScreen({ navigation }: any) {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function login() {
    if (!correo || !contrasenia) {
      Alert.alert("Error", "Por favor, ingresa todos los campos.");
      return;
    }

    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Drawer");
        // Limpiar los campos después del inicio de sesión exitoso
        setCorreo("");
        setContrasenia("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let titulo = "";
        let mensaje = "";
        if (errorCode === "auth/wrong-password") {
          titulo = "Error de contraseña";
          mensaje = "La contraseña está incorrecta";
        } else if (errorCode === "auth/user-not-found") {
          titulo = "Error de usuario";
          mensaje = "El usuario no existe";
        } else {
          titulo = "Error de Acceso";
          mensaje = "Revisar credenciales";
        }
        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa tu correo electrónico"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType="email-address"
        value={correo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingresa contraseña"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
        value={contrasenia}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.registerText}>👉 Regístrate aquí 👈</Text>
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
  registerText: {
    color: "#6200ee",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
