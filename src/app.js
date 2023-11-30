import express from "express";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import { messagesManager } from "./dao/models/mongoose/MessagesManager.js";
import { productsManager } from "./dao/models/mongoose/ProductsManager.js";
//DB
import "./config/database/mongoose/configDB.js";

import cookieParser from "cookie-parser";
import passport from "passport";
import "./passport.js";

//configuracion del servidor
const app = express();
const PORT = 8080;



const URI ="mongodb+srv://gomezse:root@ecommerce.sp5zu8k.mongodb.net/";

app.use(
  session({
     store: new MongoStore({
      mongoUrl: URI,
    }),
    secret: "secretSession",
    cookie: { maxAge: 90000 },
  })
);




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(passport.initialize());

// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions");
app.use("/", viewsRouter);

const httpServer= app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
});


// Crear un servidor de sockets (Socket.io) y asociarlo al servidor HTTP
const socketServer = new Server(httpServer);


// Gestionar eventos de conexión de clientes
socketServer.on("connection", async (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  const productsList = await productsManager.findAll();  
  socketServer.emit("listProducts", productsList);

  socket.on("message", async (infoMessage) => {
    
    await messagesManager.createOne(infoMessage);
    const messages = await messagesManager.getMessages();
    socketServer.emit("chat", messages);
  });

  socket.on("newUser", (user) => {
    socket.broadcast.emit("userConnected", user);
    socket.emit("connected");
  });
  
});



