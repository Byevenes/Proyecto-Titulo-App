import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
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
    paddingTop: 5,
  },
  textFecha: {
    fontSize: 15,
    textAlign: 'center',
    color: '#626FB4',
    flex: 1,
  },
  textIcon: {
    color: '#5D4CF7',
  },
  textLeft: {
    flex: 1,
  },
});

export default ({ name, name_user, fecha }) => {
  return (
    <View style={styles.container}>
      <Card.Title
        title={name}
        titleStyle={styles.textName}
        subtitle={fecha}
        subtitleStyle={styles.textFecha}
        left={(props) => (
          <View style={styles.textLeft}>
            <MaterialCommunityIcons
              {...props}
              name='account-circle'
              size={30}
              color='#5D4CF7'
            />
            <Text style={styles.textIcon}>{name_user}</Text>
          </View>
        )}
      />
    </View>
  );
};
