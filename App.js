/**Importanciones necesarias para la creación de la app
 *
 * AsyncStorage = Para el uso de almacenamiento seguro del token
 *
 * NavigationContainer = Navigation 5 de react native cambio las Importanciones
 *
 * createStackNavigator = Navigation 5 del tipo Stack para poder separa los componenetes de la APP
 *
 * BASE_URL = Archivo que importamos de la carpeta config que retorna la URl de la API para las consultas de login.
 *
 * AuthContext = Componente que exporta una variable la cual creamos para hacer un Context, este es un hook de react
 * el cual puede hacer cambios al padre estando en el hijo, esto se hizo a modo de administrar los estados
 * de igual manera se pudo utilizar 'redux' para este caso, pero preferi utilizar los hooks de react para la
 * 'Authentication flows'.
 *
 * RootStackScreen = Es una de nuestras screens que almacena 2 screen del tipo StackNavigator en la cual tenemos
 * la screen de SingInScreen(Login) y SingUpScreen(Register).
 *
 *MainTabScreen = Es otra screen la cual almacena 4 screen del tipo TabNavigator en la cual tenemos la screen de
 *NotificationScreen(Notificaciones) la cual es la primera en mostrarse por pantalla, RecorridoScreen(Recorridos),
 *MapaScreen(Mapa) y ProfileScreen(Perfil).
 *
 *SplashScreen = Es una Screen en la cual se encuentra dentro de la carpeta de 'auth' de igual manera que login
 *y registerla cual nos entrega un simple loading... para poder las transiciones de estado si estoy validado o no.
 */
import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BASE_URL } from './config';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';
import MainTabScreen from './screens/MainTabScreen';
import SplashScreen from './screens/auth/SplashScreen';

// creamos una constante que almacenara un StackNavigator, para su uso posterior en el return de la APP
const Stack = createStackNavigator();

/**
 * Hacemos uso de 'useReducer' para la continuación de la 'Authentication flows' este hook es una alternativa a
 * useState. Esta acepta un reducer del tipo ostrado (state, action) => y devuelve el estado actual con el método dispatch.
 *
 * En este Reducer tendremos '4 casos'
 *
 * 'RESTORE_TOKEN : retornara una copia del stado, el token y el estado en false del Loading.
 * (caso parala acción de poder saber si ya tenemos token luego de cerrar la app y habernos logueado para no tener que loguearse otra vez)
 *
 * 'SIGN_IN': retornara una copia del estado , el token y el estado en false pero del 'Signout'.
 * (caso para la acción de poder loguearnos en la APP)
 *
 * 'SIGN_OUT': retorna una copia del estado, el token sera null y el estado de 'Signout' sera true.
 * (caso para la acción de poder salir de la APP)
 *
 * 'Default': retorna 3 estados, uno 'Loading' en true, 'Signout' en false y el 'Token' sera null.
 * (caso para la acción por default de la APP)
 *
 * isLoading- Configuramos esto 'true' cuando intentamos verificar si ya tenemos un token guardado en 'AsyncStorage'.
 * isSignout- Lo configuramos 'true' cuando el usuario está cerrando sesión.
 * userToken- El token para el usuario. Si no es nulo, asumimos que el usuario ha iniciado sesión, de lo contrario no.
 *
 */
export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // Hacemos uso del hook de React 'useEffect' el cual se ejecutara la función 'TokenRefresAsync' 1 sola vez.
  React.useEffect(() => {
    // Obtenemos el token del AsyncStorage y luego navegamos a nuestro lugar.
    const TokenRefreshAsync = async () => {
      let userToken;
      // Creamos una variable que almacene el token y luego podamos despachar la actión.
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restorna si el token fallo
        console.log(e);
      }
      /**
       * Este 'dispatch' realizara la acción de 'RESTORE_TOKEN',
       * esto cambiara a la pantalla de la APP estando dentro o
       * a la pantalla de autenticación si no encuentra el token ,
       * por ultimo la pantalla será desmontada y desechada de forma visual.
       */
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    // Llamamos a la función creada recién 'TokenRefresAsync' para que se ejecute.
    TokenRefreshAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        // la función 'signIn' necesitamos enviar la data (email, password) al servidor y recibir el token.
        /**
         * De igual manera necesitamos manejar los errores si falla el inicio de sesión.
         * Despues de hacer la petición necesitamos obtener el token y conservarlo usando 'AsyncStorage'.
         * De igual manera guardamos la 'userID' para poder hace uso en peticiones dentro de la APP.
         *
         * Y por ultimo hacemos el 'dispatch' de la acción 'SIGN_IN' y enviando el token guardo de manera persistente en Dispositivo.
         */
        fetch(`${BASE_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify(email, password),
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
              AsyncStorage.setItem('userID', x.usuario._id);
              AsyncStorage.setItem('userToken', x.token);
              return dispatch({ type: 'SIGN_IN', token: x.token });
            }
            return Alert.alert('Error', x.err.message);
          });
      },
      signOut: async () => {
        // Función 'signOut' la cual obtendra el token para su eliminación y posterior despacho de la acción.
        let removeToken; // Creamos variable que almacenera el token para luego despachar la acción de removerlo.
        try {
          removeToken = await AsyncStorage.removeItem('userToken');
        } catch (e) {
          // Si llega haber un problema el catch entregara la información
          console.log(e);
        }
        // Hacemos el 'dispatch' a la acción 'SIGN_OUT' y señalando el token removido.
        dispatch({ type: 'SIGN_OUT', removeToken });
        return await AsyncStorage.removeItem('userID');
      },
      /*signUp: async (data) => { creo que es innecesario tener uno de registro, esto lo desarrollamos a mano.
      },*/
    }),
    []
  );
  /**
   * Por ultimos nuestra APP retornara
   * 1.- Un 'AuthContext' el cual es el contexto creado para la Authentication flows en donde el value es el componente creado.
   * 2.- Nuestro 'StackNavigator' se encuentra envolvido dentro de nuestro 'NavigationContainer' como señala Navigation 5.
   * 3.- Señalamos si la variable de 'isLoading' es true o false y depeniendo de esto vemos que Screen mostramos.
   * 4.- Pasado esa condición preguntamos al state si el 'userToken' es 'null' y nuevamente dependiendo de la respuesta vemos que Screen mostramos.
   */
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            // En este caso todavia no hemos terminado de buscar el 'token'
            <Stack.Screen name='Splash' component={SplashScreen} />
          ) : state.userToken == null ? (
            // No se encontró el token, el usuario no ha inisiado sesión
            <Stack.Screen name='Auth' component={RootStackScreen} />
          ) : (
            // El usuario ha iniciado sesión
            <Stack.Screen name='App' component={MainTabScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
