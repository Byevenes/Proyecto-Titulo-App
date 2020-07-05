import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsRecorridoScreen = ({ route, navigation }) => {
  const { id, name, name_poblacion ,descripcion, fecha_inicio, fecha_finalizo } = route.params;

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{name_poblacion}</Text>
      <Text>{descripcion}</Text>
      <Text>{fecha_inicio}</Text>
      <Text>{fecha_finalizo}</Text>
      <Button title='Click Here' onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default DetailsRecorridoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopStartRadius: 75,
    borderTopEndRadius: 75,
    marginVertical: 20,
  },
});
