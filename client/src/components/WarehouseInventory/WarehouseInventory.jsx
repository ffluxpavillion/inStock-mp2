import "./WarehouseInventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import DeleteInventoryModal from "../../components/DeleteInventoryModal/DeleteInventoryModal";
import { Link, useParams } from "react-router-dom";
import sortImg from "../../assets/Icons/sort-24px.svg";
import deleteImg from "../../assets/Icons/delete_outline-24px.svg";
import editImg from "../../assets/Icons/edit-24px.svg";
import chevronImg from "../../assets/Icons/chevron_right-24px.svg";


function WarehouseList() {

    const API_URL = process.env.API_URL || "http://localhost:8080";
    const params = useParams();

    const [inventoryList, setInventoryList] = useState([null]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedInventoryName, setSelectedInventoryName] = useState(null);
    const [selectedInventoryId, setSelectedInventoryId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [viewWidth, setViewWidth] = useState(window.innerWidth);
  
    // This useEffect is used to set the viewWidth state to the current window width
    // It is used help determine whether the modal should take the full screen (for mobile) or not
    useEffect(() => {
      const resize = () => setViewWidth(window.innerWidth);
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, [viewWidth]);
  
    // This useEffect is used to fetch the list of inventories from the API
    useEffect(() => {
      axios
        .get(`${API_URL}/warehouses/${params.warehouse}/inventories`) //http://localhost:8080/warehouses/1/inventories
        .then((response) => {
          setInventoryList(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [selectedInventoryId]);

      function WarehouseInventoryList({
        inventoryList,
        setShowModal,
        setSelectedInventoryName,
        setSelectedInventoryId,
      }) {
        const columnHeaderArray = [
          "Inventory Item",
          "Category",
          "Status",
          "Qty",
          "Actions",
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
      
            <div className="card__background">
              <div className="card__card">
      
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
                                  ? "inventory-block__inventory-status--in-stock"
                                  : "inventory-block__inventory-status--no-stock"
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
                          <div className="inventory-block__inventory-actions-edit">
                            <img src={editImg} alt="edit icon" />
                          </div>
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

      return (
        <>
          {!showModal ? (
            !isLoading ? (
              <WarehouseInventoryList
                inventoryList={inventoryList}
                setSelectedInventoryName={setSelectedInventoryName}
                setSelectedInventoryId={setSelectedInventoryId}
                setShowModal={setShowModal}
              />
            ) : (
              <div className="isLoading">Loading...</div>
            )
          ) : viewWidth < 768 ? (
            // This is the mobile version of the modal
            <DeleteInventoryModal
              selectedInventoryName={selectedInventoryName}
              selectedInventoryId={selectedInventoryId}
              setShowModal={setShowModal}
              setSelectedInventoryName={setSelectedInventoryName}
              setSelectedInventoryId={setSelectedInventoryId}
            />
          ) : !isLoading ? (
            <>
              <DeleteInventoryModal
                selectedInventoryName={selectedInventoryName}
                selectedInventoryId={selectedInventoryId}
                setShowModal={setShowModal}
                setSelectedInventoryName={setSelectedInventoryName}
                setSelectedInventoryId={setSelectedInventoryId}
              />{" "}
              <WarehouseInventoryList
                inventoryList={inventoryList}
                setSelectedInventoryName={setSelectedInventoryName}
                setSelectedInventoryId={setSelectedInventoryId}
                setShowModal={setShowModal}
              />
            </>
          ) : (
            <div className="isLoading">Loading...</div>
          )}
        </>
      );
}

export default WarehouseList;



