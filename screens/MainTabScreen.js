import React from "react";
import { Button, View } from "react-native";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import NotificationScreen from "./Notification/NotificationScreen";
import DetailsNotificationScreen from "./Notification/DetailsNotificationScreen";

import RecorridoScreen from "./Recorrido/RecorridoScreen";
import DetailsRecorridoScreen from "./Recorrido/DetailsRecorridoScreen";
import ComentariosRecorridoScreen from "./Recorrido/ComentariosRecorridoScreen";
import CrearComentarioScreen from "./Recorrido/CrearComentarioScreen";
import ComentariosDetailsRecorridoScreen from "./Recorrido/ComentariosDetailsRecorridoScreen";

import MapaScreen from "./Mapa/MapaScreen";

import ProfileScreen from "./Profile/ProfileScreen";
import EditProfileScreen from "./Profile/EditProfileScreen";
import ComentariosProfileScreen from "./Profile/ComentariosProfileScreen";
import ComentariosDetailsProfileScreen from "./Profile/ComentariosDetailsProfileScreen";
import PuntosChoferProfileScreen from "./Profile/PuntosChoferProfileScreen";
import PuntosChoferDetailsProfileScreen from "./Profile/PuntosChoferDetailsProfileScreen";
import CrearPuntoProfileScreen from "./Profile/CrearPuntoProfileScreen";

const NotificationStack = createStackNavigator();
const RecorridoStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const NotificationStackScreen = () => {
  return (
    <NotificationStack.Navigator
      initialRouteName="Notificaciones"
      mode="modal"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#481380" },
      }}
    >
      <NotificationStack.Screen
        name="Notificaciones"
        component={NotificationScreen}
      />
      <NotificationStack.Screen
        name="Detalle Notificacion"
        component={DetailsNotificationScreen}
      />
    </NotificationStack.Navigator>
  );
};

const RecorridoStackScreen = ({ navigation }) => {
  return (
    <RecorridoStack.Navigator
      initialRouteName="Recorridos"
      mode="modal"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#481380" },
      }}
    >
      <RecorridoStack.Screen name="Recorridos" component={RecorridoScreen} />
      <RecorridoStack.Screen
        name="Detalle Recorrido"
        component={DetailsRecorridoScreen}
      />
      <RecorridoStack.Screen
        name="Comentarios"
        component={ComentariosRecorridoScreen}
      />
      <RecorridoStack.Screen
        name="Crear Comentario"
        component={CrearComentarioScreen}
      />
      <RecorridoStack.Screen
        name="Detalle Comentario"
        component={ComentariosDetailsRecorridoScreen}
      />
    </RecorridoStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Perfil"
      mode="modal"
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#481380" },
      }}
    >
      <ProfileStack.Screen name="Perfil" component={ProfileScreen} />
      <ProfileStack.Screen name="Editar" component={EditProfileScreen} />
      <ProfileStack.Screen
        name="Comentarios"
        component={ComentariosProfileScreen}
      />
      <ProfileStack.Screen
        name="Detalle Comentario"
        component={ComentariosDetailsProfileScreen}
      />
      <ProfileStack.Screen
        name="Puntos Chofer"
        component={PuntosChoferProfileScreen}
      />
      <ProfileStack.Screen
        name="Detalle Punto Chofer"
        component={PuntosChoferDetailsProfileScreen}
      />
      <ProfileStack.Screen
        name="Crear Punto"
        component={CrearPuntoProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator initialRouteName="Notificaciones" activeColor="#fff">
      <Tab.Screen
        name="Notificaciones"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: "Notificaciones",
          tabBarColor: "#481380",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Recorridos"
        component={RecorridoStackScreen}
        options={{
          tabBarLabel: "Recorridos",
          tabBarColor: "#481380",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapaScreen}
        options={{
          tabBarLabel: "Mapa",
          tabBarColor: "#481380",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="mapbox" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Perfil",
          tabBarColor: "#481380",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;
