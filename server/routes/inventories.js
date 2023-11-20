const fs = require("fs");
const router = require("express").Router();
const inventoriesController = require("../controllers/inventories-controller");

//routes

router.route("/").get(inventoriesController.index);

router.route("/:id").get(inventoriesController.singleInventoryItem);

router.route("/:id").delete(inventoriesController.deleteInventoryItem);

router.route("/").post(inventoriesController.createInventoryItem);

router.route("/:id").put(inventoriesController.updateInventoryItem);


module.exports = router;
