import React, {useEffect, useState} from 'react';
import {Button, Dimensions, Image, Text, View} from "react-native";
import {getProducts} from "../../../utils/localStorage";

const Details = ({route}) => {

    let [storageData, setStorageData] = useState({});

    useEffect(() => {
        getProducts().then((d) => {
            setStorageData(d.products.find(p => p.id === route.params.id));
        });
    },[]);

    return (
        <View style={{justifyContent: 'space-between', boxShadow:"0 0 10px 0 lightgrey", backgroundColor: "white", marginTop: 16, margin: 10, overflow:'hidden'}}>
            <View style={{flexDirection: 'row'}}>
                <Image source={{uri:storageData.imgs?storageData.imgs[0]:'https://www.labaleine.fr/sites/default/files/image-not-found.jpg'}} style={{width:130, height: '100%', maxHeight:150}}/>
                <View style={{padding:16, flex:1}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}} numberOfLines={1}>{storageData.title}</Text>
                    <Text style={{fontSize: 20}} numberOfLines={1}>{storageData.price}</Text>
                    <Text numberOfLines={1}>de: {storageData.author}</Text>
                    <Text>{storageData.desc}</Text>
                </View>
            </View>
        </View>
    );
}

export default Details;
