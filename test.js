const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.post('/api/products', (req, res, next) => {
    const produit = new Product({
        ...req.body
    });
    produit.save()
        .then((product) => res.status(201).json({ product}))
        .catch(error => res.status(400).json({error}));
        
});


module.exports = app;