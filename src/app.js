const express = require('express');
const app = express();
const manager = require('../ProductManager');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    const products = await manager.getProducts()
    if (!limit) {
        res.status(200).json(products);
    } else {
        res.status(200).json(products.slice(0, limit));
    }
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    res.status(200).json(await manager.getProductById(Number(pid)))
});

module.exports = app;