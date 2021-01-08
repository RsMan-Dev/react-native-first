import React, { useState, useEffect} from 'react';
import {Button, View} from "react-native";
import ProductCard from './ProductCard/productCard';
import data from '../../assets/data.json';

const Home = ({navigation}) => {
    const[count, setCount] = useState(0);
    return (
      <View style={{ justifyContent: 'space-around', flexDirection:'row', flexWrap: 'wrap' }}>
          {  data.products.map( (v,k) => ( <ProductCard key={'productCard'+k} product={v} navigation={navigation}/> ) )  }
      </View>
    );
}
/*
<Button title={`CLICK (nb=${count})`} onPress={() => {setCount( count + 1 )}}/>
<Button title={'Allons aux détails'} onPress={() => {navigation.navigate('Details', {count:count})}}/>
*/

export default Home;

