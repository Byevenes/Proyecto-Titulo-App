import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import SplashScreen from '../auth/SplashScreen'

const ComentariosDetailsRecorrido = ({ route, navigation }) => {
  const { idComentario } = route.params;
  return (
    <View style={styles.container}>
      <Text>Notification Screen {idComentario}</Text>
      <Button title='Details' onPress={() => navigation.navigate('Recorrido')} />
    </View>
  );
};

export default ComentariosDetailsRecorrido;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
