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

var getCustomerAccounts = async (db) => {
        let collection = db.collection('customerAccounts');
        let result = await collection.find({}).toArray();
        return result;
}

app.listen(port, () => console.log(`Banking app listening on port ${port}`));