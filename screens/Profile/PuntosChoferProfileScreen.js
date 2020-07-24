import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItemPuntoChofer from "../../components/Profile/PuntoChofer/ListItemPuntoChofer";
import SplashScreen from "../auth/SplashScreen";

import { BASE_URL } from "../../config";

const PuntosChoferProfileScreen = ({ route, navigation }) => {
  const { id, role } = route.params;

  const [puntoChofer, setPuntoChofer] = useState([]);
  const [puntoChoferCargado, setPuntoChoferCargado] = useState(true);

  useEffect(() => {
    if (route.params?.puntoChofer) {
      AsyncStorage.getItem("userToken").then((x) => {
        fetch(`${BASE_URL}/api/puntochofer`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            token: x,
          },
          body: JSON.stringify(route.params.puntoChofer),
        })
          .then((x) => x.text())
          .then((x) => {
            try {
              return JSON.parse(x);
            } catch {
              throw x;
            }
          })
          .then((x) => {
            if (x.ok === true) {
              return Alert.alert("Punto de Chofer Añadido");
            }
            return Alert.alert("No se pudo Añadir el Punto");
          });
      });
    }
    role === "CHOFER_ROLE" ? fetchPuntoChofer() : fetchPuntoChoferes();
  }, [route.params?.puntoChofer]);

  useEffect(() => {
    if (route.params?.idPuntoChofer) {
      Alert.alert(
        "Esta seguro ",
        "que desea eliminar este punto de chofer",
        [
          {
            text: "Cancelar",
            onPress: () => navigation.goBack(),
          },
          {
            text: "OK",
            onPress: () => {
              AsyncStorage.getItem("userToken").then((x) => {
                fetch(
                  `${BASE_URL}/api/puntochofer/${route.params.idPuntoChofer}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "Application/json",
                      token: x,
                    },
                  }
                )
                  .then((x) => x.text())
                  .then((x) => {
                    try {
                      return JSON.parse(x);
                    } catch {
                      throw x;
                    }
                  })
                  .then((x) => {
                    if (x.ok === false) {
                      alert("No se pudo eliminar el punto de chofer");
                    }
                    role === "CHOFER_ROLE"
                      ? fetchPuntoChofer()
                      : fetchPuntoChoferes();
                    return Alert.alert(x.message);
                  });
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  }, [route.params?.idPuntoChofer]);

  const fetchPuntoChoferes = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/api/puntochofer`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setPuntoChofer(data.puntoChoferes);
    setPuntoChoferCargado(false);
  };

  const fetchPuntoChofer = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/api/puntochofer/${id}`, {
      headers: {
        token: Token,
      },
    });
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
          <FlatList
            style={styles.list}
            data={puntoChofer}
            keyExtractor={(x) => x._id}
            renderItem={({ item }) => (
              <ListItemPuntoChofer
                name={item.chofer.nombre}
                email={item.chofer.email}
                fecha={item.date_chofer}
                onPress={() =>
                  navigation.navigate("Detalle Punto Chofer", {
                    idPuntoChofer: item._id,
                    nombre: item.chofer.nombre,
                    email: item.chofer.email,
                  })
                }
              />
            )}
          />
          <View style={styles.button}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={40}
              color="black"
              onPress={() =>
                navigation.navigate("Crear Punto", {
                  idChofer: id,
                })
              }
            />
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default PuntosChoferProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    alignSelf: "stretch",
    flex: 8,
    paddingBottom: "80%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
