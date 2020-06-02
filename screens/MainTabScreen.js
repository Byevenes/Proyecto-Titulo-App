import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NotificationScreen from './NotificationScreen';
import RecorridoScreen from './RecorridoScreen';
import MapaScreen from './MapaScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName='Notificaciones' activeColor='#fff'>
      <Tab.Screen
        name='Recorridos'
        component={RecorridoScreen}
        options={{
          tabBarLabel: 'Recorridos',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Notificaciones'
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notificaciones',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bell' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Mapa'
        component={MapaScreen}
        options={{
          tabBarLabel: 'Mapa',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='mapbox' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
