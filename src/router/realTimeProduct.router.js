import { Router } from "express";
import { __filename, __dirname } from "../utils.js";
import {
    obtenerListaDeProductos,
} from "../dao/fileManager/product.manager.js"; 


const realtimeRouter = Router();

realtimeRouter.get("/", (req, res) => {
const products = obtenerListaDeProductos();
res.render("realTimeProducts", { products });
});

export default realtimeRouter;