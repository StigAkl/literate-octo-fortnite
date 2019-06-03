const mongoose = require('mongoose'); 

const connectionUrl = process.env.MONGODB_URI || "mongodb://heroku_g461gk83:278ejiercpuo6lihadr1fbbqss@ds263876.mlab.com:63876/heroku_g461gk83"

mongoose.set('useFindAndModify', false); 
mongoose.connect(connectionUrl, {
    useNewUrlParser: true
}); 

