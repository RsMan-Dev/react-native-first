import React, { useState } from 'react';
import {Button, Image, Text, View} from "react-native";

const Details = ({route}) => {
    return (
        <View style={{justifyContent: 'space-between', boxShadow:"0 0 10px 0 lightgrey", backgroundColor: "white", marginTop: 16, margin: 10}}>
            <View style={{padding:16}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{route.params.product.title}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{route.params.product.price}</Text>
                </View>
                <Text>de: {route.params.product.author}</Text>
                <Text>{route.params.product.desc}</Text>
            </View>
        </View>
    );
}

export default Details;
