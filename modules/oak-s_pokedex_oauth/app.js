const express = require("express");
const basicAuth = require('express-basic-auth');
const bcrypt = require('bcrypt');
const cors = require("cors");


const {User, Pokemon} = require('./models');

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());
app.use(cors());
//compares username + password with what's in the database
// Returns boolean indicating if password matches
async function dbAuthorizer(username, password, callback){
  try {
    // get user from DB
    const user = await User.findOne({where: {name: username}})
    // isValid == true if user exists and passwords match, false if no user or passwords don't match
    let isValid = (user != null) ? await bcrypt.compare(password, user.password) : false;
    callback(null, isValid); //callback expects null as first argument
  } catch(err) {
    console.log("It\'s Team Rocket!!!", err)
    callback(null, false);
  }
}

app.use(basicAuth({
  authorizer : dbAuthorizer, //custom authorizer fn
  authorizeAsync: true, //allow our authorizer to be async
  unauthorizedResponse : () => 'Who\'s that pokemon?!'.toUpperCase()
}))

app.get('/', (req, res) => {
  res.send('<h1>Hello!!!!</h1>')
})

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.get('/pokemon', async (req, res) => {
    let pokemon = await Pokemon.findAll()
    res.json({pokemon});
})

app.get('/pokemon/:id', async(req, res)=> {
  let pokemon = await Pokemon.findByPk(req.params.id);
  res.json({pokemon});
})

app.post('/add-pokemon', async (req, res) => {
  let pokemon = await Pokemon.create(req.body);
  res.json({pokemon});
})

app.delete('/delete-pokemon/:id/:pokemon', async(req, res)=> {
  let pokemon = await Pokemon.destroy({where: {
    id: req.params.id,
    name: req.params.pokemon
  }});
  res.json({pokemon});
})

app.put('/pokemon/:id', async(req, res)=> {
  let updatedPokemon = await Pokemon.update(req.body, {
    where: {id: req.params.id}
  });
  res.json({updatedPokemon})
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});