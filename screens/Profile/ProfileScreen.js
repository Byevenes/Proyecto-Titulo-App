import React, { useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext } from "../../components/context";
import { BASE_URL } from "../../config";

import SplashScreen from "../auth/SplashScreen";

const ProfileScreen = ({ route, navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  const [usuario, setUsuario] = useState([]);
  const [usuarioCargado, setUsuarioCargado] = useState(true);

  const [comentario, setComentario] = useState([]);
  const [comentarioCargado, setComentarioCargado] = useState(true);

  useEffect(() => {
    if (route.params?.data) {
      putUsuario();
      fetchUsuario();
      fetchComentario();
    }
    fetchUsuario();
    fetchComentario();
  }, [route.params?.data]);

  const putUsuario = async () => {
    const idUser = await AsyncStorage.getItem("userID");
    AsyncStorage.getItem("userToken").then((x) => {
      fetch(`${BASE_URL}/api/usuario/${idUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          token: x,
        },
        body: JSON.stringify(route.params.data),
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
            return Alert.alert(`Usuario ${x.usuario.nombre} actualizado`);
          }
          return Alert.alert("Error en actualizar los datos");
        });
    });
  };

  const fetchUsuario = async () => {
    const idUser = await AsyncStorage.getItem("userID");
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/api/usuario/${idUser}`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setUsuario(data);
    setUsuarioCargado(false);
  };

  const fetchComentario = async () => {
    const idUser = await AsyncStorage.getItem("userID");
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/api/comentario/${idUser}`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setComentario(data);
    setComentarioCargado(false);
  };

  return (
    <View style={styles.container}>
      {usuarioCargado || comentarioCargado ? (
        <SplashScreen />
      ) : (
        <Fragment>
          <View style={styles.profileImg}>
            <MaterialCommunityIcons name="account" size={80} color="black" />
            <Text style={styles.profileName}>{usuario.nombre}</Text>
            <Text style={styles.profileEmail}>{usuario.email}</Text>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileEdit}>
              <MaterialCommunityIcons
                name="account-edit"
                size={45}
                color="#5D4CF7"
                onPress={() =>
                  navigation.navigate("Editar", {
                    id: usuario.id,
                    nombre: usuario.nombre,
                  })
                }
              />
              <Text style={styles.profileTextEdit}>Editar Perfil</Text>
            </View>
            <View style={styles.profileEdit}>
              <MaterialCommunityIcons
                name="comment-text-multiple"
                size={45}
                color="#5D4CF7"
                onPress={() =>
                  navigation.navigate("Comentarios", {
                    id: usuario.id,
                  })
                }
              />
              <Text style={styles.profileTextComment}>
                Comentarios: {comentario.cuantos}{" "}
              </Text>
            </View>
            <View>
              {usuario.role === "USER_ROLE" ? (
                <Fragment></Fragment>
              ) : (
                <Fragment>
                  <View style={styles.profilePuntoChofer}>
                    <MaterialCommunityIcons
                      name="account-details"
                      size={45}
                      color="#5D4CF7"
                      onPress={() =>
                        navigation.navigate("Puntos Chofer", {
                          id: usuario.id,
                          role: usuario.role,
                        })
                      }
                    />
                    <Text style={styles.profileTextPuntoChofer}>
                      Puntos de Chofer
                    </Text>
                  </View>
                </Fragment>
              )}
            </View>
          </View>
          <View style={styles.profileSignOut}>
            <TouchableOpacity onPress={signOut} style={[styles.signOut]}>
              <Text style={[styles.textSignOut]}>Sign out</Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImg: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 30,
  },
  profileEmail: {
    color: "#626FB4",
  },
  profileInfo: {
    flex: 2,
    flexDirection: "column",
  },
  profileEdit: {
    flex: 1,
    flexDirection: "row",
  },
  profileTextEdit: {
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 15,
  },
  profileTextComment: {
    justifyContent: "center",
    paddingTop: 10,
    paddingLeft: 15,
  },
  profileTextUser: {
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  profilePuntoChofer: {
    flexDirection: "row",
  },
  profileTextPuntoChofer: {
    justifyContent: "center",
    paddingTop: 15,
    paddingLeft: 15,
  },
  profileSignOut: {
    flex: 1,
  },
  signOut: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#5D4CF7",
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 50,
  },
  textSignOut: {
    fontSize: 18,
    color: "white",
  },
});
