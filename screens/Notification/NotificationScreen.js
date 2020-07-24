import React, { useEffect, useState, Fragment } from "react";
import { View, Text, Button, StyleSheet, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItemNotificacion from "../../components/Notificacion/ListItemNotificacion";
import SplashScreen from "../auth/SplashScreen";

import { BASE_URL } from "../../config";

const NotificationScreen = ({ navigation }) => {
  const [Notificaciones, setNotificaciones] = useState([]);
  const [notificacionesCargada, setNotificacionesCargada] = useState(true);

  useEffect(() => {
    fetchNotificaciones();
  }, []);

  const fetchNotificaciones = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/api/notificacion`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setNotificaciones(data.notificaciones);
    setNotificacionesCargada(false);
  };

  return (
    <View style={styles.container}>
      {notificacionesCargada ? (
        <SplashScreen />
      ) : (
        <Fragment>
          <FlatList
            style={styles.list}
            data={Notificaciones}
            keyExtractor={(x) => x._id}
            renderItem={({ item }) => (
              <ListItemNotificacion
                tipo={
                  item.tipo_notificacion === "Recorrido" ? (
                    <Fragment>
                      <MaterialCommunityIcons
                        name="bus-alert"
                        size={24}
                        color="black"
                      />
                      {"                        "}
                      <Text style={styles.text}>Recorrido</Text>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <MaterialCommunityIcons
                        name="comment-eye"
                        size={24}
                        color="black"
                      />
                      {"                        "}
                      <Text style={styles.text}>Consejo</Text>
                    </Fragment>
                  )
                }
                name={item.name_notificacion}
                fecha={item.date_notificacion}
                onPressDetails={() =>
                  navigation.navigate("Detalle Notificacion", {
                    idNotificacion: item._id,
                  })
                }
              />
            )}
          />
        </Fragment>
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D5D3FB",
  },
  list: {
    alignSelf: "stretch",
    flex: 8,
    paddingBottom: "80%",
  },
  text: {
    textAlign: "center",
  },
});
