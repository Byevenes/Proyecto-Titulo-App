import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    height: 60,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  textName: {
    fontSize: 18,
    textAlign: 'center',
  },
  textFecha: {
    fontSize: 15,
    textAlign: 'center',
    color: '#626FB4',
  },
  textIcon: {
    backgroundColor: '#5D4CF7',
  },
});

export default ({ name, fecha }) => {
  return (
    <View style={styles.container}>
      <Card.Title
        title={name}
        titleStyle={styles.textName}
        subtitle={fecha}
        subtitleStyle={styles.textFecha}
        left={(props) => (
          <MaterialCommunityIcons
            {...props}
            name='account-circle'
            size={30}
            color='#5D4CF7'
          />
        )}
      />
    </View>
  );
};
