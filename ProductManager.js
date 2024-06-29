const fs = require("fs");

class ProductManager {
    id = 0;
    #products;
    #path;

    constructor() {
        this.#products = new Array();
        this.#path = "./products.json"
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
        //this.#products = await this.#toRead();

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
        const index = this.#products.find((product) => product.id === id);
        if (index) {
                index.title = title;
                index.description = description;
                index.price = price;
                index.thumbnail = thumbnail;
                index.code = code;
                index.stock = stock;
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

main = async () => {
    const manager = new ProductManager();
    
    manager.addProduct("Elden Ring", "Action RPG", 229, "default.jpeg", 1245620, "digital");
    manager.addProduct("FFXIV", "MMORPG", 52, "header.jpeg", 39210, "digital");
    manager.addProduct("Hollow Knight", "Metroidvania", 46, "cover.jpeg", 367520, "digital");
    console.log(await manager.getProducts());
    console.log(await manager.getProductById(1));
    console.log(await manager.getProductById(5));
    await manager.deleteProduct(3);
    await manager.updateProduct(2, "Dawntrail", "MMORPG", 105, "header.jpeg", 2649240, "digital");
    console.log(await manager.getProducts());
};

main()