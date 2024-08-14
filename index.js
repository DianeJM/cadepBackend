// import dependencies
const express = require("express");
const cors = require("cors");
const UserRoutes = require("./modules/users/users.routes");
const ProductRoutes = require("./modules/products/products.routes");
// initialise Express
const app = express();

var whitelist = ['http://localhost:5000', 'http://localhost:6000']
const corsOptions =  { 
  origin: whitelist,
  optionsSuccessStatus: 200,
};
 
//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

// start server
app.listen(6000, () => {
  try {
    console.log("server is running on port 6000");
  } catch (error) {
    console.log(error);
  }
});
