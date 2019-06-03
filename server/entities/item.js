const mongoose = require('mongoose'); 

const itemSchema = new mongoose.Schema({
    name: {
        type: "String", 
        required: true, 
        trim: true, 
        unique: true
    },
    price: {
        type: Number, 
        required: true, 
        validate(value) {
            if(value !== 800 && value !== 1200 && value !== 1500 && value !== 2000 && value !== -1) {
                throw new Error("Invalid v-bucks price"); 
            }
        }
    },
    rarity: {
        type: String, 
        required: true, 
        trim: true
    }, 
    lastSeen: {
        type: Date,
        required: true
    }, 
    image: {
        type: String,
    },
    obtained: {
        type: String,
        required: true,
        default: "Shop"
    }
}); 

const Item = mongoose.model("Item", itemSchema); 

module.exports = Item; 
