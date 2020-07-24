import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../components/context";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  const onSubmit = ({ email, password }) => {
    signIn({ email, password });
  };

  const initialState = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email invalido")
      .required("El email es necesario"),
    password: Yup.string().required("La password es necesario"),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialState}
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
          <Text style={styles.titulo}>Recorrido San Pedro</Text>
          <Image
            style={styles.logo}
            source={require("../../assets/logotipo.png")}
          />
          <TextInput
            style={styles.textInput}
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
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={() => setFieldTouched("password")}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.formikError}>{errors.password}</Text>
          )}
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.signIn]}
            disabled={!isValid}
          >
            <Text style={[styles.textSign]}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <Button
            title="Registrarse"
            onPress={() => navigation.navigate("SignUpScreen")}
          />
        </View>
      )}
    </Formik>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D5D3FB",
  },
  signIn: {
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
  textSign: {
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
    paddingTop: 20,
  },
});
