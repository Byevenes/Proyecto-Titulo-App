import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import useFetch from '../../hooks/useFetch';

const CrearPuntoProfileScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Crear Punto Profile Screen</Text>
      <Button title='Click Here' onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default CrearPuntoProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
