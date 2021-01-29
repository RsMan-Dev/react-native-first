import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from '../assets/data.json';

export async function initLocalStorage() {
    try {
        let dataSavedProducts = await AsyncStorage.getItem('@LeBonCoinCopy:localProducts');
        if( dataSavedProducts ){
        } else {
            await AsyncStorage.setItem('@LeBonCoinCopy:localProducts',JSON.stringify(data))
        }
        let dataSavedUser = await AsyncStorage.getItem('@LeBonCoinCopy:user');
        if( dataSavedUser ){
            return true;
        } else {
            await AsyncStorage.setItem('@LeBonCoinCopy:user', "{}")
        }
        return true;
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
    }s
}

export async function addProduct(product) {
    try {
        let savedData = JSON.parse(await AsyncStorage.getItem('@LeBonCoinCopy:localProducts'));
        let count = 0;
        savedData.products.forEach((v,k) => {
            count = k;
        });
        product.id = savedData.products[count].id+1;
        savedData.products[count +1] = product;
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


//en principe, on sauvegarde un JWT... mais cette application n'a pas pour but d'être publiée
export async function getUser() {
    try {
        let dataSaved = await AsyncStorage.getItem('@LeBonCoinCopy:user');
        return JSON.parse(dataSaved);
    } catch (error) {
        console.log('can\'t get');
        return false;
    }
}

export async function setUser(user) {
    try {
        await AsyncStorage.setItem('@LeBonCoinCopy:user',JSON.stringify(user))
        return user;
    } catch (error) {
        console.log('can\'t set');
        return false;
    }
}

export async function delUser() {
    try {
        await AsyncStorage.setItem('@LeBonCoinCopy:user',JSON.stringify({}))
        return {};
    } catch (error) {
        console.log('can\'t del');
        return false;
    }
}
