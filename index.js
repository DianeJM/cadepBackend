// import dependencies
const express = require("express");
const cors = require("cors");
const UserRoutes = require("./modules/users/users.routes");
const ProductRoutes = require("./modules/products/products.routes");
// initialise Express
const app = express();
const bodyParser  = require('body-parser')

var whitelist = ['http://localhost:5000', 'http://localhost:6000']
const corsOptions =  { 
  origin: whitelist,
  optionsSuccessStatus: 200,
};
 
//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.text({type:"/"}))
app.use("/files",express.static("files"));
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);

// start server
app.listen(50, () => {
  try {
    console.log("server is running on port 50");
  } catch (error) {
    console.log(error);
  }
});
