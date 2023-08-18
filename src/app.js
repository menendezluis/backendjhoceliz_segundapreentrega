import express from "express";
import mongoose from "mongoose";
import productRouter from "./router/products.router.js";
import cartRouter from "./router/cart.router.js";
import viewsRouter from "./router/views.router.js";
import realtimeRouter from "./router/realTimeProduct.router.js";
import chatRouter from "./router/chat.router.js";
import loginRouter from "./router/login.router.js";
import signupRouter from "./router/signup.router.js";
import sessionRouter from "./router/session.router.js";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { __filename, __dirname } from "./utils.js";
import dotenv from "dotenv";
import MessageModel from "./dao/mongoManager/models/message.model.js";
import ProductModel from "./dao/mongoManager/models/product.model.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser("C0d3rS3cr3t"));
const PORT = process.env.PORT || 3200;
const httpServer = app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`);
});
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Conexion a la base de datos establecida");
    },
    (error) => {
      console.log("Error en la conexion a la base de datos", error);
    }
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 30,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);
app.use("/realtime", realtimeRouter);
app.use("/chat", chatRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/api/session/", sessionRouter);

httpServer.on("error", (err) => {
  console.log(err);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  socket.on("new-user", (data) => {
    socket.user = data.user;
    socket.id = data.id;
  });

  // Manejar eventos personalizados
  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido:", data);

    // Enviar una respuesta al cliente
    socket.emit("respuesta", "Mensaje recibido correctamente");
  });

  // Escuchar evento 'agregarProducto' y emitir 'nuevoProductoAgregado'
  socket.on("agregarProducto", (newProduct) => {
    console.log("Nuevo producto recibido backend:", newProduct);
    // guardarProducto(newProduct);
    productManager.addProduct(newProduct);
    // Agregar el nuevo producto a la lista de productos
    io.emit("nuevoProductoAgregado", newProduct);
  });

  socket.on("delete-product", (productID) => {
    const { id } = productID;
    // deleteProduct(id)
    console.log(id);
    productManager.deleteProductById(id);
    socket.emit("delete-product", id);
  });

  const productos = await ProductModel.find({}).lean();
  socket.emit("update-products", productos);
  socket.on("guardar-mensaje", (data) => {
    MessageModel.insertMany([data]);
  });

  io.emit("nuevo-usuario-conectado", {
    user: socket.user,
    id: socket.id,
  });
  const mensajes = await MessageModel.find({}).lean();
  socket.emit("enviar-mensajes", mensajes);
  socket.on("Nuevos-mensajes", (data) => {
    console.log(data + " nuevos mensajes");
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
