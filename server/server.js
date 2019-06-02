const express = require('express');
const favicon = require('express-favicon'); 
const path = require('path');
const cors = require('cors');  
const cheerio = require('cheerio'); 
const request = require('request'); 
const axios = require('axios'); 
const Jetty = require("jetty"); 
const port = process.env.PORT || 3001; 
const app = express(); 
const itemRouter = require("./routers/item-router");

const jetty = new Jetty(process.stdout); 
//const Item = require("./entities/item"); 

require('./db/mongoose'); 

// Item.find({}).then((items) => {
//     items.forEach((item) => {
//         item.obtained="shop";

//         item.save((err, saved) => {
//             if(err) {
//                 console.log("Error saving item:", err); 
//             } else {
//                 console.log("Item saved:", saved); 
//             }
//         })
//     }) 
// })

app.use(cors());
app.options('*', cors());
app.use(favicon(__dirname + '/../build/favicon.ico')); 
app.use(express.json())
app.use(express.static(__dirname)); 
app.use(express.static(path.join(__dirname, '/../build')));
app.use(itemRouter); 

app.get('/ping', (req, res) => {
    res.send('pong'); 
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build', 'index.html')); 
}); 


function getMonthName(date) {
    const months = ["january", "february", "march","april", "may", "june", "july", "august", "september", "october", "november", "december"];
    return months[date.getMonth()]; 
}

app.get('/kake', async (req, res) => {

    jetty.clear(); 
    let numItems = 0; 
    const now = new Date(); 
    let delay = 0; 
    for (let d = new Date(2017, 9, 30); d <= now; d.setDate(d.getDate() + 1)) {

        delay = delay + 800; 
        let month = getMonthName(d); 
        let day = d.getDate(); 
        let year = d.getFullYear(); 

        let formatted = month + "-" + day + "-" + year; 

        let url = "https://fnbr.co/shop/"+formatted;

        setTimeout(() => {
            request({url: url}, (err, response, body) => {

                if(err) {
                    console.log("Somethign went wrong when fetching source code:", err); 
                } else {
                let strippedBody = body.replace(/<!--[\s\S]*?-->/g, "");
    
                const $ = cheerio.load(strippedBody); 
    
                let list = []; 
    
                $('.itemname').each(function () {
                    var span = $(this).find("span").text(); 
                    list.push(span); 
                })
    
                list = [...new Set(list)]
    
                list.forEach((item) => {
                    axios.get('https://fnbr.co/api/images?type=outfit&search=' + item, {
                        headers: {
                            "x-api-key": "....."
                        }
                    }).then((response) => {
                        let result = response.data.data; 

                        if(result.length === 0) {
                            jetty.moveTo([0,0])
                            jetty.text("No image found for " + item); 
                        } else {

                            let image = result[0].images.png; 
                            let rarity = result[0].rarity.charAt(0).toUpperCase() + result[0].rarity.slice(1); 
                            let priceFormat = result[0].price.replace(",","").trim();
                            let price = isNaN(priceFormat) ? "-1" : priceFormat; 
                            let obtained = price === "-1" ? result[0].price : "Shop"; 
                            let lastSeen = d; 
                            axios.post("http://localhost:3001/api/items", {
                                name: item, 
                                price: price, 
                                rarity: rarity, 
                                lastSeen: lastSeen,
                                obtained: obtained,
                                image: image
                            }
                            ).then((result) => {
                                jetty.clear(); 
                                numItems = numItems + 1; 
                                jetty.moveTo([1,0]);
                                jetty.text("Item saved: " + item); 
                                jetty.moveTo([2,0]);
                                jetty.text("Items saved:" + numItems);
                                jetty.moveTo([3,0]);   
                                jetty.text("Date:" + d); 
                            }).catch((e) => {
                               // console.log("Something went wrong when saving " + item + ":", e.response.data.error); 
                            })
                        }

                    }).catch((e) => {
                        console.log("Something went wrong contacting fortnite api", e); 
                    })
                })
             
                }
            })
        }, delay); 
    }
    res.send("Hei"); 
})




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../build', 'index.html'))
})


app.listen(port); 

