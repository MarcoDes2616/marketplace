const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const initModels = require("./models/initModels");
const db = require("./utils/database");
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const productsRoutes = require("./routes/products.routes");
const uploadRoutes = require("./routes/upload.routes");
const path = require('path');
const errorHandlerRouter = require("./routes/errorHandler.routes");
initModels();


const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

db.authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => console.log(error));

db.sync({ alter: false }) // alterar los atributos
  .then(() => console.log("Base de datos sync"))
  .catch((error) => console.log(error));

app.use(userRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productsRoutes);
app.use(orderRoutes);
app.use(uploadRoutes);
app.use("/app/uploads/", express.static(path.join(__dirname, "../../uploads")))

app.get("/", (req, res) => {
  res.send("Bienvenidos a Marketplace");
})

errorHandlerRouter(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});