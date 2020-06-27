import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const NotificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Notification Screen</Text>
      <Button title='Details' onPress={() => navigation.navigate('Details')} />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
