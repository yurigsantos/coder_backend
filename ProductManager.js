const fs = require("fs");

class ProductManager {
    id = 0;
    #products;
    #path;

    constructor() {
        this.#products = [],
        this.#path = "./products.json"
    }

    #toWrite = (data) => {
        const file = JSON.stringify(data);
        fs.writeFileSync(this.#path, file);
    };

    #toRead = () => {
        let reading = fs.readFileSync(this.#path, "utf-8");
        const read = JSON.parse(reading);
        return read;
    };

    addProduct = (title, description, price, thumbnail, code, stock) => {
        this.id = this.id +1;

        const product = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(product);
        this.#toWrite(this.#products);     
    };

    getProducts = () => {
        this.#products = this.#toRead();
        console.log(this.#products);
    };

    getProductById = (id) => {
        this.#products = this.#toRead();
        const index = this.#products.find((product) => product.id === id);

        if (index === undefined) {
            console.log("Não encontrado");
        } else {
            console.log(index);
        };
    };

    updateProduct = (id, title, description, price, thumbnail, code, stock) => {
        this.#products = this.#toRead();
        const index = this.#products.find((product) => product.id === id);
        if (index) {
                index.title = title;
                index.description = description;
                index.price = price;
                index.thumbnail = thumbnail;
                index.code = code;
                index.stock = stock;
            };
        this.#toWrite(this.#products);
    };

    deleteProduct = (id) => {
        this.#products = this.#toRead();
        const index = this.#products.findIndex((product) => product.id === id);
        this.#products.splice(index, 1);
        this.#toWrite(this.#products);
    };
};

const manager = new ProductManager();

manager.addProduct("Elden Ring", "Action RPG", 229, "default.jpeg", 1245620, "digital");
manager.addProduct("FFXIV", "MMORPG", 52, "header.jpeg", 39210, "digital");
manager.addProduct("Hollow Knight", "Metroidvania", 46, "cover.jpeg", 367520, "digital");
manager.getProducts();
manager.getProductById(1);
manager.getProductById(5);
manager.deleteProduct(3);
manager.getProducts();
manager.updateProduct(2, "Dawntrail", "MMORPG", 105, "header.jpeg", 2649240, "digital");
manager.getProducts();