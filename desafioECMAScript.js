class ProductManager {
    #products;
    #id = 0;
    constructor() {
        this.#products = [];
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
            stock
        }
    }
    getProductById
}