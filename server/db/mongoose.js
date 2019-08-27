const mongoose = require('mongoose'); 

const connectionUrl = process.env.MONGODB_URI || "asd"

mongoose.set('useFindAndModify', false); 
mongoose.connect(connectionUrl, {
    useNewUrlParser: true
}); 

