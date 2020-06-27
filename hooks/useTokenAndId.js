import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useTokenAndId = () => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  const getData = async () => {
    const idUser = await AsyncStorage.getItem('userID');
    const Token = await AsyncStorage.getItem('userToken');

    setId(idUser);
    setToken(Token);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { id, token, loading };
};

export default useTokenAndId;
