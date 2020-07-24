import React, { useEffect, useState, Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import SplashScreen from "../auth/SplashScreen";

import { BASE_URL } from "../../config";

const DetailsNotificationScreen = ({ route, navigation }) => {
  const { idNotificacion } = route.params;

  const [notificacionesDetails, setNotificacionesDetails] = useState([]);
  const [
    notificacionesDetailsCargada,
    setNotificacionesDetailsCargada,
  ] = useState(true);

  useEffect(() => {
    fetchNotificacion();
  }, []);

  const fetchNotificacion = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(
      `${BASE_URL}/api/notificacion/${idNotificacion}`,
      {
        headers: {
          token: Token,
        },
      }
    );
    const data = await response.json();
    setNotificacionesDetails(data.notificacion);
    setNotificacionesDetailsCargada(false);
  };

  return (
    <View style={styles.container}>
      {notificacionesDetailsCargada ? (
        <SplashScreen />
      ) : (
        <Fragment>
          <View style={styles.imageDetalleRecorrido}>
            <Image
              style={styles.imageDetalleRecorrido}
              source={require("../../assets/imgRecorrido.png")}
            />
          </View>
          <View style={styles.viewName}>
            <Text style={styles.textName}>
              {notificacionesDetails.name_notificacion}
            </Text>
            <Text style={styles.textDescription}>
              {notificacionesDetails.description_notificacion}
            </Text>
            <Text style={styles.textFecha}>
              {notificacionesDetails.date_notificacion}
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.buttonGoBack]}
            >
              <Text style={[styles.textbuttonGoBack]}>Volver Atras</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default DetailsNotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  imageDetalleRecorrido: {
    width: 200,
    height: 200,
    paddingTop: 25,
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
  textDescription: {
    fontSize: 14,
    paddingBottom: 20,
    textAlign: "left",
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
  text: {
    textAlign: "center",
  },
});
