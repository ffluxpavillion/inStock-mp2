const knex = require('knex')(require('../knexfile'));

const index = (_req, res) => {
  knex('warehouses')
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Users: ${err}`));
};

/**
 * Returns Json data for one warehouse in requested in req.params.warehouse_id : (/warehouse_id)
 * @param {AxiosRequest} req
 * @param {AxiosResponse} res
 * @returns {{id: number, warehouse_name: String, address: String, country: String, contact_name: String, contact_position: String, contact_phone: String,contact_email: String,created_at: EpochTimeStamp, updated_at: EpochTimeStamp} }
 */
const singleWarehouse = (req, res) => {
  //Warehouse data knex query
  knex('warehouses')
    .where({ id: req.params.warehouse_id })
    .then((warehousesFound) => {
      //If warehouse not found
      if (warehousesFound.length === 0) {
        return res
          .status(404)
          .json({
            message: `Cannot find warehouse with id: ${req.params.warehouse_id}`,
          });
      }

      //Response 200
      res.status(200).json(warehousesFound[0]);
    })

    //Catching errors, Gotta catch em all 🐉
    .catch((error) => {
      res.status(500).json({
        message: `Unable to retrieve data for warehouse: ${req.params.warehouse_id} 
    failed with error: ${error}`,
      });
    });
};

/**
 * Returns Json Array data for one warehouse inventory in requested in req.params.warehouse_id/inventories : (/warehouse_id/inventories)
 * @param {AxiosRequest} req
 * @param {AxiosResponse} res
 * @returns {[{"id": number(Primary Key),"warehouse_id": number(Foreign Key),"item_name": String, "description": String,"category": String, status : "Out of Stock" | "In Stock" , quantity": number,"created_at": EpochTimeStamp,"updated_at": EpochTimeStamp}, ...]}
 */
const singleWarehouseInventory = (req, res) => {
  knex('inventories')
    .where({ warehouse_id: req.params.warehouse_id })
    .then((inventoryFound) => {
      //If inventory not found
      if (inventoryFound === 0) {
        return res
          .status(404)
          .json({
            message: `Cannot find inventory for warehouse id: ${req.params.warehouse_id}`,
          });
      }

      //Response 200
      res.status(200).json(inventoryFound);
    })

    //Catching errors, Gotta catch em all 🐉
    .catch((error) => {
      res.status(500).json({
        message: `Unable to retrieve data for warehouse: ${req.params.warehouse_id} 
    failed with error: ${error}`,
      });
    });
};

const deleteWarehouse = (req, res) => {
  knex('warehouses')
    .where({ id: req.params.warehouse_id })
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

// ---------- ADD NEW WAREHOUSE (POST) ----------
const createWarehouse = (req, res) => {
  // regex phone number validation
  const regexPhone = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'im'
  );

  // regex email validation
  const regexEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'i'
  );

  // destructuring the request body
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  // insert data into database usign knex
  knex('warehouses').insert({
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  })

  .then(([newWarehouseId]) => {
		// Fetch the newly inserted warehouse
		return knex('warehouses').where({ id: newWarehouseId }).first();
	})
	.then((newWarehouse) => {
		// Check inventory for the newly created warehouse
		return knex('inventories').where({ warehouse_id: newWarehouse.id }).first();
	})
	.then((inventoryFound) => {
		if (!inventoryFound) {
			return res.status(404).json({
				message: `Cannot find inventory for warehouse id: ${newWarehouse.id}`,
			});
		}
		// Respond with 201 status and the newly created warehouse
		res.status(201).json(newWarehouse);
	})
	.catch((error) => {
		res.status(500).json({ message: `Server error: ${error.message}` });
	});
};

// ---------- UPDATE WAREHOUSE (PUT/EDIT) ----------
const updateWarehouse = (req, res) => {
  const warehouseId = req.params.warehouse_id; 

  // destructuring the request body
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  // regex phone number validation
  const regexPhone = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    'im'
  );

  // regex email validation
  const regexEmail = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'i'
  );

  // start a query to interact with the 'warehouses' table in the database
  knex('warehouses')
    // locate warehouse row where 'id' column === 'warehouseId'
    .where({ id: warehouseId })
    // update warehouse row with new details from req
    .update({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    })
    // after updating, check how many rows were altered
    .then((updateCount) => {
      if (updateCount) {
        // if altered rows >=1, send updated warehouse details from  database back to client
        return knex('warehouses').where({ id: warehouseId }).first();
      } 
			else {
        // if no rows updated (aka warehouse not found), send  404 error
        res
          .status(404)
          .json({ message: `Warehouse with ID ${warehouseId} not found` });
        // prevents further then() blocks executing, indicates that an error occurred
        return Promise.reject('Warehouse not found'); // Prevent further then() blocks from executing
      }
    })
    // if warehouse was successfully updated, send updated details back to client
    .then((updatedWarehouse) => {
      res.status(200).json(updatedWarehouse);
    })
    // catch-all errors
    .catch((error) => {
      // if no warehouse found, send a 500 server error response
      if (error !== 'Warehouse not found') {
        res.status(500).json({ message: `Error updating warehouse: ${error}` });
      }
    });
};

module.exports = {
  index,
  singleWarehouse,
  singleWarehouseInventory,
  deleteWarehouse,
  createWarehouse,
  updateWarehouse,
};
