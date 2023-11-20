const express = require("express");
const app = express();
const cors = require("cors");

// setting up env

require("dotenv").config();
let { PORT, BACKEND_URL, CORS_ORIGIN } = process.env;

PORT = process.env.PORT || 8081;


// CORS

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static('public'));

// setting up routes

const warehousesRoutes = require("./routes/warehouses");
app.use("/warehouses", warehousesRoutes);

const inventoriesRoutes = require("./routes/inventories");
app.use("/inventories", inventoriesRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the InStock API");
});

app.use((req, res) => {
  res.send("This is not a valid route. try <b>/warehouses</b> or <b>/inventories</b>");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});