import axios from "axios"; 
import config from '../config.json'; 
import items from './dummy.json'; 

module.exports = fetchAllItems = callback => {
    
    const url = process.env.REACT_APP_API_URL || "http://localhost:3001/api/items";
    if(config.useDatabase) {
        axios.get(url).then((result) => {
            callback(result.data); 
        }).catch((err) => {
            console.log(err); 
        });
    } 
    else {
        callback(items); 
    }
} 