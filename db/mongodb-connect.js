const mongoose = require('mongoose');
const config = require('./mongodb-config.json');

let URI = `mongodb+srv://${config.dbuser}:${config.dbpsw}@${config.dbcluster}.mozu0.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
//const connectionString = 'mongodb+srv://dev:dev@cluster0.mozu0.mongodb.net/plataforma?retryWrites=true&w=majority';

console.log(URI);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database", err);
});

module.exports = mongoose;