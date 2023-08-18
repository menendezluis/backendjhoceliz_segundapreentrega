import { log } from "console";
import utils from "../../utils.js";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { __dirname } from "../../utils.js";

export class ProductManager {
    static product;
    static products;
    static correlativoId = 0;
    constructor(path) {
        this.path = path;
        this.products = [];
    }
    //static correlativoId = 0;
    async addProduct(product) {
        this.products = await this.getProducts();
        if (this.products?.some((el) => el.code === product.code)) {
            let error = new Error("Ya existe un producto con ese código");
            error.statusCode = 400;
            throw error;
        }
        console.log(crypto.randomUUID());
        this.products.push({
            ...product,
            // id: this.products.length > 0
            //     ? this.products[this.products.length - 1].id + 1
            //     : 0,
            id: crypto.randomUUID()
        });
        utils.writeFile(this.path, this.products);
    }
    async getProducts() {
        try {
            let data = await utils.readFile(this.path);
            this.products = data;
            return data?.length > 0 ? this.products : "aun no hay registros";
        } catch (error) {
            console.log(error);
        }
    }
    async getProductById(id) {
        try {
            let data = await utils.readFile(this.path);
            this.products = data?.length > 0 ? data : [];
            let product = this.products.find((dato) => dato.id === id);

            if (product !== undefined) {
                return product;
            } else {
                return "no existe el producto solicitado";
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateProductById(id, data) {
        try {
            let products = await utils.readFile(this.path);
            this.products = products?.length > 0 ? products : [];

            let productIndex = this.products.findIndex((dato) => dato.id === id);
            if (productIndex !== -1) {
                this.products[productIndex] = {
                    ...this.products[productIndex],
                    ...data,
                };
                await utils.writeFile(this.path, products);
                return {
                    mensaje: "producto actualizado",
                    producto: this.products[productIndex],
                };
            } else {
                return { mensaje: "no existe el producto solicitado" };
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id) {
        try {
            let products = await utils.readFile(this.path);
            this.products = products?.length > 0 ? products : [];
            let productIndex = this.products.findIndex((dato) => dato.id === id);
            if (productIndex !== -1) {
                let product = this.products[productIndex];
                this.products.splice(productIndex, 1);
                await utils.writeFile(this.path, products);
                return { mensaje: "producto eliminado", producto: product };
            } else {
                return { mensaje: "no existe el producto solicitado" };
            }
        } catch (error) {
            console.log(error);
        }
    }

    

}

export function obtenerListaDeProductos() {
    const filePath = path.join(__dirname, "./products.json");
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);
    return data;
}

export default ProductManager;

