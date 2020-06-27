import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 18,
    textAlign: 'center',
  },
  textFecha: {
    fontSize: 15,
    color: '#626FB4',
    textAlign: 'center',
  },
  textEstado: {
    fontSize: 15,
    color: '#626FB4',
    textAlign: 'left',
    paddingLeft: 20,
  },
  textPoblacion: {
    fontSize: 15,
    color: '#626FB4',
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  recorridos: {
    textAlign: 'center',
  },
});

export default ({
  estado,
  name,
  name_poblacion,
  onPressComments,
  onPressDetails,
}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.textEstado}>{estado}</Text>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textPoblacion}>
          {'Población: '}
          {name_poblacion}
        </Text>
        <View style={styles.button}>
          <MaterialCommunityIcons
            name='information'
            size={30}
            color='#5D4CF7'
            onPress={onPressDetails}
          />
          <Text>Información</Text>
          <MaterialCommunityIcons
            name='comment-text-multiple'
            size={30}
            color='#5D4CF7'
            onPress={onPressComments}
          />
          <Text>Comentarios</Text>
        </View>
      </Card>
    </View>
  );
};
