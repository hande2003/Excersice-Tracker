require("dotenv").config();
const express = require("express");
const app = express();
const newUser = require("./models/user");
const bodyParser = require("body-parser");
const excersiceRoute = require("./routes/excersice");
const logs = require('./routes/userLogs')

app.set('views', process.cwd() +'/views/resultFiles');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    return res.sendFile(process.cwd() + '/views/index.html');
})

app.use('/public', express.static(process.cwd() + '/public'));

app.post('/api/users', async(req, res)=>{
    
    req.username = req.body.username;    

    if(req.username){    
        await newUser(req.username)
        .then((result)=>{
            return res.status(201).render('newUser', {username: req.username, _id: result.insertedId});
        })
    }
    else{
        return res.status(400).json({error: "Username cannot be empty"});
    } 
})

// app.get('/api/users', (req, res)=>{
//   (async() =>{
//     return await users.allUsers();
//   })().then((result)=>{
//     return res.status(200).send(result);
//   })
// })

app.use('/api/users',excersiceRoute);

app.use('/api/users', logs);

app.listen(process.env.PORT, ()=>{
    console.info(`Your Applicaltion is running on port ${process.env.PORT}`)
});

