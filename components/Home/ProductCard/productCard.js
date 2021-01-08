import React, { useState } from 'react';
import {Text, View, Button, Image, Dimensions} from "react-native";

const ProductCard = (props, {route}) => {

    let innerWidth = Dimensions.get('window').width;
    let cw = innerWidth < 400 ? innerWidth - 32 : (innerWidth < 768 ? innerWidth/2 - 32 : (innerWidth < 1200 ? innerWidth/3 - 32 : innerWidth/4 - 32));
    let [cardWidth, setCardWidth] = useState(cw);
    Dimensions.addEventListener('change', () => {
        innerWidth = Dimensions.get('window').width;
        cw = innerWidth < 400 ? innerWidth - 32 : (innerWidth < 768 ? innerWidth/2 - 32 : (innerWidth < 1200 ? innerWidth/3 - 32 : innerWidth/4 - 32));
        setCardWidth(cw);
    })
    return (
      <View style={{justifyContent: 'space-between', boxShadow:"0 0 10px 0 lightgrey", backgroundColor: "white", width: cardWidth, marginTop: 16, margin: 10}}>
          <Image source={require(`../../../assets/${props.product.imgs[0]}`)} style={{ width: '100%', height: 120 }}/>
          <View style={{padding:16}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>{props.product.title}</Text>
              <Text>{props.product.desc}</Text>
              <Text>{props.product.price}</Text>
              <Text>{props.product.author}</Text>
          </View>
          <Button title={'voir +'} onPress={() => {props.navigation.navigate('Details', {product:props.product})}} style={{backgroundColor: '#EEE'}}/>
      </View>
    );
}

export default ProductCard;
