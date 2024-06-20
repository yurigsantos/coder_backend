class ProductManager {
    products;
    #id = 0;
    constructor() {
        this.products = [];
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        this.#id = this.#id + 1;

        const product = {
            id: this.#id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
    };

    getProductById = (idItem) => {
        const index = this.products.findIndex((product) => {
            return product.id === idItem;
        });
  
        if (this.products[index] === undefined) {
            console.log("Não encontrado");
            return false;
        }
    }
}

const manager = new ProductManager();

manager.addProduct("Elden Ring", "Action RPG", 229, "default.jpeg", 1245620, "digital");
manager.addProduct("FFXIV", "MMORPG", 52, "header.jpeg", 39210, "digital");
console.log(manager.products)