import axios from "axios"; 


export const fetchAllItems = callback => {
    let items = []; 

    let aerial = {
        id: 14124124, 
        name: "Aerial Threat", 
        price: 1200,
        available: "1992" 
    }

    items.push(aerial); 

    for(let i = 0; i < 20; i++) {
        let item = {
            id: i,
            name: "Test" + i,
            price: Math.random() * 5000,
            available: "1992"
        }

        items.push(item); 
    }

    callback(items); 
} 