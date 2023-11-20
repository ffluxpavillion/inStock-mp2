import "./Home.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList";
import DeleteWarehouseModal from "../../components/DeleteWarehouseModal/DeleteWarehouseModal";

const API_URL = process.env.API_URL || "http://localhost:8080";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [warehousesList, setWarehousesList] = useState([null]);
  const [selectedWarehouseName, setSelectedWarehouseName] = useState(null);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewWidth, setViewWidth] = useState(window.innerWidth);

  // This useEffect is used to set the viewWidth state to the current window width
  // It is used help determine whether the modal should take the full screen (for mobile) or not
  useEffect(() => {
    const resize = () => setViewWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [viewWidth]);

  // This useEffect is used to fetch the list of warehouses from the API
  useEffect(() => {
    axios
      .get(API_URL + "/warehouses")
      .then((response) => {
        setWarehousesList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedWarehouseId]);

  return (
    <>
      {!showModal ? (
        !isLoading ? (
          <WarehouseList
            warehousesList={warehousesList}
            setSelectedWarehouseName={setSelectedWarehouseName}
            setSelectedWarehouseId={setSelectedWarehouseId}
            setShowModal={setShowModal}
          />
        ) : (
          <div className="isLoading">Loading...</div>
        )
      ) : viewWidth < 768 ? (
        // This is the mobile version of the modal
        <DeleteWarehouseModal
          selectedWarehouseName={selectedWarehouseName}
          selectedWarehouseId={selectedWarehouseId}
          setShowModal={setShowModal}
          setSelectedWarehouseName={setSelectedWarehouseName}
          setSelectedWarehouseId={setSelectedWarehouseId}
        />
      ) : !isLoading ? (
        <>
          <DeleteWarehouseModal
            selectedWarehouseName={selectedWarehouseName}
            selectedWarehouseId={selectedWarehouseId}
            setShowModal={setShowModal}
            setSelectedWarehouseName={setSelectedWarehouseName}
            setSelectedWarehouseId={setSelectedWarehouseId}
          />
          <WarehouseList
            warehousesList={warehousesList}
            setSelectedWarehouseName={setSelectedWarehouseName}
            setSelectedWarehouseId={setSelectedWarehouseId}
            setShowModal={setShowModal}
          />
        </>
      ) : (
        <div className="isLoading">Loading...</div>
      )}
    </>
  );
}

export default Home;
