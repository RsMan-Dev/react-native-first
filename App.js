import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./components/Home/home";
import Details from "./components/Home/Details/details";
import {Searchbar,IconButton, Provider as PaperProvider, Colors} from "react-native-paper";

const Stack = createStackNavigator();

export default function App() {
  /*
  let [width, setWidth] = useState(Dimensions.get("window").width);
  Dimensions.addEventListener('change', () => {
    setWidth(Dimensions.get('window').width);
  })
  */
  return (
    <PaperProvider>
      <StatusBar backgroundColor={'#f4511e'} style={'light'}/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={({route, navigation}) => ({
            headerStyle: styles.headerStyle,
            headerTintColor: 'white',
            headerTitle: props => <Nav {...props} onSearch={(q)=>{navigation.navigate('Home');}} />,
          })}>
          <Stack.Screen name={"Home"} component={Home} options={{title: 'Accueil - Produits'}}/>
          <Stack.Screen name={"Details"} component={Details} options={{title: 'Détails'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

function Nav(props) {
  let [query, setQuery] = useState("");
  let [searching, setSearching] = useState(false);
  return (
      <View style={{width:'100%', alignItems:'center', flexDirection: 'row', justifyContent:'space-between', color: props.tintColor, fontFamily:'arial, sans-serif'}}>
        <View style={{width:200}}>
          <Text style={{fontSize:20, color: props.tintColor}}>LeMauvaisCoin</Text>
          <Text style={{color: props.tintColor}}>{props.children}</Text>
        </View>
        <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
          {
            searching ?
            <Searchbar placeholder="Search" onChangeText={(q)=>setQuery(q)} value={query} style={styles.searchbar} inputStyle={styles.searchbarInput} iconColor={Colors.white} placeholderTextColor={Colors.white} onIconPress={() => {props.onSearch(query),setSearching(!searching)}} />
            :
            <IconButton icon={'magnify'} size={25} color={Colors.white} onPress={()=>setSearching(!searching)}/>
          }
          <IconButton icon={'account'} size={25} color={Colors.white}/></View>
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
    borderBottomWidth: 0,
    shadowColor: '#BBB',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 7,
    elevation:5,
  },
  searchbar:{
    backgroundColor: '#f4511e',
    elevation:0,
    borderRadius: 0,
    maxWidth: '100%'
  },
  searchbarInput:{
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'white',
    color: 'white'
  }
});
