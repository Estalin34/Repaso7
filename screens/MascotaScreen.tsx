import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { ref, remove, set, onValue } from "firebase/database";
import { db } from '../config/Config';

export default function MascotaScreen() {
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [edad, setEdad] = useState("");

    function GuardarData() {
        set(ref(db, 'mascotas/' + id), {
            name: nombre,
            especie: especie,
            edad: edad
        }).then(() => {
            Alert.alert("Mascota guardada correctamente");
        }).catch((error) => {
            Alert.alert("Error al guardar mascota", error.message);
        });
    }

    function leerMascota() {
        const starCountRef = ref(db, 'mascotas/' + id);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setNombre(data.name);
                setEspecie(data.especie);
                setEdad(data.edad);
            } else {
                Alert.alert("Mascota no encontrada");
            }
        }, {
            onlyOnce: true
        });
    }

    function editar() {
        set(ref(db, 'mascotas/' + id), {
            name: nombre,
            especie: especie,
            edad: edad
        }).then(() => {
            Alert.alert("Mascota actualizada correctamente");
        }).catch((error) => {
            Alert.alert("Error al actualizar mascota", error.message);
        });
    }

    function eliminar() {
        remove(ref(db, 'mascotas/' + id)).then(() => {
            Alert.alert("Mascota eliminada correctamente");
        }).catch((error) => {
            Alert.alert("Error al eliminar mascota", error.message);
        });
    }

    return (
        <View style={styles.container}>
            {/*------------------ GUARDAR -------------------------- */}
            <View style={styles.section}>
                <Text style={styles.titles}>GUARDAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.input}
                    onChangeText={(texto) => setId(texto)}
                />
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.input}
                    onChangeText={(texto) => setNombre(texto)}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.input}
                    onChangeText={(texto) => setEspecie(texto)}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.input}
                    onChangeText={(texto) => setEdad(texto)}
                />
                <Button title='Guardar' onPress={GuardarData} color="#841584" />
            </View>

            <View style={styles.separator} />

            {/*------------------ EDITAR-------------------------- */}
            <View style={styles.section}>
                <Text style={styles.titles}>EDITAR</Text>
                <View style={styles.row}>
                    <TextInput
                        placeholder='Ingresar id'
                        style={[styles.input, { width: '75%' }]}
                        onChangeText={(texto) => setId(texto)}
                    />
                    <Button title='Buscar' onPress={leerMascota} color='#299979' />
                </View>
                <TextInput
                    placeholder='Ingresar nombre'
                    style={styles.input}
                    onChangeText={(texto) => setNombre(texto)}
                    value={nombre}
                />
                <TextInput
                    placeholder='Ingresar especie'
                    style={styles.input}
                    onChangeText={(texto) => setEspecie(texto)}
                    value={especie}
                />
                <TextInput
                    placeholder='Ingresar edad'
                    style={styles.input}
                    onChangeText={(texto) => setEdad(texto)}
                    value={edad}
                />
                <Button title='Editar' onPress={editar} color='green' />
            </View>

            <View style={styles.separator} />

            {/*------------------ ELIMINAR------------------------- */}
            <View style={styles.section}>
                <Text style={styles.titles}>ELIMINAR</Text>
                <TextInput
                    placeholder='Ingresar id'
                    style={styles.input}
                    onChangeText={(texto) => setId(texto)}
                />
                <Button title='Eliminar' onPress={eliminar} color='red' />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#ccc',
        marginVertical: 20,
    },
    titles: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    section: {
        backgroundColor: '#e0f7fa',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
    }
});
