import React, { useEffect, useState, Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItemPuntoChofer from "../../components/Profile/PuntoChofer/ListItemPuntoChoferDetails";
import SplashScreen from "../auth/SplashScreen";

import { BASE_URL } from "../../config";

const PuntosChoferDetailsProfileScreen = ({ route, navigation }) => {
  const { idPuntoChofer, nombre, email } = route.params;

  const [puntoChofer, setPuntoChofer] = useState([]);
  const [puntoChoferCargado, setPuntoChoferCargado] = useState(true);

  useEffect(() => {
    fetchPuntoChofer();
  }, []);

  const fetchPuntoChofer = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(
      `${BASE_URL}/api/puntochofer/puntochoferid/${idPuntoChofer}`,
      {
        headers: {
          token: Token,
        },
      }
    );
    const data = await response.json();
    setPuntoChofer(data.puntoChofer);
    setPuntoChoferCargado(false);
  };

  return (
    <View style={styles.container}>
      {puntoChoferCargado ? (
        <SplashScreen />
      ) : (
        <Fragment>
          <View style={styles.viewName}>
            <ListItemPuntoChofer
              name={nombre}
              email={email}
              fecha={puntoChofer.date_chofer}
              latitude={puntoChofer.location.coordinates.latitude}
              longitude={puntoChofer.location.coordinates.longitude}
            />
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.buttonGoBack]}
            >
              <Text style={[styles.textbuttonGoBack]}>Volver Atras</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Puntos Chofer", { idPuntoChofer })
              }
              style={[styles.buttonDelete]}
            >
              <Text style={[styles.textbuttonGoBack]}>Borrar Punto Chofer</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default PuntosChoferDetailsProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewName: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textName: {
    fontSize: 16,
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
    paddingTop: 10,
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
  buttonDelete: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 30,
    backgroundColor: "red",
    borderWidth: 1,
    paddingHorizontal: 60,
  },
  textbuttonGoBack: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
  },
});
