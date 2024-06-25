const fs = require("fs");

class ProductManager {
    #products;
    #id = 0;
    #path;
    constructor() {
        this.#products = [],
        this.#path = "./data/products.json"
    };

    addProduct = (title, description, price, thumbnail, code, stock) => { //recebe um objeto e adiciona na array
        this.#id = this.#id + 1;

        const product = {
            id: this.#id,
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
        let file = fs.readFileSync(this.#path, "utf-8");
        console.log(file);
        return file;
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
/*
    updateProduct = (id, update) => {

    };
    
    deleteProduct = (id) => {
        
    };*/
};

const manager = new ProductManager();

manager.addProduct("Elden Ring", "Action RPG", 229, "default.jpeg", 1245620, "digital");
manager.addProduct("FFXIV", "MMORPG", 52, "header.jpeg", 39210, "digital");
manager.addProduct("Hollow Knight", "Metroidvania", 46, "cover.jpeg", 367520, "digital");
manager.getProducts();
manager.getProductById(1);
manager.getProductById(5);
//manager.deleteProduct(3);
manager.getProducts();