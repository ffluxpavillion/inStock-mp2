import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './WarehouseDetails.scss';
import TitleComponent from '../TitleComponent/TitleComponent';
import WarehouseList from '../WarehouseInventory/WarehouseInventory';

const url = 'http://localhost:8080';
function WarehouseDetails(props) {
  const params = useParams();

  const [warehouseData, setWarehouseData] = useState('');

  useEffect(() => {
    console.log(params.id);
    axios.get(`${url}/warehouses/${params.warehouse}`).then((result) => {
      const warehouseFound = result.data;
      console.log(warehouseFound);
      setWarehouseData(warehouseFound);
    });
  }, [params.id]);

  return (
    <div>
      <TitleComponent
        title={warehouseData.warehouse_name}
        backButton={true}
        buttonType="edit"
        buttonTitle="Edit"
        buttonLink={`/warehouse/${params.warehouse}/edit`}
      />

      <section className="card-container__background">
        <div className="card-container__card warehouse-details__remove-padding">
          <div className="warehouse-details">
            <div className="warehouse-details__container">
              <div className="warehouse-details__address-container">
                <h4 className="warehouse-details__address-label">
                  Warehouse Address:
                </h4>
                <div className="warehouse-details__address-formatting">
                  <p className="warehouse-details__address">
                    {warehouseData.address},
                  </p>
                  <p className="warehouse-details__address">
                    {warehouseData.city}, {warehouseData.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="warehouse-details__contact-container">
              <div className="warehouse-details__name-details">
                <p className="warehouse-details__name-label">Contact Name:</p>
                <p className="warehouse-details__name">
                  {warehouseData.contact_name}
                </p>
                <p className="warehouse-details__position">
                  {warehouseData.contact_position}
                </p>
              </div>
              <div className="warehouse-details__contact-info">
                <p className="warehouse-details__contact-info-label">
                  Contact Information:
                </p>
                <p className="warehouse-details__contact-phone">
                  {warehouseData.contact_phone}
                </p>
                <p className="warehouse-details__contact-email">
                  {warehouseData.contact_email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <WarehouseList />
    </div>
  );
}

export default WarehouseDetails;
