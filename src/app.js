const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const initModels = require("./models/initModels");
const db = require("./utils/database");
const userRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");
// const postsRoutes = require("./routes/post.routes");
// const answerRoutes = require("./routes/anwers.routes");
const errorHandlerRouter = require("./routes/errorHandler.routes");
initModels();


const app = express();


app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = 8000;

db.authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => console.log(error));

db.sync({ force: true }) // alterar los atributos
  .then(() => console.log("Base de datos sync"))
  .catch((error) => console.log(error));

app.use(userRoutes);
app.use(authRoutes);
// app.use(postsRoutes);
// app.use(answerRoutes);
// app.use(categoriesRouter);


errorHandlerRouter(app);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});