import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
const MapaScreen = () => {
  return (
    <View style={styles.map}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -36.8335,
          longitude: -73.0487,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
      />
    </View>
  );
};

export default MapaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    display: 'flex',
  },
});
