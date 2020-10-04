const router = require('express').Router();
const pool = require('../db.js');
const bcrypt = require('bcrypt');

const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');
//REGISTER
router.post('/register', validInfo, async(req, res)=>{
    try {
        //1. Destructure req.body(name, email, password)
        const {name, email, password} = req.body;

        //2. Check if the user exists(if exists, throw error)
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

        if(user.rows.length!==0){
            res.status(401).send('User already exists');
        }

        //3. Bcrypt the user passsword
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. Enter the new user inside the database
        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *', [name, email, bcryptPassword]);
        // res.json(newUser.rows[0]);

        //5. Generating the jwt token
        const token = await jwtGenerator(newUser.rows[0].user_id);
        res.json({token});
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    } 
})

//LOGIN
router.post('/login',validInfo, async(req, res)=>{
    try {
        // Destructure req.body
        const {email, password} = req.body;

        //If the user does not exist, throw error
        const user = await pool.query('SELECT * FROM users WHERE user_email=$1', [email]);
        if(user.rows.length===0){
            return res.status(401).json('Email or Password is incorrect');
        }

        //Check if the incoming password is same as the DB password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        // console.log(validPassword);
        if(!validPassword){
            res.status(401).json('Email or Password is incorrect');
        }

        //Give them the jwt token     
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/is-verify',authorization, async(req, res)=>{
    try {
        res.json(true);
    } 
    catch (err) {
        console.error(err.message);
        res.send(500).send('Server Error');
    }
})

module.exports = router;     