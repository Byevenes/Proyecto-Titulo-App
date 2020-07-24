import React, { useEffect, useState, Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import SplashScreen from "../auth/SplashScreen";

import { BASE_URL } from "../../config";

const ComentariosDetailsProfileScreen = ({ route, navigation }) => {
  const { idComentario } = route.params;

  const [comentariosDetailsProfile, setcomentariosDetailsProfile] = useState(
    []
  );
  const [
    comentariosDetailsProfileCargado,
    setcomentariosDetailsProfileCargado,
  ] = useState(true);

  useEffect(() => {
    fetchComentariosProfile();
  }, []);

  const fetchComentariosProfile = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(
      `${BASE_URL}/api/comentario/comentarioid/${idComentario}`,
      {
        headers: {
          token: Token,
        },
      }
    );
    const data = await response.json();
    setcomentariosDetailsProfile(data.comentario);
    setcomentariosDetailsProfileCargado(false);
  };

  return (
    <View style={styles.container}>
      {comentariosDetailsProfileCargado ? (
        <SplashScreen />
      ) : (
        <Fragment>
          <View style={styles.imageComentario}>
            <Image
              style={styles.imageComentario}
              source={require("../../assets/imgComentarioRecorrido.png")}
            />
          </View>
          <View style={styles.viewName}>
            <Text style={styles.textName}>
              {comentariosDetailsProfile.description_comentario}
            </Text>
            <Text style={styles.textFecha}>
              {comentariosDetailsProfile.date_comentario}
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

export default ComentariosDetailsProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageComentario: {
    width: 200,
    height: 200,
    paddingTop: 50,
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
