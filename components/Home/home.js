import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, Dimensions} from "react-native";
import {Button, Checkbox} from "react-native-paper";
import ProductCard from './ProductCard/productCard';
import {getProducts} from "../../utils/localStorage";

const Home = ({route, navigation}) => {



    let [types, setTypes] = useState({
        headphones: {value:true, title:'Ecouteurs'},
        bluetooth_speakers: {value:true, title:'Enceinte bluetooth'},
        phones: {value:true, title:'Téléphones'},
        tv: {value:true, title:'Télévisions'},
    })
    let [storageData, setStorageData] = useState({});
    let [width, setWidth] = useState(Dimensions.get("window").width);
    let [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        getProducts().then((d) => {
            setStorageData(d);
        });
        Dimensions.addEventListener('change', () => {
            setWidth(Dimensions.get('window').width);
        });
    },[]);

    let changeType = (key, val) => {
        let typesTemp = {...types};
        typesTemp[key].value = val;
        setTypes(typesTemp);
    }

    return (
        <View style={{ justifyContent: 'space-between', flexDirection:'column', height:'100%', width: '100%' }}>
            <View style={{shadowColor: '#BBB', shadowOffset: {width: 0, height: 0}, shadowRadius: 7, elevation:5, backgroundColor: "white", flexDirection:'column',padding:16,paddingBottom:0, paddingTop: showFilters?16:8, minWidth:200}}>
                {
                    showFilters ?
                        (<>
                            {
                                route ? route.params ? route.params.searchQuery ?
                                    (<>
                                        <Text style={{fontWeight: 'bold'}}>recherche:</Text>
                                        <Text style={{marginBottom: 10}}>{route.params.searchQuery}</Text>
                                    </>)
                                    : null : null : null
                            }
                            <Text>Type:</Text>
                            {
                                Object.keys(types).map(k=>(
                                <View key={`type${k}`} style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Checkbox status={types[k].value ? 'checked' : 'unchecked'} color={'#f4511e'} uncheckedColor={'grey'} onPress={() => changeType(k, !types[k].value)} style={{
                                marginRight: 8,
                                height: 40
                            }}/><Text>{types[k].title}</Text>
                                </View>
                                ))
                            }
                        </>)
                    : null
                }

                <Button onPress={() => {setShowFilters(!showFilters)}} color={'#f4511e'} style={{borderTopWidth:showFilters?1:0, borderTopColor:'#ccc', borderRadius:0}}>
                    {!showFilters?'Philtres':'cacher'}
                </Button>
            </View>
            <ScrollView style={{height:'100%',flex:1}}>
                { storageData.products ? storageData.products.map( (v,k) => (({...types}[v.type].value && (route ? route.params ? route.params.searchQuery ? ( v.title.toLowerCase().includes(route.params.searchQuery.toLowerCase())) :true :true :true) ) ? (<ProductCard key={'productCard'+k} product={v} navigation={navigation}/>) : null ) ) :null }
            </ScrollView>
        </View>
    );
}

export default Home;

