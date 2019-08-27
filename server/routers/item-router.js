const express = require("express"); 
const router = express.Router(); 
const Item = require("../entities/item"); 
const axios = require('axios');

router.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find({}); 
        res.send(items); 
    } catch(e) {
        res.send("Kake") 
    } 
});

router.post("/api/items", async(req, res) => {
    try {
        const item = new Item(req.body); 
        await item.save(); 
        res.status(201).send(item); 
    } catch(e) {
        res.status(400).send({
            error: "Could not create item: " + e
        }); 
    }
})

router.put("/api/items/:name", async(req, res) => {
    try {

        console.log(req.params.name + " + updated last seen: " + req.body.lastSeen); 
        const item = await Item.findOneAndUpdate({name: req.params.name}, req.body, {
            new: true
        }); 

        if(!item) {
            res.status(404).send("error: Could not find any items with the id " + req.params.id); 
        } else {
        res.send(item);
        }
         
    } catch(err) {
        res.status(400).send("error: Something went wrong: " + err); 
    }
})


router.get("/setfeatured", async (req, res) => {

    try {
        const items = await Item.find({}); 

        let delay = 0; 
        items.forEach((item) => {

            delay = delay + 800; 

            setTimeout(() => {

                let url = "https://fnbr.co/api/images?search=" + item.name; 

                axios.get(url, {
                    headers: {
                        "x-api-key": "024011f1-bc2b-41da-9c08-84c7350f10a1"
                    }
                }).then((result) => {

                    let data = result.data.data[0]; 
                    let image = data.images.png; 

                    if(image==="false" || image===false) {
                        image = data.images.featured; 
                    }

                    if(image === "false" || image === false) {
                        image = data.images.icon; 
                    }
                    
                    Item.findOneAndUpdate({name: item.name}, {image: image}).then((result) => {
                        console.log(item + " updated"); 
                    }).catch((error) => {
                        console.log("Something went to hell.. and is still burning"); 
                    })
                }).catch((err) => {
                    console.log("Failed to retreive " + item); 
                })

            }, delay); 

        })
    } 
    
    catch(err) {
        console.log()
    }
});  


module.exports = router; 