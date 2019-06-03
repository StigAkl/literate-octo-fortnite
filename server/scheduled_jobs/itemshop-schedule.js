const axios = require("axios"); 
const api_url = process.env.UPDATE_SHOP_URL || "https://fnbr.co/api/shop"; 
require('./../db/mongoose'); 
const Item = require("../entities/item"); 



function updateDatabase(name, rarity, price, image, date) {
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Item.findOneAndUpdate({name: name}, {
        name: name,
        rarity: rarity,
        price: price,
        image: image,
        lastSeen: date
    }, options, 
    
    function(error, result) {
        if (error) {
            console.log("Something went wrong:", error); 
            return; 
        }
        console.log("Success: " + name + " updated"); 
    });
}

axios.get(api_url, {
    headers: {
        "x-api-key": process.env.FNBR_API_KEY || "024011f1-bc2b-41da-9c08-84c7350f10a1"
    }
}).then((result) => {
    const featured = result.data.data.featured;
    const daily = result.data.data.daily; 
    const date = result.data.data.date; 

    if(featured.length > 0) {
        featured.forEach((item) => {
            if(item.type.toLowerCase() === "outfit") {
                const name = item.name; 

                const rarity = item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1); 
                const price = item.price.replace(",","");
                let image = item.images.png; 

                if(item.images.png === "false" || item.images.png === false) {
                    image = item.images.icon; 
                }

                updateDatabase(name, rarity, price, image, date);
            }
        });
    }

    if(daily.length > 0) {
        daily.forEach((item) => {
            if(item.type.toLowerCase() === "outfit") {
                const name = item.name; 

                const rarity = item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1); 
                const price = item.price.replace(",","");
                let image = item.images.png; 

                if(item.images.png === "false" || item.images.png === false) {
                    image = item.images.icon; 
                }

                updateDatabase(name, rarity, price, image, date); 
            }
        });

        
    }

})