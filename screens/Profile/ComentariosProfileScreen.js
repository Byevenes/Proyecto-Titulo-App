import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import ListItemComentario from '../../components/Profile/Comentario/ListItemComentario';
import { BASE_URL } from '../../config';

const ComentarioProfileScreen = ({ route, navigation }) => {
  const { id } = route.params;

  const [comentario, setComentario] = useState([]);
  const [comentarioCargado, setComentarioCargado] = useState(true);

  useEffect(() => {
    fetchComentario();
  }, []);

  const fetchComentario = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${BASE_URL}/api/comentario/${id}`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setComentario(data.comentario);
    setComentarioCargado(false);
  };

  return (
    <View style={styles.container}>
      {comentarioCargado ? (
        <Text>Cargando...</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={comentario}
          keyExtractor={(x) => x._id}
          renderItem={({ item }) => (
            <ListItemComentario
              name={item.description_comentario}
              fecha={item.date_comentario}
            />
          )}
        />
      )}
    </View>
  );
};

export default ComentarioProfileScreen;

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
