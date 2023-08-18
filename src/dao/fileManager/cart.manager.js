import utils from "../../utils.js";

class CartsManager {
    static correlativoId = 0;
    static carts;
    constructor(path) {
        this.carts = [];
        this.correlativoId = 0;
        this.path = path;
    }

    addCart = async () => {
        this.carts = await this.getCarts();
        this.carts.push({
            id: this.carts.length ? this.carts.length : 0,
            products: [],
        });
        utils.writeFile(this.path, this.carts);
    }

    getCarts = async () => {
        try {
            let data = await utils.readFile(this.path);
            return data?.length > 0 ? data : [];
        } catch (error) {
            console.log(error);
        }
    };

    getCartsById = async (id) => {
        this.carts = await this.getCarts(id);
        const cart = this.carts.find((el) => el.id === id);

        if (!cart || cart === undefined) {
            let error = new Error("debe ingresar un id de carrito existente");
            error.statusCode = 400;
            throw error;
        }

        return cart;
    };

    getIndexProductFromCart = async (cart, idProduct) => {
        if (cart.products) {
            const productIndex = cart.products.findIndex(
                (el) => el.id === idProduct
            );
            return productIndex;
        }
        return -1;
    };
    addProductToCart = async (id, idProduct) => {
        this.carts = await this.getCarts();
        let cart = await this.getCartsById(id);

        if (!cart) {
            let error = new Error("no existe carrito");
            error.statusCode = 400;
            throw error;
        }
        const cartIndex = this.carts.findIndex(
            (cart) => cart.id === id
        );

        const productIndex = await this.getIndexProductFromCart(
            cart,
            idProduct
        );

        productIndex !== -1
            ? this.carts[cartIndex].products[productIndex].quantity++
            : this.carts[cartIndex].products.push({
                id: idProduct,
                quantity: 1,
            });

        utils.writeFile(this.path, this.carts);
    };
};

export default CartsManager;