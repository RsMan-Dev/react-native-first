import React, { useState } from 'react';
import {Text, View, Image} from "react-native";
import {Button} from "react-native-paper";

const ProductCard = (props, {route}) => {
    return (
      <View style={{justifyContent: 'space-between', shadowColor: '#BBB', shadowOffset: {width: 0, height: 0}, shadowRadius: 7,borderRadius: 5,  elevation:5, backgroundColor: "white", margin: 10, overflow:'hidden'}}>
          <View style={{flexDirection: 'row'}}>
              <Image source={{uri:props.product.imgs?props.product.imgs[0]:'https://www.labaleine.fr/sites/default/files/image-not-found.jpg'}} style={{width:130, height: '100%'}}/>
              <View style={{padding:16, flex:1}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}} numberOfLines={1}>{props.product.title}</Text>
                  <Text style={{fontSize: 20}} numberOfLines={1}>{props.product.price}</Text>
                  <Text numberOfLines={1}>de: {props.product.author}</Text>
                  <Text numberOfLines={2}>{props.product.desc}</Text>
              </View>
          </View>
          <Button onPress={() => {props.navigation.navigate('Details', {id:props.product.id})}} color={'#f4511e'} style={{borderTopWidth:1, borderTopColor:'#ccc', borderRadius:0}}>
              voir +
          </Button>
      </View>
    );
}

export default ProductCard;
