const knex = require('knex')(require('../knexfile'));
const { v4: uuidv4 } = require('uuid');

const index = (_req, res) => {
  knex
    .select('inventories.*', 'warehouses.warehouse_name')
    .from('inventories')
    .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')

    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving inventories: ${err}`)
    );
};

/**
 * Returns json data for one inventory item requested in req.params.id : (/inventories/:id)
 *
 */
const singleInventoryItem = (req, res) => {
  // Inventory data knex query
  const itemId = req.params.id;

  knex('inventories')
    .where('inventories.id', itemId)
    .join('warehouses', 'inventories.warehouse_id', 'warehouses.id')
    .select('inventories.*', 'warehouses.warehouse_name')

    .then((itemFound) => {
      // If item not found
      if (itemFound.length === 0) {
        return res.status(500).json({
          message: `Cannot find inventory item with id: ${req.params.id}`,
        });
      }

      // Response 200
      res.status(200).json(itemFound);
    })
    // Catching errors
    .catch((error) => {
      res.status(404).json({
        message: `Unable to retrive data for inventory item: ${req.params.id}
        failed with error: ${error}`,
      });
    });
};

const deleteInventoryItem = (req, res) => {
  knex('inventories')
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      if (data === null) {
        return res.status(404);
      }
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500);
    });
};

// ---------- ADD NEW INVENTORY ITEM (POST) ----------

const createInventoryItem = (req, res) => {
  // validating data
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .send(
        'Please make sure to provide Warehouse,item name, description, category, status and quantity fields.'
      );
  }

  // destructuring the request body
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  // insert data into database usign knex
  knex('inventories')
    .insert({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    })
    .then(() => {
      res.status(201).json({ message: 'Inventory item added successfully.' });
    })
    .catch((err) => {
      res.status(500).json({ message: `Error adding inventory item: ${err}` });
    });
};

// ---------- UPDATE INVENTORY ITEM (PUT/EDIT) ----------

const updateInventoryItem = (req, res) => {
  const itemId = req.params.id;

  // validating data
  if (
    !req.body.warehouse_id ||
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    return res
      .status(400)
      .send(
        'Please make sure to provide Warehouse,item name, description, category, status and quantity fields.'
      );
  }

  // destructuring the request body
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  // insert data into database usign knex
  knex('inventories')
    .where({ id: itemId })
    .update({
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    })
    .then(() => {
      res.status(201).json({ message: 'Inventory item updated successfully.' });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `Error updating inventory item: ${err}` });
    });
};

module.exports = {
  index,
  singleInventoryItem,
  deleteInventoryItem,
  createInventoryItem,
  updateInventoryItem,
};
