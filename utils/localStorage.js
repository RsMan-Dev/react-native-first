import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from '../assets/data.json';

export async function initLocalStorage() {
    try {
        let dataSaved = await AsyncStorage.getItem('@LeBonCoinCopy:localProducts');
        if( dataSaved ){
            return true;
        } else {
            await AsyncStorage.setItem('@LeBonCoinCopy:localProducts',JSON.stringify(data))
        }
    } catch (error) {
        console.log('can\'t init');
        console.log(error);
        return false;
    }
}

export async function getProducts() {
    try {
        let dataSaved = await AsyncStorage.getItem('@LeBonCoinCopy:localProducts');
        return JSON.parse(dataSaved);
    } catch (error) {
        console.log('can\'t get');
        return false;
    }
}

export async function addProduct(product) {
    try {
        let savedData = JSON.parse(await AsyncStorage.getItem('@LeBonCoinCopy:localProducts'));
        let count = 0;
        savedData.forEach((v,k) => {
            count = k;
        });
        product.id = savedData[count].id+1;
        savedData[count +1] = product;
        await AsyncStorage.setItem('@LeBonCoinCopy:localProducts',JSON.stringify(savedData))
        return savedData;
    } catch (error) {
        console.log('can\'t add');
        return false;
    }
}

export async function removeProduct(id) {
    try {
        let savedData = JSON.parse(await AsyncStorage.getItem('@LeBonCoinCopy:localProducts'));
        let newData = savedData.filter(p => {
            return p.id !== id;
        })
        await AsyncStorage.setItem('@LeBonCoinCopy:localProducts',JSON.stringify(newData))
        return newData;
    } catch (error) {
        console.log('can\'t remove');
        return false;
    }
}
