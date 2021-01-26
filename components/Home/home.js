import React, { useState } from 'react';
import {View, ScrollView, Text} from "react-native";
import {Checkbox} from "react-native-paper";
import ProductCard from './ProductCard/productCard';
import data from '../../assets/data.json';

const Home = ({navigation}) => {
    let [types, setTypes] = useState({
        headphones: {value:true, title:'Ecouteurs'},
        bluetooth_speakers: {value:true, title:'Enceinte bluetooth'},
        phones: {value:true, title:'Téléphones'},
        tv: {value:true, title:'Télévisions'},
    })

    let changeType = (key, val) => {
        let typesTemp = {...types};
        typesTemp[key].value = val;
        setTypes(typesTemp);
    }

    return (
        <View style={{ justifyContent: 'space-between', flexDirection:'row', flexWrap: 'nowrap', height:'100%' }}>
            <View style={{shadowColor: '#BBB', shadowOffset: {width: 0, height: 0}, shadowRadius: 7, elevation:5, backgroundColor: "white", flexDirection:'column', width: 200, padding: 16, paddingTop: 32}}>
                <Text>Type:</Text>
                {
                    Object.keys(types).map(k=>(
                        <View key={`type${k}`} style={{flexDirection:'row', alignItems: 'center'}}>
                            <Checkbox status={types[k].value?'checked':'unchecked'} color={'#f4511e'} uncheckedColor={'grey'} onPress={() => changeType(k,!types[k].value)} style={{marginRight:8, height:40}}/><Text>{types[k].title}</Text>
                        </View>
                    ))
                }
            </View>
                <ScrollView style={{flex:1, height:'100%'}}>
                    {  data.products.map( (v,k) => ({...types}[v.type].value ? (<ProductCard key={'productCard'+k} product={v} navigation={navigation}/>) : null ) )  }
                </ScrollView>
        </View>
    );
}

export default Home;

