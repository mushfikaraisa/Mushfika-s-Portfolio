const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const {sequelize} = require('./db');
const {User, Pokemon} = require('./models');

const createUsers = async () => {

    let pw1 = await bcrypt.hash('1234567', 2)
    let pw2 = await bcrypt.hash('0123456', 2)
    let pw3 = await bcrypt.hash('5678901', 2)

    const users = [
        {name : 'Damon', password: pw1},
        {name : 'Antony', password : pw2},
        {name : 'Mushfika', password : pw3}
    ];

    return users
}

const pokemon = [
    {name: 'Pikachu', type: 'Electric'},
    {name: 'Lucario', type:'Fighter'},
    {name: 'Blaziken', type:'Fire'},
    {name: 'Mewto', type:'Psychic'},
    {name: 'Mew', type:'Psychic'},
    {name: 'Charizard', type:'Fire'},
    {name: 'Blastoise', type:'Water'},
    {name: 'Charmander', type:'Fire'},
    {name: 'Squirtle', type:'Water'},
    {name: 'Geodude', type:'Earth'},
    {name: 'Angelina', type:'Jolie'}
];


const seed = async () => {

    await sequelize.sync({ force: true });

    const users = await createUsers(); // create users w/ encrypted passwords

    const userPromises = users.map(user => User.create(user))
    const pokemonPromises = pokemon.map(pokemon => Pokemon.create(pokemon))
    await Promise.all([...userPromises, ...pokemonPromises]);
    console.log("db populated!")
}

seed();