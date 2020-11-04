const mi = require('mongoimport');

const config = {
    fields: [],
    db: 'leaguepeople',
    collection: 'collection',
    host: '',
    username: 'tristan',
    password: 'tristan',
    callback: (err, db) => { console.log(err) }
}



mi(config);