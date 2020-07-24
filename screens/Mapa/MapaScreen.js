import React, { useEffect, useState, Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  Platform,
  ClippingRectangle,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as IntentLauncher from "expo-intent-launcher";
import MapView, { Geojson, Polygon, Marker, Callout } from "react-native-maps";

import SplashScreen from "../auth/SplashScreen";
import { BASE_URL } from "../../config";

const MapaScreen = () => {
  const [location, setLocation] = useState(null);
  const [locationCargado, setLocationCargado] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const [recorridos, setRecorridos] = useState([]);
  const [recorridosCargado, setRecorridosCargado] = useState(true);

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
    fetchRecorridos();
  }, []);

  /* const getLocation = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permisos para poder acceder a la localización denegados');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLocationCargado(false);
    };*/

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

  const fetchRecorridos = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/api/recorrido`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setRecorridos(data.recorridos);
    setRecorridosCargado(false);
  };

  /*
  const Polygonos = () => {
      return recorridos.map( polygono => {
      setPolygonos(polygono.location_recorrido.coordinates);
      setPolygonosCargado(false);
    });
}

const PuntoEntrada = () => {
   return recorridos.map( puntoEntrada => {
     console.log(puntoEntrada.location_recorrido_punto_entrada.coordinates);
    setPuntosEntrada(puntoEntrada.location_recorrido_punto_entrada.coordinates);
    setPuntosEntradaCargados(false);
  });
}

const PuntoSalida = () => {
    return recorridos.map( puntoSalida => {
    setPuntosSalida(puntoSalida.location_recorrido_punto_salida.coordinates);
    setPuntosSalidaCargados(false);
  });
}
*/
  /*
<Polygon
            key={polygonoID} 
              coordinates={polygonos}
              fillColor={ 'rgba(100, 100, 200, 0.3)' }
              strokeWidth={ 2 }
            />
*/

  return (
    <View style={styles.map}>
      {locationCargado || recorridosCargado ? (
        <Fragment>
          <View style={styles.Viewtext}>
            <Text style={styles.text}>{text}</Text>
            <Button
              title="Volver a pedir Permiso"
              onPress={openSetting}
            ></Button>
          </View>
        </Fragment>
      ) : (
        <Fragment>
          <MapView
            key={location.timestamp}
            showsUserLocation
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.09,
            }}
          >
            {recorridos.map((polygonosPrueba) =>
              polygonosPrueba.location_recorrido.coordinates.map((poligono) => (
                <Polygon
                  key={polygonosPrueba._id}
                  coordinates={poligono}
                  fillColor={"rgba(100, 100, 200, 0.3)"}
                  strokeWidth={2}
                />
              ))
            )}

            {recorridos.map((puntoEntradaPrueba) =>
              puntoEntradaPrueba.location_recorrido_punto_entrada.coordinates.map(
                (entrada) => (
                  <Marker key={entrada.name_punto_entrada} coordinate={entrada}>
                    <Callout>
                      <Text>{entrada.name_punto_entrada}</Text>
                    </Callout>
                  </Marker>
                )
              )
            )}
            {recorridos.map((puntoSalidaPrueba) =>
              puntoSalidaPrueba.location_recorrido_punto_salida.coordinates.map(
                (salida) => (
                  <Marker key={salida.name_punto_salida} coordinate={salida}>
                    <Callout>
                      <Text>{salida.name_punto_salida}</Text>
                    </Callout>
                  </Marker>
                )
              )
            )}
          </MapView>
        </Fragment>
      )}
    </View>
  );
};

export default MapaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    display: "flex",
  },
  Viewtext: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
