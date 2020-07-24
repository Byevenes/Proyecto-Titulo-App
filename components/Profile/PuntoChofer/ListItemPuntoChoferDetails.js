import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingTop: 20,
  },
  card: {
    width: "80%",
    flex: 1,
    flexDirection: "row",
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "25%",
  },
  textName: {
    fontSize: 18,
    textAlign: "center",
  },
  textFecha: {
    fontSize: 15,
    textAlign: "center",
    color: "#626FB4",
  },
});

export default ({ name, email, fecha, latitude, longitude, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Card style={styles.card}>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textFecha}>{email}</Text>
        <Text style={styles.textFecha}>{JSON.stringify(fecha)}</Text>
        <Text style={styles.textFecha}>{`Latitude: ${JSON.stringify(
          latitude
        )}`}</Text>
        <Text style={styles.textFecha}>{`Longitude: ${JSON.stringify(
          longitude
        )}`}</Text>
      </Card>
    </TouchableOpacity>
  );
};
