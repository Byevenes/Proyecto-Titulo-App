import React, { useEffect, useState, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AsyncStorage from "@react-native-community/async-storage";
import useForm from "../../hooks/useForm";

import { BASE_URL } from "../../config";

import SplashScreen from "../auth/SplashScreen";

const EditProfileScreen = ({ route, navigation }) => {
  const { id, nombre } = route.params;

  const initialState = {
    nombre: nombre,
    id: id,
  };

  const onSubmit = (data) => {
    /*
    AsyncStorage.getItem('userToken').then((x) => {
      fetch(`${BASE_URL}/api/usuario/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
          token: x,
        },
        body: JSON.stringify(data),
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
            Alert.alert(`Usuario ${x.usuario.nombre} actualizado`);
            return navigation.push('Perfil');
          }
          return Alert.alert('Error en actualizar los datos');
        });
    });*/
    navigation.navigate("Perfil", { data: data });
  };

  const [usuario, setUsuario] = useState([]);
  const [usuarioCargado, setUsuarioCargado] = useState(true);

  useEffect(() => {
    fetchUsuario();
  }, []);

  const fetchUsuario = async () => {
    const Token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/api/usuario/${id}`, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setUsuario(data);
    setUsuarioCargado(false);
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, "Nombre muy corto")
      .max(12, "Nombre muy largo")
      .required("El nombre es necesario"),
  });

  //const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      {usuarioCargado ? (
        <SplashScreen />
      ) : (
        <Formik
          initialValues={initialState}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <Fragment>
              <View style={styles.editData}>
                <Text style={styles.text}>Nombre</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={usuario.nombre}
                  value={values.nombre}
                  onChangeText={handleChange("nombre")}
                  onBlur={() => setFieldTouched("nombre")}
                />
                {touched.nombre && errors.nombre && (
                  <Text style={styles.formikError}>{errors.nombre}</Text>
                )}
              </View>
              <View style={styles.profileSignOut}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.signOut]}
                  disabled={!isValid}
                >
                  <Text style={[styles.textSignOut]}>Guardar Cambios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={[styles.signOut]}
                >
                  <Text style={[styles.textSignOut]}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </Formik>
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  editData: {
    flex: 3,
    paddingTop: 50,
  },
  text: {
    paddingTop: 20,
    textAlign: "center",
  },
  textInput: {
    width: 250,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#ffff",
    borderWidth: 1,
    marginTop: 15,
    fontSize: 15,
    textAlign: "center",
  },
  profileSignOut: {
    flex: 3,
  },
  signOut: {
    width: 250,
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
    fontSize: 13,
    color: "white",
  },
  formikError: {
    fontSize: 13,
    color: "red",
    textAlign: "center",
    paddingTop: 20,
  },
});
