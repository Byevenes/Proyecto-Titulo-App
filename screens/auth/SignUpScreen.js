import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { AuthContext } from '../../components/context';

const SignUpScreen = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder='Name' value={name} onChangeText={setName} />
      <TextInput placeholder='Email' value={email} onChangeText={setEmail} />
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder='Repeat Password'
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
