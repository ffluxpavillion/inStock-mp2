import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// pages
import './EditWarehouse.scss';
// files
import ArrowBack from '../../assets/Icons/arrow_back-24px.svg';
import ErrorIcon from '../../assets/Icons/error-24px.svg';

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

export default function EditWarehouseForm() {
  const navigate = useNavigate();
  const { warehouse_id } = useParams()
  const handleClickCancel = () => navigate(-1);

  // piece of state that holds an object of error messages
  const [error, setError] = useState({});

  // piece of state to hold warehouse details
  const [formData, setFormData] = useState({
    warehouse_name: '',
    address: '',
    city: '',
    country: '',
    contact_name: '',
    contact_position: '',
    contact_phone: '',
    contact_email: '',
  });

  // event handler that updates state, handles multiple form input field changes
  const formHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // form input validator
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formData.warehouse_name) {
      isValid = false;
      errors.warehouse_name = 'This field is required';
    }
    if (!formData.address) {
      isValid = false;
      errors.address = 'This field is required';
    }
    if (!formData.city) {
      isValid = false;
      errors.city = 'This field is required';
    }
    if (!formData.country) {
      isValid = false;
      errors.country = 'This field is required';
    }
    if (!formData.contact_name) {
      isValid = false;
      errors.contact_name = 'This field is required';
    }
    if (!formData.contact_position) {
      isValid = false;
      errors.contact_position = 'This field is required';
    }
    if (!regexPhone.test(formData.contact_phone)) {
      isValid = false;
      errors.contact_phone = 'This field is required';
    }
    if (!regexEmail.test(formData.contact_email)) {
      isValid = false;
      errors.contact_email = 'This field is required';
    }

    setError(errors); // Update the error state with any validation messages
    return isValid; // Return the validity of the form
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/warehouses/${warehouse_id}`)
      .then(res => {
        setFormData(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error appropriately
      });
}, [warehouse_id]);


  // form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
      .put(`http://localhost:8080/warehouses/${warehouse_id}`, formData)
      .then((response) => {
        console.log(response.data);
        alert('Warehouse Updated Successfully! 🚀');
        navigate(-1);
      })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <>
      <main className="page-container">
        <header className="page-header">
          <div className="page-header__div">
            <button className="page-header__button">
            <Link to="/">
              <img
                className="page-header__button-icon"
                src={ArrowBack}
                alt="Back Arrow"
              />
              </Link>
            </button>
            <div className="page-header__header">Edit Warehouse</div>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          id="myForm"
          noValidate
          className="warehouse-form"
        >
          <div className="warehouse-form__div">
            <section className="warehouse-form__section--first">
              <h2 className="warehouse-form__header">Warehouse Details</h2>
              <label className="text-input__header">Warehouse Name</label>
              <input
                className={`text-input__input ${
                  error.warehouse_name ? 'error-input' : ''
                }`}
                placeholder="Warehouse Name"
                name="warehouse_name"
                value={formData.warehouse_name}
                onChange={formHandler}
              ></input>
              {error.warehouse_name && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.warehouse_name}
                </p>
              )}
              <label className="text-input__header">Street Address</label>
              <input
                className={`text-input__input ${
                  error.address ? 'error-input' : ''
                }`}
                placeholder="Street Address"
                name="address"
                value={formData.address}
                onChange={formHandler}
              ></input>
              {error.address && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.address}
                </p>
              )}
              <label className="text-input__header">City</label>
              <input
                className={`text-input__input ${
                  error.city ? 'error-input' : ''
                }`}
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={formHandler}
              ></input>
              {error.city && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.city}
                </p>
              )}
              <label className="text-input__header">Country</label>
              <input
                className={`text-input__input ${
                  error.country ? 'error-input' : ''
                }`}
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={formHandler}
              ></input>
              {error.country && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.country}
                </p>
              )}
            </section>

            <section className="warehouse-form__section--second">
              <h2 className="warehouse-form__header">Contact Details</h2>
              <label className="text-input__header">Contact Name</label>
              <input
                className={`text-input__input ${
                  error.contact_name ? 'error-input' : ''
                }`}
                placeholder="Contact Name"
                name="contact_name"
                value={formData.contact_name}
                onChange={formHandler}
              ></input>
              {error.contact_name && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_name}
                </p>
              )}
              <label className="text-input__header">Position</label>
              <input
                className={`text-input__input ${
                  error.contact_position ? 'error-input' : ''
                }`}
                placeholder="Position"
                name="contact_position"
                value={formData.contact_position}
                onChange={formHandler}
              ></input>
              {error.contact_position && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_position}
                </p>
              )}
              <label className="text-input__header">Phone Number</label>
              <input
                className={`text-input__input ${
                  error.contact_phone ? 'error-input' : ''
                }`}
                placeholder="Phone Number"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={formHandler}
              ></input>
              {error.contact_phone && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_phone}
                </p>
              )}
              <label className="text-input__header">Email</label>
              <input
                className={`text-input__input ${
                  error.contact_email ? 'error-input' : ''
                }`}
                placeholder="Email"
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={formHandler}
              ></input>
              {error.contact_email && (
                <p className="error">
                  <img className="error-icon" src={ErrorIcon} alt="Error" />
                  {error.contact_email}
                </p>
              )}
            </section>
          </div>

          <div className="warehouse-form__buttons">
            <button className="button button--cancel" type="button" onClick={handleClickCancel}>
              Cancel
            </button>
            <button className="button" type="submit">
              Save
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
