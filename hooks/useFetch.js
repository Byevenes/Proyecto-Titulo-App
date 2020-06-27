import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const Token = await AsyncStorage.getItem('userToken');
    const response = await fetch(url, {
      headers: {
        token: Token,
      },
    });
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data };
};

export default useFetch;
