const fs = require("fs");

class ProductManager {
    id = 0;
    #products;
    #path;

    constructor() {
        this.#products = new Array(),
        this.#path = "./data/products.json"
    }

    #toWrite = async (data) => {
        const file = JSON.stringify(data);
        await fs.promises.writeFile(this.#path, file);
    };

    #toRead = async () => {
        let reading = await fs.promises.readFile(this.#path, "utf-8");
        const read = JSON.parse(reading);
        return read;
    };

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        this.#products = await this.#toRead();

        const product = {
            id: this.id += 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(product);
        await this.#toWrite(this.#products);     
    };

    getProducts = async () => {
        this.#products = await this.#toRead();
        return this.#products;
    };

    getProductById = async (id) => {
        this.#products = await this.#toRead();
        const index = this.#products.find((product) => product.id === id);

        if (index) {
            return index;
        } else {
            return "Não encontrado";
        };
    };

    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        this.#products = await this.#toRead();
        const i = this.#products.find((product) => product.id === id);
        if (i) {
                i.title = title;
                i.description = description;
                i.price = price;
                i.thumbnail = thumbnail;
                i.code = code;
                i.stock = stock;
            };
        await this.#toWrite(this.#products);
    };

    deleteProduct = async (id) => {
        this.#products = await this.#toRead();
        const index = this.#products.findIndex((product) => product.id === id);
        this.#products.splice(index, 1);
        await this.#toWrite(this.#products);
    };
};

module.exports = new ProductManager();
