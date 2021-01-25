import React, { useState, useEffect} from 'react';
import {Button, View} from "react-native";
import ProductCard from './ProductCard/productCard';
import data from '../../assets/data.json';
import SideComponent from "./sideComponent/sideComponent";

const Home = ({navigation}) => {
    const [types, setTypes] = useState({
        headphones:true,
        bluetooth_speakers:true,
        phones:true,
        tv:true,
    })

    return (
      <View style={{ justifyContent: 'space-between', flexDirection:'row', flexWrap: 'nowrap' }}>
          <SideComponent types={types} onChangeTypes={(v) => {setTypes({...v})}}/>
          <View style={{width:'100%'}}>
              {  data.products.map( (v,k) => (types[v.type] ? (<ProductCard key={'productCard'+k} product={v} navigation={navigation}/>) : null ) )  }
          </View>
      </View>
    );
}

export default Home;

