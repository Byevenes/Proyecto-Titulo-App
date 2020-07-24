import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 20,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textName: {
    fontSize: 18,
    textAlign: "center",
  },
  textTipo: {
    fontSize: 15,
    color: "#626FB4",
    textAlign: "left",
    paddingLeft: 20,
  },
  textDescription: {
    fontSize: 14,
    color: "#626FB4",
    textAlign: "center",
  },
  textFecha: {
    fontSize: 13,
    color: "#626FB4",
    textAlign: "center",
  },
});

export default ({ tipo, name, descripcion, fecha, onPressDetails }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressDetails}>
      <Card style={styles.card}>
        <Text style={styles.textTipo}>{tipo}</Text>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textDescription}>{descripcion}</Text>
        <Text style={styles.textFecha}>{fecha}</Text>
      </Card>
    </TouchableOpacity>
  );
};
