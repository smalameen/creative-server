const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


// var MongoClient = require('mongodb').MongoClient;

var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.iciqq.mongodb.net:27017,cluster0-shard-00-01.iciqq.mongodb.net:27017,cluster0-shard-00-02.iciqq.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-4smygu-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, function(err, client) {
  const collectionOfData = client.db("creative").collection("agency");
  
  app.post("/injectData", (req, res) => {
      const data = req.body;
      collectionOfData.insertOne(data)
      .then(result =>{
          res.send(result.insertedCount > 0)

      })

  })
 
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

app.get('/', (req, res) =>{
    res.send("Hello i am from mongoDB");
})


app.listen(process.env.PORT || port)