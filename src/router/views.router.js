import { Router } from "express";
import { __filename, __dirname } from "../utils.js";
// import { obtenerListaDeProductos } from "../services/ProductManager.js";
import CartModel from "../dao/mongoManager/models/cart.model.js";
import ProductModel from "../dao/mongoManager/models/product.model.js";
import cookieParser from "cookie-parser";

function auth(req, res, next) {
  console.log(req.session);
  if (req.session?.user && req.session?.admin) {
    console.log("auth");
    return next();
  }
  return res.status(401).json("error de autenticacion");
}

const productRouter = Router();
/* 
productRouter.get("/", (req, res) => {
    const products = obtenerListaDeProductos();

    res.render("home", { products });
});
 */

productRouter.get("/", auth, async (req, res) => {
  const cart = await CartModel.find();
  const cartId = cart ? cart[0]._id : null;
  const { limit = 3, page = 1, sort, query } = req.query;
  const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
    await ProductModel.paginate(query ? { category: query } : {}, {
      limit,
      page,
      lean: true,
      sort: sort ? { price: 1 } : { price: -1 },
    });
  res.render("home", {
    title: "products",
    cartId,
    products: docs,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    limit,
    sort,
    query,
    script: "products.js",
  });
});

export default productRouter;
