import React from 'react';
import './InventoryList.scss';
import { Link } from 'react-router-dom';
import sortImg from '../../assets/Icons/sort-24px.svg';
import searchImg from '../../assets/Icons/search-24px.svg';
import deleteImg from '../../assets/Icons/delete_outline-24px.svg';
import editImg from '../../assets/Icons/edit-24px.svg';
import chevronImg from '../../assets/Icons/chevron_right-24px.svg';

function InventoryList({
  inventoryList,
  setShowModal,
  setSelectedInventoryName,
  setSelectedInventoryId,
}) {
  const columnHeaderArray = [
    'Inventory Item',
    'Category',
    'Status',
    'Qty',
    'Warehouse',
    'Actions',
  ];

  // function for button - setting up the modal to delete an inventory item
  const handleDeleteInventory = (
    selectedInventoryName,
    selectedInventoryId
  ) => {
    setSelectedInventoryName(selectedInventoryName);
    setSelectedInventoryId(selectedInventoryId);
    setShowModal(true);
  };

  return (
    <>
      <div className="title-block">
        <div className="title-block__container">
          <div className="title-block__title">
            <h1>Inventory</h1>
          </div>
          <div className="title-block__search tablet-view">
            <input
              type="text"
              className="title-block__search-bar"
              id="home-search-bar"
              placeholder="Search..."
            />
            <img src={searchImg} alt="sort icon" />
          </div>

          <div className="title-block__add tablet-view">
            <Link to={`/inventory/add`}>
              <button className="title-block__add-button">
                + Add New Item
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card__background">
        <div className="card__card">
          <div className="search-block mobile-view">
            <div className="search-block__search">
              <input
                type="text"
                className="search-block__search-bar"
                id="home-search-bar"
                placeholder="Search..."
              />
              <img src={searchImg} alt="sort icon" />
            </div>

            <div className="search-block__add">
              <Link to={`/inventory/add`}>
                <button className="search-block__add-button">
                  + Add New Item
                </button>
              </Link>
            </div>
          </div>

          <div className="sort-block">
            <div className="sort-block__container">
              {columnHeaderArray.map((columnHeader, index) => (
                <div className="sort-block__column-header" key={columnHeader}>
                  <div className="sort-block__header">{columnHeader}</div>
                  {index !== 5 && (
                    <div className="sort-block__buttons">
                      <div className="sort-block__icons">
                        <img
                          className="sort-block__icon"
                          src={sortImg}
                          alt="sort icon"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="inventory-block">
            {inventoryList.map((inventoryItem) => (
              <div key={inventoryItem.id} className="inventory-block__row">
                <div className="inventory-block__mobile-block-1">
                  <div className="inventory-block__column-1">
                    <div className="inventory-block__header mobile-view">
                      {columnHeaderArray[0]}
                    </div>
                    <div className="inventory-block__inventory-name">
                      <Link to={`/inventory/${inventoryItem.id}`}>
                        <div className="inventory-block__inventory-name-container">
                          {inventoryItem.item_name}
                          <img
                            src={chevronImg}
                            alt="chevron icon"
                            className="inventory-block__inventory-name-chevron"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="inventory-block__header mobile-view">
                      {columnHeaderArray[1]}
                    </div>

                    <div className="inventory-block__inventory-category">
                      {inventoryItem.category}
                    </div>
                  </div>
                  <div className="inventory-block__column-2">
                    <div className="inventory-block__header mobile-view">
                      {columnHeaderArray[2]}
                    </div>

                    <div className="inventory-block__inventory-status">
                      <div
                        className={`inventory-block__inventory-status-tag ${
                          inventoryItem.quantity !== 0
                            ? 'inventory-block__inventory-status--in-stock'
                            : 'inventory-block__inventory-status--no-stock'
                        }`}
                      >
                        {inventoryItem.status}
                      </div>
                    </div>

                    <div className="inventory-block__header mobile-view">
                      {columnHeaderArray[3]}
                    </div>
                    <div className="inventory-block__inventory-quantity-container">
                      <div className="inventory-block__inventory-quantity">
                        {inventoryItem.quantity}
                      </div>
                    </div>

                    <div className="inventory-block__header mobile-view">
                      {columnHeaderArray[4]}
                    </div>
                    <div className="inventory-block__inventory-warehouse-name">
                      <div className="inventory-block__inventory-warehouse-column">
                        {inventoryItem.warehouse_name}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="inventory-block__mobile-block-2">
                  <div className="inventory-block__inventory-actions">
                    <div className="inventory-block__inventory-actions-delete">
                      <img
                        src={deleteImg}
                        alt="delete icon"
                        onClick={() =>
                          handleDeleteInventory(
                            inventoryItem.item_name,
                            inventoryItem.id
                          )
                        }
                      />
                    </div>
                    <Link to={`/inventory/${inventoryItem.id}/edit`}>
                      <div className="inventory-block__inventory-actions-edit">
                        <img src={editImg} alt="edit icon" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryList;
