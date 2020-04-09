const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const port = 5000;
const ObjectId = require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/', (req, res) => res.send('Welcome to your Banking app'));

app.use(bodyParser.json());

app.get('/customerAccounts', (req, res) => {

    MongoClient.connect(url, { useUnifiedTopology: true },
        async (err, client) => {
            console.log('successfully connected to MongoDB');
            let db = client.db('nodeBankingApp');

            let customerAccounts = await getCustomerAccounts(db);

            res.json(customerAccounts);

        })

})

const getCustomerAccounts = async (db) => {
        let collection = db.collection('customerAccounts');
        let result = await collection.find({}).toArray();
        return result;
}

app.post('/customerAccounts', jsonParser, (req, res) => {

    const newAccount = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        accountNumber: req.body.accountNumber,
        balance: req.body.balance,
    }

    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
        let db = client.db('nodeBankingApp')
        let result = await addNewAccount(db, newAccount)
        if(result.insertedCount ===1){
            res.send('New account added')
        } else {
            res.send('There was an error adding new account')
        }
        client.close()
    })
})

var addNewAccount = async (db, newAccountToSend) => {
    let collection = db.collection('customerAccounts')
    let result = await collection.insertOne(newAccountToSend)
    return result
}

app.listen(port, () => console.log(`Banking app listening on port ${port}`));