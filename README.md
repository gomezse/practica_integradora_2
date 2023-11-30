# pf_pre-entrega_1
Proyecto Final Backend. Pre-entrega n°2

*******Consideraciones:



**En src/data/productos.json se encuentran ejemplos de productos para cargar....

**Imagenes random para colocar en thumbnails a la hora de crear un producto.
 - "https://cdn-iibml.nitrocdn.com/mIsZFyqRlkiNfZRugfIBKtdyexDtafZx/assets/images/optimized/rev-99e5996/image/cache/catalog/products_2023/samsung-galaxy-a14-black-1-800x800.png"
 -"https://images.samsung.com/is/image/samsung/latin-led-ls19d300hy-ls19d300hy-zp-006-front-black-47897111"
 -"https://redragon.es/content/uploads/2021/09/HYLAS.png"
 -"https://png.pngtree.com/png-clipart/20230315/ourmid/pngtree-dog-cute-animal-realistic-png-image_6646934.png"
 -"https://png.pngtree.com/png-clipart/20220124/ourmid/pngtree-beautiful-puppy-free-elements-png-image_4255768.png"

**endpoints

*Products
-getById
get->http://localhost:8084/api/products/:pid

-update
put->http://localhost:8084/api/products/:pid

-getAll
get->http://localhost:8084/api/products?limit=number

-delete
    del->http://localhost:8084/api/products/:pid
-create
    post->http://localhost:8084/api/products/

*Carts
-create
post->http://localhost:8084/api/carts/

-getById
get->http://localhost:8084/api/carts/:cid

-addProductToCart
post->http://localhost:8084/api/carts/:cid/product/:pid



