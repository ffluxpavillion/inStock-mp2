import React from "react";
import "./DeleteWarehouseModal.scss";
import closeImg from "../../assets/Icons/close-24px.svg";
import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8080";

const DeleteWarehouseModal = ({
  selectedWarehouseName,
  selectedWarehouseId,
  setShowModal,
  setSelectedWarehouseName,
  setSelectedWarehouseId,
}) => {
  // function for button - closing the modal
  const handleClose = () => {
    setSelectedWarehouseName(null);
    setSelectedWarehouseId(null);
    setShowModal(false);
  };

  // function for button - deleting a warehouse
  const handleDelete = () => {
    axios
      .delete(API_URL + "/warehouses/" + selectedWarehouseId)
      .then((response) => {
        setShowModal(false);
        setSelectedWarehouseName(null);
        setSelectedWarehouseId(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="delete-warehouse-modal__overlay">
      <div className="delete-warehouse-modal__container">
        <div className="delete-warehouse-modal__close">
          <img src={closeImg} alt="close icon" onClick={handleClose} />
        </div>
        <div className="delete-warehouse-modal__title">
          <h1>Delete {selectedWarehouseName} warehouse? </h1>
        </div>
        <div className="delete-warehouse-modal__text">
          <p>
            Please confirm that you'd like to delete {selectedWarehouseName}
            from the list of warehouses. You won't be able to undo this action.
          </p>
        </div>
        <div className="delete-warehouse-modal__buttons">
          <button
            className="delete-warehouse-modal__cancel"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="delete-warehouse-modal__delete"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWarehouseModal;
