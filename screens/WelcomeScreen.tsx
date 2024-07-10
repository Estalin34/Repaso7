import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { getAuth, signOut } from "firebase/auth";

export default function WelcomeScreen({ navigation }: any) {
  function cerrar() {
    const auth = getAuth();
    signOut(auth).then(() => {
      Alert.alert("Hasta luego :)");
      navigation.navigate("Login");
    }).catch((error) => {
      Alert.alert("Error al cerrar sesión", error.message);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido</Text>
      <Button title='Cerrar Sesión' onPress={cerrar} color="#841584"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
