import React from 'react';
import { Button, View } from 'react-native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NotificationScreen from './Notification/NotificationScreen';
import DetailsNotificationScreen from './Notification/DetailsNotificationScreen';

import RecorridoScreen from './Recorrido/RecorridoScreen';
import DetailsRecorridoScreen from './Recorrido/DetailsRecorridoScreen';
import ComentariosRecorrido from './Recorrido/ComentariosRecorrido';
import CrearComentarioScreen from './Recorrido/CrearComentarioScreen';
import ComentariosDetailsRecorrido from './Recorrido/ComentariosDetailsRecorrido';

import MapaScreen from './Mapa/MapaScreen';

import ProfileScreen from './Profile/ProfileScreen';
import EditProfileScreen from './Profile/EditProfileScreen';
import ComentariosProfileScreen from './Profile/ComentariosProfileScreen';
import PuntosChoferProfileScreen from './Profile/PuntosChoferProfileScreen';
import CrearPuntoProfileScreen from './Profile/CrearPuntoProfileScreen';

const NotificationStack = createStackNavigator();
const RecorridoStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator
      initialRouteName='Notificaciones'
      mode='modal'
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#481380' },
      }}
    >
      <NotificationStack.Screen
        name='Notificaciones'
        component={NotificationScreen}
      />
      <NotificationStack.Screen
        name='Details'
        component={DetailsNotificationScreen}
        options={{ headerShown: false }}
      />
    </NotificationStack.Navigator>
  );
};

const RecorridoStackScreen = ({ navigation }) => {
  return (
    <RecorridoStack.Navigator
      initialRouteName='Recorridos'
      mode='modal'
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#481380' },
      }}
    >
      <RecorridoStack.Screen name='Recorridos' component={RecorridoScreen} />
      <RecorridoStack.Screen
        name='Detalle'
        component={DetailsRecorridoScreen}
      />
      <RecorridoStack.Screen
        name='Comentarios'
        component={ComentariosRecorrido}
      />
      <RecorridoStack.Screen
        name='Crear Comentario'
        component={CrearComentarioScreen}
      />
      <RecorridoStack.Screen
        name='ComentariosDetails'
        component={ComentariosDetailsRecorrido}
      />
    </RecorridoStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      initialRouteName='Perfil'
      mode='modal'
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#481380' },
      }}
    >
      <ProfileStack.Screen name='Perfil' component={ProfileScreen} />
      <ProfileStack.Screen name='Editar' component={EditProfileScreen} />
      <ProfileStack.Screen
        name='Comentarios'
        mode='modal'
        component={ComentariosProfileScreen}
      />
      <ProfileStack.Screen
        name='Puntos Chofer'
        component={PuntosChoferProfileScreen}
        options={{
          headerRight: () => (
            <View style={{ paddingRight: 15 }}>
              <MaterialCommunityIcons
                name='plus-circle-outline'
                size={30}
                color='#fff'
                onPress={() => navigation.navigate('Crear Punto')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name='Crear Punto'
        component={CrearPuntoProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName='Notificaciones' activeColor='#fff'>
      <Tab.Screen
        name='Notificaciones'
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'Notificaciones',
          tabBarColor: '#481380',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bell' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Recorridos'
        component={RecorridoStackScreen}
        options={{
          tabBarLabel: 'Recorridos',
          tabBarColor: '#481380',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Mapa'
        component={MapaScreen}
        options={{
          tabBarLabel: 'Mapa',
          tabBarColor: '#481380',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='mapbox' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarColor: '#481380',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
