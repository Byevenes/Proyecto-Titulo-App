import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import { AuthContext } from '../../components/context';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recorrido San Pedro</Text>
      <Image
        style={styles.logo}
        source={require('../../assets/logotipo.png')}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => signIn({ email, password })}
        style={[styles.signIn]}
      >
        <Text style={[styles.textSign]}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <Button
        title='Registrarse'
        onPress={() => navigation.navigate('SignUpScreen')}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D5D3FB',
  },
  signIn: {
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
  textSign: {
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
