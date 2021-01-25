import React, { useState } from 'react';
import {Button, Image, Text, View, CheckBox} from "react-native";

const SideComponent = (props, {route}) => {

    return (
        <View style={{boxShadow:"0 0 10px 0 lightgrey", backgroundColor: "white", flexDirection:'column', width: 200, padding: 16, paddingTop: 32}}>
            <Text>Type:</Text>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <CheckBox value={props.types.headphones} onValueChange={(newVal) => { props.onChangeTypes(Object.assign(props.types,{headphones:newVal}))} } style={{marginRight:8}}/><Text>écouteurs</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <CheckBox value={props.types.bluetooth_speakers} onValueChange={(newVal) => { props.onChangeTypes(Object.assign(props.types,{bluetooth_speakers:newVal}))} } style={{marginRight:8}}/><Text>Enceintes bluetooth</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <CheckBox value={props.types.phones} onValueChange={(newVal) => { props.onChangeTypes(Object.assign(props.types,{phones:newVal}))} } style={{marginRight:8}}/><Text>téléphones</Text>
            </View>
            <View style={{flexDirection:'row', alignItems: 'center'}}>
                <CheckBox value={props.types.tv} onValueChange={(newVal) => { props.onChangeTypes(Object.assign(props.types,{tv:newVal})) } } style={{marginRight:8}}/><Text>télés</Text>
            </View>
        </View>
    );
}

export default SideComponent;
