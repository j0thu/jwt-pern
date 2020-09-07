const express = require('express');
const app = express();
const cors = require('cors');

//MIDDLEWARE
app.use(express.json()); //req.body
app.use(cors());

//Register and Login Routes
app.use('/auth', require('./routes/jwtauth'));
//Dashboard route
app.use('/dashboard',require('./routes/dashboard'));


//SERVER
PORT = 5000;
app.listen(PORT, ()=>{
    console.log(`Server Running on PORT ${PORT}`);
})