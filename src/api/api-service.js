import axios from "axios"; 


export const fetchAllItems = callback => {
    axios.get("http://localhost:3001/api/items").then((result) => {
        callback(result.data); 
    }).catch((err) => {
        console.log(err); 
    });
} 