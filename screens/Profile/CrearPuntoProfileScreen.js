import React, { useState, useEffect, Fragment } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as IntentLauncher from "expo-intent-launcher";

import useForm from "../../hooks/useForm";
import { TextInput } from "react-native-paper";

const CrearPuntoProfileScreen = ({ route, navigation }) => {
  const { idChofer } = route.params;

  const [location, setLocation] = useState(null);
  const [locationCargado, setLocationCargado] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Permisos para poder acceder a su localización denegados, Necesita dar permisos para poder ver el Mapa"
        );
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationCargado(false);
    })();
  }, []);

  const initialState = {
    chofer: idChofer,
    location: {
      coordinates: {
        latitude: "",
        longitude: "",
      },
    },
  };

  const onSubmit = (data) => {
    navigation.navigate("Puntos Chofer", { puntoChofer: data });
  };

  const openSetting = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
      );
    }
  };

  let text = "Cargando...";
  if (errorMsg) {
    text = errorMsg;
  }

  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      {locationCargado ? (
        <Fragment>
          <View>
            <Text>{text}</Text>
            <Button
              title="Volver a pedir Permiso"
              onPress={openSetting}
            ></Button>
          </View>
        </Fragment>
      ) : (
        <Fragment>
          <View style={styles.viewCoordenadas}>
            <Text>Latitude: </Text>
            <TextInput
              disabled={true}
              value={
                (inputs.location.coordinates.latitude = JSON.stringify(
                  location.coords.latitude
                ))
              }
              style={styles.textCoordenadas}
            ></TextInput>
            <Text>Longitude: </Text>
            <TextInput
              disabled={true}
              value={
                (inputs.location.coordinates.longitude = JSON.stringify(
                  location.coords.longitude
                ))
              }
              style={styles.textCoordenadas}
            ></TextInput>
          </View>
          <View style={styles.button}>
            <Button onPress={handleSubmit} title="Enviar Punto"></Button>
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default CrearPuntoProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Viewtext: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  viewCoordenadas: {
    flex: 3,
    flexDirection: "column",
    paddingBottom: "25%",
    paddingTop: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
  textCoordenadas: {
    textAlign: "center",
    fontSize: 20,
  },
});
