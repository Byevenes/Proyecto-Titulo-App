import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ListItemPuntoChofer from '../../components/Profile/PuntoChofer/ListItemPuntoChofer';
import { BASE_URL } from '../../config';

const PuntosChoferProfileScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [puntoChofer, setPuntoChofer] = useState([]);
  const [puntoChoferCargado, setPuntoChoferCargado] = useState(true);

  useEffect(() => {
    fetchPuntoChofer();
  }, []);

  const fetchPuntoChofer = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/api/puntochofer`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setPuntoChofer(data.puntoChoferes);
    setPuntoChoferCargado(false);
  };

  return (
    <View style={styles.container}>
      {puntoChoferCargado ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={puntoChofer}
          keyExtractor={(x) => x._id}
          renderItem={({ item }) => (
            <ListItemPuntoChofer
              name={item.chofer.nombre}
              email={item.chofer.email}
              fecha={item.date_chofer}
            />
          )}
        />
      )}
    </View>
  );
};

export default PuntosChoferProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  list: {
    alignSelf: 'stretch',
  },
});
