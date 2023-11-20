import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './styles/App.scss';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/home/Home";
import InventoryDetails from './components/InventoryDetails/InventoryDetails';
import Inventory from "./pages/inventory/Inventory";
import Warehouse from "./components/WarehouseDetails/WarehouseDetails";
import EditInventoryForm from "./components/EditInventory/EditInventory";
import AddInventoryForm from "./components/AddInventory/AddInventory";
import AddWarehouseForm from "./components/AddWarehouse/AddWarehouse";
import EditWarehouseForm from './components/EditWarehouse/EditWarehouse';


function App() {
  let { itemId, warehouse } = useParams();
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {<Route path ="/warehouses/:warehouse" element = {<Warehouse />} />}
        {/* {<Route path ="/:warehouse/edit" element = {<Warehouse />} />} */}
        {<Route path ="/warehouse/add" element = {<AddWarehouseForm />} />}
        {<Route path ="/warehouse/:warehouse_id/edit" element = {<EditWarehouseForm />} />}
        {<Route path ="/inventory" element = {<Inventory />} />}
        {<Route path ="/inventory/:itemId" element = {<InventoryDetails />} />}
        {<Route path ="/inventory/:itemId/edit" element = {<EditInventoryForm />} />}
        {<Route path ="/inventory/add" element = {<AddInventoryForm />} />}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
