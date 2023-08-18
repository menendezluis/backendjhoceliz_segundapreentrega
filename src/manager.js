import { ProductManager } from "./ProductManager.js";
import { __dirname } from "./utils.js";

console.log("dirname", __dirname);
let firtStore = new ProductManager("products.json");
firtStore.getProducts().then((data) => console.log(data));
/* firtStore.addProduct(
    "Producto 1",
    "Descripción 1", 
    100,
    "imagen1.jpg", 
    "code1a" + Math.floor(Math.random() * (100 - 1) + 1), 
    10
); */ 

// firtStore.getProducts().then((data) => console.log("get producto", data));
/* firtStore.getProductById("2dc92c1c-9715-4664-ac7c-0efe613a58b0")
.then((data) => console.log("get product by id",data)); */

// console.log("desde getProducts", firtStore.getProducts());


/* firtStore.updateProductById("1c36a5e7-578c-446f-a9ee-a4a4f2db7b79", {
    title: "camisa",
    description: "camisa 100% algodon",
    price: 3009,
    thumbnail: "image",
    code: "camisa",
    stock: 10,
})
    .then((data) => console.log("resultados", data)) */
    

/* firtStore.deleteProductById("1c36a5e7-578c-446f-a9ee-a4a4f2db7b79")
.then((data) => console.log("eliminado", data));  
 */


















