import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const DetailsRecorridoScreen = ({ route, navigation }) => {
  const {
    id,
    name,
    name_poblacion,
    descripcion,
    fecha_inicio,
    fecha_finalizo,
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageDetalleRecorrido}>
        <Image
          style={styles.imageDetalleRecorrido}
          source={require("../../assets/imgRecorrido.png")}
        />
      </View>
      <View style={styles.viewName}>
        <Text style={styles.textName}>{name}</Text>
        <Text
          style={styles.textPoblacion}
        >{`Población: ${name_poblacion}`}</Text>
      </View>
      <View style={styles.viewDescripcion}>
        <Text>{descripcion}</Text>
      </View>
      <View style={styles.viewFechas}>
        <Text
          style={styles.textFecha}
        >{`Inicio de Recorrido: ${fecha_inicio}`}</Text>
        <Text
          style={styles.textFecha}
        >{`Fin de Recorrido: ${fecha_finalizo}`}</Text>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.buttonGoBack]}
        >
          <Text style={[styles.textbuttonGoBack]}>Volver Atras</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsRecorridoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageDetalleRecorrido: {
    width: 200,
    height: 200,
    paddingTop: 25,
  },
  viewName: {
    flex: 1,
    paddingTop: 50,
  },
  viewDescripcion: {
    flex: 1,
  },
  viewFechas: {
    flex: 2,
  },
  textName: {
    fontSize: 16,
    textAlign: "center",
    paddingBottom: 20,
  },
  textPoblacion: {
    fontSize: 14,
    textAlign: "center",
    paddingBottom: 20,
  },
  textFecha: {
    fontSize: 13,
    color: "#626FB4",
    textAlign: "center",
  },
  button: {
    flex: 1,
    paddingBottom: 20,
  },
  buttonGoBack: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#5D4CF7",
    borderWidth: 1,
    paddingHorizontal: 60,
  },
  textbuttonGoBack: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
  },
});
