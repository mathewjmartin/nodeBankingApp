const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
const PORT = 5000;

const url = 'mongodb://localhost:27017';

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(bodyParser.json());
