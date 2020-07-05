import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  textName: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
  },
  textFecha: {
    fontSize: 13,
    color: '#626FB4',
    textAlign: 'center',
    flex: 1,
  },
  textIcon: {
    color: '#5D4CF7',
  },
  Icon:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLeft: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

export default ({ name, name_user, fecha, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Card.Title
        title={name}
        titleStyle={styles.textName}
        subtitle={fecha}
        subtitleStyle={styles.textFecha}
        left={(props) => (
          <View style={styles.Icon}>
            <MaterialCommunityIcons
              {...props}
              name='account-circle'
              size={30}
              color='#5D4CF7'
            />
            <Text style={styles.textIcon}>{name_user}</Text>
          </View>
        )}
        leftStyle={styles.textLeft}
      />
    </TouchableOpacity>
  );
};
