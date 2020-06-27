import React, { useState, useEffect, Fragment } from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import useForm from '../../hooks/useForm';
import { BASE_URL } from '../../config';

const CrearComentarioScreen = ({ route, navigation }) => {
  const { idRecorrido, idUser } = route.params;

  const initialState = {
    description_comentario: '',
    recorrido: idRecorrido,
    creator: idUser,
  };

  const onSubmit = (data) => {
    /*
    AsyncStorage.getItem('userToken').then((x) => {
      fetch(`${BASE_URL}/api/comentario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          token: x,
        },
        body: JSON.stringify(data),
      })
        .then((x) => x.text())
        .then((x) => {
          try {
            return JSON.parse(x);
          } catch {
            throw x;
          }
        })
        .then((x) => {
          if (x.ok === true) {
            Alert.alert('Comentario Añadido');
            return navigation.navigate('Comentarios', data);
          }
          return Alert.alert('Error');
        });
    });*/
    navigation.navigate('Comentarios', { data: data });
  };

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <View style={styles.editData}>
        <Text style={styles.text}>Nombre</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Añadir Comentario...'}
          value={inputs.description_comentario}
          onChangeText={subscribe('description_comentario')}
        />
      </View>
      <View style={styles.profileSignOut}>
        <TouchableOpacity onPress={handleSubmit} style={[styles.signOut]}>
          <Text style={[styles.textSignOut]}>Guardar Comentario</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.signOut]}
        >
          <Text style={[styles.textSignOut]}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CrearComentarioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    backgroundColor: '#D5D3FB',
  },
  editData: {
    flex: 3,
    paddingTop: 50,
  },
  text: {
    paddingTop: 20,
    textAlign: 'center',
  },
  textInput: {
    width: 250,
    height: 100,
    borderRadius: 30,
    backgroundColor: '#ffff',
    borderWidth: 1,
    marginTop: 15,
    fontSize: 15,
    textAlign: 'center',
  },
  profileSignOut: {
    flex: 3,
  },
  signOut: {
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#5D4CF7',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 50,
  },
  textSignOut: {
    fontSize: 13,
    color: 'white',
  },
});
