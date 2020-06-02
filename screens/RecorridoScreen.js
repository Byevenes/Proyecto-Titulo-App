import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const RecorridoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Recorrido Screen</Text>
      <Button title='Click Here' onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default RecorridoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
