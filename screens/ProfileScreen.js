import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { AuthContext } from '../components/context';

const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title='Sign out' onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
