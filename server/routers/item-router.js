const express = require("express"); 
const router = express.Router(); 
const Item = require("../entities/item"); 

router.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find({}); 
        console.log(items); 
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

router.put("/api/items/:id", async(req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body); 

        
        if(!item) {
            res.status(404).send("error: Could not find any items with the id " + req.params.id); 
        } else {
        res.send(item);
        }
         
    } catch(err) {
        res.status(400).send("error: Something went wrong: " + err); 
    }
})


module.exports = router; 