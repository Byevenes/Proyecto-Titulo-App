import React from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import useForm from "../../hooks/useForm";
import { BASE_URL } from "../../config";

const SignUpScreen = ({ navigation }) => {
  const initialState = {
    nombre: "",
    email: "",
    password: "",
    password2: "",
  };

  const onSubmit = (data) => {
    fetch(`${BASE_URL}/api/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(data),
    })
      .then((x) => x.text())
      .then((x) => {
        let res = JSON.parse(x);
        if (res.ok) {
          return Alert.alert("Exito", res.usuario.nombre, [
            {
              text: "Ir al inicio",
              onPress: () => navigation.navigate("SignInScreen"),
            },
          ]);
        }
        Alert.alert("Error", res.ok);
      });
    //
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, "Nombre muy corto")
      .max(12, "Nombre muy largo")
      .required("El nombre es necesario"),
    email: Yup.string()
      .email("Email invalido")
      .required("El email es necesario"),
    password: Yup.string()
      .min(2, "La contraseña es muy corta")
      .max(12, "La contraseña es muy larga")
      .required("La password es necesario"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "La contraseñas no son iguales")
      .required("Confirme la contraseña"),
  });

  //const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
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
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assets/logotipo.png")}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Nombre"
            value={values.nombre}
            onChangeText={handleChange("nombre")}
            onBlur={() => setFieldTouched("nombre")}
          />
          {touched.nombre && errors.nombre && (
            <Text style={styles.formikError}>{errors.nombre}</Text>
          )}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={() => setFieldTouched("email")}
          />
          {touched.email && errors.email && (
            <Text style={styles.formikError}>{errors.email}</Text>
          )}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
            secureTextEntry={true}
          />
          {touched.password && errors.password && (
            <Text style={styles.formikError}>{errors.password}</Text>
          )}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Confirme Password"
            value={values.password2}
            onChangeText={handleChange("password2")}
            onBlur={() => setFieldTouched("password2")}
            secureTextEntry={true}
          />
          {touched.password2 && errors.password2 && (
            <Text style={styles.formikError}>{errors.password2}</Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.signOut]}
            disabled={!isValid}
          >
            <Text style={[styles.textSignOut]}>Registrarse</Text>
          </TouchableOpacity>
          <Button title="Inicio" onPress={() => navigation.goBack()} />
        </View>
      )}
    </Formik>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5D3FB",
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
  },
  textSignOut: {
    fontSize: 18,
    color: "white",
  },
  logo: {
    width: 200,
    height: 200,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "normal",
    paddingBottom: 20,
  },
  textInput: {
    width: "65%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderWidth: 1,
    marginTop: 15,
    fontSize: 15,
    textAlign: "center",
  },
  formikError: {
    fontSize: 13,
    color: "red",
    textAlign: "center",
    paddingTop: 10,
  },
});
