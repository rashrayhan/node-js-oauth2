const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.port || 4600;
const fs = require("fs");
const path = require("path");
const morgan = require('morgan');

const app = express();

//Middlewares 
app.use(express.json());
app.use(cors());
app.use(helmet());
//logging to file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));


//Routes
// app.use('/api/users', require('./routes/userRoutes'));
app.use('/api', (req,res)=>{
    res.send('welcome');
});


//Production Environment
if(process.env.NODE_ENV === 'production'){
    //static folder
    app.use(express.static(__dirname + '/public/'));

    //SPA General Routing
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(port, () => {
    console.log(`App is running on port: ${port}`)
})