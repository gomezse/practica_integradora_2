import { Router } from 'express';
import { cartsManager } from '../dao/models/mongoose/CartsManager.js';

const router = Router();

//new cart
router.post("/", async (req, res) => {
    try {
        const newCart = await cartsManager.createCart();
        res.status(200).json({ message: 'Cart created', cart: newCart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


//getById
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsManager.getCartById(cid);
        if (!cart) {
            return res.status(404).json({ message: `No cart found with that id ${cid}` });
        }
        res.status(200).json({ message: 'Cart found', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//add product to cart
router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const newProduct = await cartsManager.addProductToCart(cid, pid);
        res.status(200).json({ message: 'Product added to cart', product: newProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//delete product from cart
router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const deleteProduct = await cartsManager.removeProductToCart(cid, pid);
        res.status(200).json({ message: 'Product remove to cart', product: deleteProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//delete all products from cart
router.delete("/:cid", async (req, res) => {
    const { cid} = req.params;

    try {
        const deleteProduct = await cartsManager.removeAllProductsToCart(cid);
        res.status(200).json({ message: 'Products removed to cart', product: deleteProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//update
router.put("/:cid/products/:pid", async (req, res) => {
    const { cid,pid } = req.params;
    const {quantity } = req.body;

    try {
        const updateResult = await cartsManager.updateQuantityProduct(cid,pid,quantity);

        if (updateResult) {            
            // Devuelve el producto actualizado en la respuesta
            res.status(200).json({ message: 'Product updated', product: updateResult });
        } else {
            // En caso de que no se encuentre el producto para actualizar
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//update array of products.
router.put("/:cid", async (req, res) => {
    const { cid} = req.params;
    const {products } = req.body;

    try {
        const updatedCart = await cartsManager.updateAllProducts(cid, products);        
        res.status(200).json({ message: 'Products updated', cart: updatedCart });
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
});




export default router;