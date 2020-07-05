import React, { useState, useEffect, Fragment } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ListItemRecorrido from '../../components/Recorrido/ListItemRecorrido';
import SplashScreen from '../auth/SplashScreen';

import { BASE_URL } from '../../config';

const RecorridoScreen = ({ navigation }) => {
  const [recorridos, setRecorridos] = useState([]);
  const [recorridosCargado, setRecorridosCargado] = useState(true);

  useEffect(() => {
    fetchRecorridos();
  }, []);

  const fetchRecorridos = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/api/recorrido`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setRecorridos(data.recorridos);
    setRecorridosCargado(false);
  };


  return (
    <View style={styles.container}>
      {recorridosCargado ? (
        <SplashScreen />
      ) : (
        <FlatList
          style={styles.list}
          data={recorridos}
          keyExtractor={(x) => x._id}
          renderItem={({ item }) => (
            <ListItemRecorrido
              estado={
                item.estado_recorrido === true ? (
                  <Fragment>
                    <MaterialCommunityIcons
                      name='circle'
                      size={24}
                      color='#6eeb85'
                    />
                    {'               '}
                    <Text style={styles.text}>Tramo Operativo</Text>
                  </Fragment>
                ) : (
                  <Fragment>
                    <MaterialCommunityIcons
                      name='circle'
                      size={24}
                      color='#ff4747'
                    />
                    {'               '}
                    <Text style={styles.text}>Tramo No Operativo</Text>
                  </Fragment>
                )
              }
              name={item.name_recorrido}
              name_poblacion={item.poblacion.name_poblacion}
              onPressDetails={() =>
                navigation.navigate('Detalle', {
                  id: item._id,
                  name: item.name_recorrido,
                  name_poblacion: item.poblacion.name_poblacion,
                  descripcion: item.descripcion_recorrido,
                  fecha_inicio: item.date_recorrido_iniciado,
                  fecha_finalizo: item.date_recorrido_finalizado,
                })
              }
              onPressComments={() =>
                navigation.navigate('Comentarios', {
                  id: item._id,
                })
              }
            />
          )}
        />
      )}
    </View>
  );
};

export default RecorridoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5D3FB',
  },
  list: {
    alignSelf: 'stretch',
  },
  text: {
    textAlign: 'center',
  },
});
