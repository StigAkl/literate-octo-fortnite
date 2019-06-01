import axios from "axios"; 
import config from '../config.json'; 
import items from './dummy.json'; 

export const fetchAllItems = callback => {
    
    if(config.useDatabase) {
        axios.get("http://localhost:3001/api/items").then((result) => {
            callback(result.data); 
        }).catch((err) => {
            console.log(err); 
        });
    } 
    else {
        callback(items); 
    }
} 