import mongoose from "mongoose";

const URI = "mongodb+srv://gomezse:root@ecommerce.sp5zu8k.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("Conectado a la base de datos"))
  .catch((error) => console.log(error));