import React, { useState } from 'react';
import {Text, View} from "react-native";
import {Button} from "react-native-paper";

const ProductCard = (props, {route}) => {
    return (
      <View style={{justifyContent: 'space-between', shadowColor: '#BBB', shadowOffset: {width: 0, height: 0}, shadowRadius: 7,borderRadius: 5,  elevation:5, backgroundColor: "white", margin: 10}}>
          <View style={{padding:16}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.product.title}</Text>
              <Text>{props.product.desc}</Text>
              <Text>{props.product.price}</Text>
              <Text>{props.product.author}</Text>
          </View>
          <Button onPress={() => {props.navigation.navigate('Details', {product:props.product})}} color={'#f4511e'} style={{borderTopWidth:1, borderTopColor:'#ccc'}}>
              voir +
          </Button>
      </View>
    );
}

export default ProductCard;
