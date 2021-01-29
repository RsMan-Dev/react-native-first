import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./components/Home/home";
import Details from "./components/Home/Details/details";
import {
    Searchbar,
    IconButton,
    Provider as PaperProvider,
    Colors,
    Menu,
    Divider,
    Modal,
    Portal,
    TextInput,
    Button
} from "react-native-paper";
import {getUser, initLocalStorage, setUser, addProduct as addLocalProduct} from "./utils/localStorage";
import {injectWebCss} from "./utils/injectWebCss";

const Stack = createStackNavigator();


export default function App() {
    let [dataInitialized, setDataInitialized] = useState(false);

    injectWebCss();

    useEffect(() => {
        initLocalStorage().then((res) => {
            setDataInitialized(res);
        });
    },[]);

    return ( dataInitialized ?
        (
            <PaperProvider>
                <StatusBar backgroundColor={'#f4511e'} style={'light'}/>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={({route, navigation}) => ({
                        headerStyle: styles.headerStyle,
                        headerTintColor: 'white',
                        headerTitle: props => <Nav {...props} navigation={navigation} onSearch={(q)=>{navigation.navigate('Home', {searchQuery: q});}} />,
                    })}>
                        <Stack.Screen name={"Home"} component={Home} options={{title: 'Accueil - Produits'}}/>
                        <Stack.Screen name={"Details"} component={Details} options={{title: 'Détails'}}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        )
    :
        <View style={{width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}><Text>Initializing</Text></View>
    );
}

function Nav(props) {
    let [query, setQuery] = useState("");
    let [searching, setSearching] = useState(false);

    const [menu, setMenu] = useState(false);
    const [connection, setConnection] = useState(false);
    const [addProduct, setAddProduct] = useState(false);

    const [connForm, setConnForm] = useState({});

    const [addForm, setAddForm] = useState({});
    const [addFormTypeSelectorOpened, setAddFormTypeSelectorOpened] = useState(false);
    let types = {
        headphones: 'Ecouteurs',
        bluetooth_speakers: 'Enceinte bluetooth',
        phones: 'Téléphones',
        tv: 'Télévisions',
    };

    let [dataUser, setDataUser] = useState({});

    let inputTheme = {colors:{primary:"#f4511e", underlineColor:'transparent', background:'white', placeholder:'#666', text:'#666'}}

    useEffect(() => {
        getUser().then((res) => {
            setDataUser(res);
        });
    },[]);

    return (
      <View style={{width:'100%', alignItems:'center', flexDirection: 'row', justifyContent:'space-between', color: props.tintColor, fontFamily:'arial, sans-serif'}}>
        <View style={{width:200}}>
          <Text style={{fontSize:20, color: props.tintColor}}>LeMauvaisCoin</Text>
          <Text style={{color: props.tintColor}}>{props.children}</Text>
        </View>
        <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
          {
            searching ?
            <Searchbar placeholder="Search" onChangeText={(q)=>setQuery(q)} value={query} style={styles.searchbar} inputStyle={styles.searchbarInput} iconColor={Colors.white} placeholderTextColor={Colors.white} onIconPress={() => {props.onSearch(query);setSearching(!searching)}} onSubmitEditing={() => {props.onSearch(query);setSearching(!searching)}} />
            :
            <IconButton icon={'magnify'} size={25} color={Colors.white} onPress={()=>setSearching(!searching)}/>
          }
            <Menu
                visible={menu}
                contentStyle={{backgroundColor:'white'}}
                onDismiss={()=>setMenu(false)}
                anchor={<IconButton icon={'account'} size={25} color={Colors.white} onPress={() => setMenu(true)}/>}>
                {dataUser.name ? (<>
                        <Text style={{alignSelf:'center'}}>{dataUser.name}</Text>
                        <Menu.Item titleStyle={{color: '#666'}} onPress={() => {setAddProduct(true);setMenu(false)}} title="Ajouter annonce" />
                        <Divider/>
                        <Menu.Item titleStyle={{color: '#666'}} onPress={() => {setMenu(false)}} title="Se déconnecter" />
                    </>)
                :
                    <Menu.Item titleStyle={{color: '#666'}} onPress={() => {setConnection(true);setMenu(false)}} title="Se connecter" />
                }
            </Menu>
            <Portal>
                <Modal visible={connection} onDismiss={() => {setConnection(false)}} contentContainerStyle={{backgroundColor: 'white', width: 400, justifySelf:'center', alignSelf:'center', padding: 16}}>
                    <Text>Pour vous connecter, entrez juste un nom:</Text>
                    <TextInput mode={'outlined'} dense={true} theme={inputTheme} label={'nom de compte'} value={connForm.name !== undefined ? connForm.name : ""} onChangeText={text => setConnForm(Object.assign({...connForm}, {name: text}))}/>
                    <Button style={{marginTop: 12}} color={"#f4511e"} onPress={()=>{setUser(connForm).then((data) => {setDataUser(data);props.navigation.navigate('Home');setConnection(false); })}}>se connecter</Button>
                </Modal>
                <Modal visible={addProduct} onDismiss={() => {setAddProduct(false)}} contentContainerStyle={{backgroundColor: 'white', width: 400, justifySelf:'center', alignSelf:'center', padding: 16}}>
                    <Text>Entrez les informations du produit a ajouter:</Text>
                    <TextInput mode={'outlined'} dense={true} theme={inputTheme} label={'Intitulé'} value={addForm.title !== undefined ? addForm.title : ""} onChangeText={text => setAddForm(Object.assign({...addForm}, {title: text}))}/>
                    <TextInput mode={'outlined'} dense={true} theme={inputTheme} label={'Prix'} value={addForm.price !== undefined ? addForm.price : ""} onChangeText={text => setAddForm(Object.assign({...addForm}, {price: text}))}/>
                    <TextInput mode={'outlined'} dense={true} multiline={true} numberOfLines={3} style={{maxHeight:150}} theme={inputTheme} label={'Description'} value={addForm.desc !== undefined ? addForm.desc : ""} onChangeText={text => setAddForm(Object.assign({...addForm}, {desc: text}))}/>
                    <TextInput mode={'outlined'} dense={true} theme={inputTheme} label={'Lien image'} value={addForm.imgs !== undefined ? addForm.imgs[0] : ""} onChangeText={text => setAddForm(Object.assign({...addForm}, {imgs: [text]}))}/>
                   <Menu
                        visible={addFormTypeSelectorOpened}
                        contentStyle={{backgroundColor:'white'}}
                        onDismiss={()=>setAddFormTypeSelectorOpened(false)}
                        anchor={<Button style={{marginTop: 12, borderWidth: 1, borderColor:'#666'}} contentStyle={{justifyContent: 'flex-start'}} labelStyle={{fontSize: 16, textTransform:'capitalize', fontWeight:'100', margin: 14}} color={"#666"} onPress={() => {setAddFormTypeSelectorOpened(true)}}>{addForm.type !== undefined ? types[addForm.type] : "Type"}</Button>}>
                       <Menu.Item titleStyle={{color: '#666'}} onPress={() => {setAddForm(Object.assign({...addForm}, {type: ['headphones']}));setAddFormTypeSelectorOpened(false)}} title={types.headphones} />
                       <Menu.Item titleStyle={{color: '#666'}} onPress={() => {setAddForm(Object.assign({...addForm}, {type: ['bluetooth_speakers']}));setAddFormTypeSelectorOpened(false)}} title={types.bluetooth_speakers} />
                       <Menu.Item titleStyle={{color: '#666'}} onPress={() => {setAddForm(Object.assign({...addForm}, {type: ['phones']}));setAddFormTypeSelectorOpened(false)}} title={types.phones} />
                       <Menu.Item titleStyle={{color: '#666'}} onPress={() => {setAddForm(Object.assign({...addForm}, {type: ['tv']}));setAddFormTypeSelectorOpened(false)}} title={types.tv} />
                    </Menu>
                    <Button style={{marginTop: 12}} color={"#f4511e"} onPress={()=>{ addLocalProduct(addForm).then((data) => {props.navigation.navigate('Home');setAddProduct(false); })}}>Ajouter</Button>
                </Modal>
            </Portal>
          </View>
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
