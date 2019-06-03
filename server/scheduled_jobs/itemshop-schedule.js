const axios = require("axios"); 
const api_url = process.env.UPDATE_SHOP_URL;
const Item = require("../entities/item"); 
const mongoose = require('mongoose'); 

const connectionUrl = process.env.MONGODB_URI;

mongoose.set('useFindAndModify', false); 
mongoose.connect(connectionUrl, {
    useNewUrlParser: true
}); 

mongoose.connection.on("disconnected", function () {
    console.log("Disconnected"); 
})


async function updateDatabase(name, rarity, price, image, date, finished) {
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
    console.log("Updating")
    await Item.findOneAndUpdate({name: name}, {
        name: name,
        rarity: rarity,
        price: price,
        image: image,
        lastSeen: date
    }, options).then((result) => {
        console.log("Yay"); 
        if(finished) {
            mongoose.connection.close(); 
        }
    }).catch((err) => {
        console.log("noo" + err)
    })
}



axios.get(api_url, {
    headers: {
        "x-api-key": process.env.FNBR_API_KEY
    }
}).then((result) => {

    let finished = false; 
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

                updateDatabase(name, rarity, price, image, date, finished);
            }
        });
    }

    if(daily.length > 0) {
        daily.forEach((item, index) => {

            if(item.type.toLowerCase() === "outfit") {
                const name = item.name; 

                const rarity = item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1); 
                const price = item.price.replace(",","");
                let image = item.images.png; 

                if(item.images.png === "false" || item.images.png === false) {
                    image = item.images.icon; 
                }

                if(index >= (daily.length-1)) finished = true; 

                updateDatabase(name, rarity, price, image, date, finished); 

                console.log(index); 
            }
        });

        
    }

})