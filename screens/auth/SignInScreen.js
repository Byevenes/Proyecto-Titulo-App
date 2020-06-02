import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { AuthContext } from '../../components/context';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title='Sign in' onPress={() => signIn({ email, password })} />
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUpScreen')}
        style={[
          styles.signIn,
          {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 15,
          },
        ]}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: '#009387',
            },
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
