import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./components/Home/home";
import Details from "./components/Home/Details/details";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Home} options={{
          title: 'Accueil - Produits' ,
          headerStyle: styles.headerStyle,
          headerTintColor: 'white',
          headerTitle: props => <Nav {...props} />,
        }}/>
        <Stack.Screen name={"Details"} component={Details} options={{
          title: 'Détails' ,
          headerStyle: styles.headerStyle,
          headerTintColor: 'white',
          headerTitle: props => <Nav {...props} />,
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Nav(props) {
  return (
      <View style={{width:'100%', alignItems:'center', flexDirection: 'row', justifyContent:'space-between', color: props.tintColor, fontFamily:'arial, sans-serif'}}>
        <Text style={{color: props.tintColor}}>{props.children}</Text>
        <Text style={{fontSize:'20px', color: props.tintColor}}>LeMauvaisCoin</Text>
        <View><FontAwesomeIcon icon={faUserAlt} color={props.tintColor} size={25}/></View>
      </View>
  );
}

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  headerStyle: {
    backgroundColor: '#f4511e',
    borderBottomWidth: '0px',
    boxShadow: '0 0 7px 0 #BBB'
  },
});
