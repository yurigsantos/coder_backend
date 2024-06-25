const fs = require("fs");

class ProductManager {
    id = 0;
    #products;
    #path;

    constructor() {
        this.#products = [],
        this.#path = "./data/products.json"
    }

    addProduct = (title, description, price, thumbnail, code, stock) => { //recebe um objeto e adiciona na array

        const product = {
            id: this.id++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(product);
        const file = JSON.stringify(this.#products);
        fs.writeFileSync(this.#path, file);
    };

    getProducts = () => { //deve ler o arquivo e voltar todos da array
        let consult = fs.readFileSync(this.#path, "utf-8");
        console.log(consult);
        return consult;
    };

    getProductById = (id) => { //recebe id, faz leitura e volta o objeto
        const index = this.#products.find((product) => product.id === id);

        if (index === undefined) {
            console.log("Não encontrado"); 
            return false;
        } else {
            console.log(index);
            return index;
        };
    };
};

const manager = new ProductManager();

manager.addProduct("Elden Ring", "Action RPG", 229, "default.jpeg", 1245620, "digital");
manager.addProduct("FFXIV", "MMORPG", 52, "header.jpeg", 39210, "digital");
manager.addProduct("Hollow Knight", "Metroidvania", 46, "cover.jpeg", 367520, "digital");
manager.getProducts();
manager.getProductById(1);
manager.getProductById(5);