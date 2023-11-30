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

export default router;