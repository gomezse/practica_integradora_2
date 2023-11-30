import { Router } from "express";

import { productsManager } from "../dao/models/mongoose/ProductsManager.js"
import { cartsManager } from "../dao/models/mongoose/CartsManager.js";

const router = Router();

router.get(`/`, async (req, res) => {
    const products = await productsManager.findAll(req.query);
    res.render("chat",{products,style:'index'});
  
  });

  router.get(`/products`, async (req, res) => {
    const products = await productsManager.findAll(req.query);
    const {payload,totalPages,page,nextLink,prevLink,hasNextPage,hasPrevPage}=products;
    const productsObject = payload.map(product => product.toObject());

    res.render('home', { product : productsObject,page:page,next:nextLink,prev:prevLink,hasNext:hasNextPage,hasPrev:hasPrevPage,totalPages:totalPages });
  
  });

  router.get(`/carts/:cid`, async (req, res) => {
    const {cid}=req.params;
    const cart = await cartsManager.getCartById(cid);
    const cartObject = cart.products.map(product => product.toObject());
  
    res.render('cart', { cart : cartObject});
  });

  router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile");
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    if (req.session.user) {
        return res.redirect("/profile");
    }
    res.render("signup");
});

router.get("/profile", async (req, res) => {
    if (!req.session.passport) {
        return res.redirect("/login");
    }

    //obtengo listado de productos.
    const products = await productsManager.findAll(req.query);

    if (!products.payload.length) {
        return res.status(200).json({ message: 'No products' });
    }

    const { payload } = products;
    const productsObject = payload.map(product => product.toObject());

    res.render("profile", { products: productsObject, user: req.user.toObject() });
});

router.get("/restaurar", (req, res) => {
    res.render("restaurar");
  });
  
  router.get("/error", (req, res) => {
    res.render("error");
  });
export default router;