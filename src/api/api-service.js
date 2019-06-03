import axios from "axios"; 
import config from '../config.json'; 
import items from './dummy.json'; 

export const fetchAllItems = callback => {
    
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api/items"
    if(config.useDatabase) {
        axios.get(API_URL).then((result) => {
            callback(result.data); 
        }).catch((err) => {
            console.log(err); 
        });
    } 
    else {
        callback(items); 
    }
} 