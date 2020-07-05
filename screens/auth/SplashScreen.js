import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
      <View style={styles.container}>
        <ActivityIndicator color={'black'} />
        <Text style={styles.text}>Cargando...</Text>
      </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    textAlign: 'center',
  }
});
