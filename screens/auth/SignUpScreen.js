import React from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import useForm from '../../hooks/useForm';
import { BASE_URL } from '../../config';

const SignUpScreen = ({ navigation }) => {
  const initialState = {
    nombre: '',
    email: '',
    password: '',
    password2: '',
  };

  const onSubmit = (data) => {
    fetch(`${BASE_URL}/api/usuario`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(data),
    })
      .then((x) => x.text())
      .then((x) => {
        let res = JSON.parse(x);
        if (res.ok) {
          return Alert.alert('Exito', res.usuario.nombre, [
            {
              text: 'Ir al inicio',
              onPress: () => navigation.navigate('SignInScreen'),
            },
          ]);
        }
        Alert.alert('Error', res.ok);
      });
    //
  };
  const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logotipo.png')}
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize='none'
        value={inputs.nombre}
        onChangeText={subscribe('nombre')}
        placeholder='Nombre'
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize='none'
        value={inputs.email}
        onChangeText={subscribe('email')}
        placeholder='Email'
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize='none'
        value={inputs.password}
        onChangeText={subscribe('password')}
        placeholder='Password'
        secureTextEntry={true}
      />
      <TextInput
        style={styles.textInput}
        autoCapitalize='none'
        value={inputs.password2}
        onChangeText={subscribe('password2')}
        placeholder='Password'
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleSubmit} style={[styles.signOut]}>
        <Text style={[styles.textSignOut]}>Registrarse</Text>
      </TouchableOpacity>
      <Button title='Inicio' onPress={() => navigation.goBack()} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5D3FB',
  },
  signOut: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#5D4CF7',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  textSignOut: {
    fontSize: 18,
    color: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'normal',
    paddingBottom: 20,
  },
  textInput: {
    width: '65%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 15,
    fontSize: 15,
    textAlign: 'center',
  },
});
