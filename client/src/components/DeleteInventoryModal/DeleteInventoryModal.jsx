import React from "react";
import "./DeleteInventoryModal.scss";
import closeImg from "../../assets/Icons/close-24px.svg";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

const DeleteInventoryModal = ({
  selectedInventoryName,
  selectedInventoryId,
  setShowModal,
  setSelectedInventoryName,
  setSelectedInventoryId,
}) => {
  // function for button - closing the modal
  const handleClose = () => {
    setSelectedInventoryName(null);
    setSelectedInventoryId(null);
    setShowModal(false);
  };

  // function for button - deleting an inventory item
  const handleDelete = () => {
    axios
      .delete(API_URL + "/inventories/" + selectedInventoryId)
      .then((response) => {
        setShowModal(false);
        setSelectedInventoryName(null);
        setSelectedInventoryId(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="delete-inventory-modal__overlay">
      <div className="delete-inventory-modal__container">
        <div className="delete-inventory-modal__close">
          <img src={closeImg} alt="close icon" onClick={handleClose} />
        </div>
        <div className="delete-inventory-modal__title">
          <h1>Delete {selectedInventoryName} inventory item? </h1>
        </div>
        <div className="delete-inventory-modal__text">
          <p>
            Please confirm that you'd like to delete {selectedInventoryName}
            from the inventory list. You won't be able to undo this action.
          </p>
        </div>
        <div className="delete-inventory-modal__buttons">
          <button
            className="delete-inventory-modal__cancel"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="delete-inventory-modal__delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInventoryModal;
