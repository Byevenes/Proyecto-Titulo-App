import React, { useEffect, useState, Fragment } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListItemComentariosRecorrido from '../../components/Recorrido/ListItemComentariosRecorrido';
import SplashScreen from '../auth/SplashScreen';

import { BASE_URL } from '../../config';

const ComentariosRecorrido = ({ route, navigation }) => {
  const { id } = route.params;

  const [comentariosRecorrido, setComentariosRecorrido] = useState([]);
  const [
    comentariosRecorridoCargado,
    setComentariosRecorridoCargado,
  ] = useState(true);

  const [usuario, setUsuario] = useState('');
  const [usuarioCargado, setUsuarioCargado] = useState(true);

  useEffect(() => {
    if (route.params.data) {
      AsyncStorage.getItem('userToken').then((x) => {
        fetch(`${BASE_URL}/api/comentario`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
            token: x,
          },
          body: JSON.stringify(route.params.data),
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
              return Alert.alert('Comentario Añadido');
            }
            return Alert.alert('No se pudo Añadir el Comentario');
          });
      });
    }
    fetchComentariosRecorrido();
    fetchIdUser();
  }, [route.params.data]);

  const fetchIdUser = async () => {
    const idUser = await AsyncStorage.getItem('userID');
    setUsuario(idUser);
    setUsuarioCargado(false);
  };

  const fetchComentariosRecorrido = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    const response = await fetch(
      `${BASE_URL}/api/comentario/comentariorecorridoid/${id}`,
      {
        headers: {
          token: Token,
        },
      }
    );
    const data = await response.json();
    setComentariosRecorrido(data.comentario);
    setComentariosRecorridoCargado(false);
  };

  return (
    <View style={styles.container}>
      {comentariosRecorridoCargado || usuarioCargado ? (
        <SplashScreen />
      ) : (
        <Fragment>
          <FlatList
            style={styles.list}
            data={comentariosRecorrido}
            keyExtractor={(x) => x._id}
            renderItem={({ item }) => (
              <ListItemComentariosRecorrido
                name={item.description_comentario}
                name_user={item.creator.nombre}
                fecha={item.date_comentario}
                onPress={() => navigation.navigate('ComentariosDetails', {
                  idComentario: item._id,
                })}
              />
            )}
          />
          <View style={styles.button}>
            <MaterialCommunityIcons
              name='comment-plus-outline'
              size={40}
              color='black'
              onPress={() =>
                navigation.navigate('Crear Comentario', {
                  idRecorrido: id,
                  idUser: usuario,
                })
              }
            />
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default ComentariosRecorrido;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    alignSelf: 'stretch',
    flex: 8,
    paddingBottom: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
