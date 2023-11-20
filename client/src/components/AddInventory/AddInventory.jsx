import TitleComponent from "../TitleComponent/TitleComponent";
import InputComponent from "../Input/Input";
import DropdownSelect from "../Dropdown/Dropdown";
import RadioButtons from "../RadioButton/RadioButton";
import ButtonEl from "../Button/Button";
import { useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
/**
 *
 * @param {*} props
 * @returns Renders Add Inventory Form component
 */

function AddInventory(props) {
	const params = useParams();
	const navigate = useNavigate();
	const [showQuantity, setShowQuantity] = useState(true);
	let formData = useRef({
		warehouse_id: "",
		item_name: "",
		description: "",
		category: "",
		status: "",
		quantity: "",
	});

	function setFormData(newFormData) {
		formData.current = newFormData;
	}

	const setWarehouseId = (newFormData) => {
		const warehouse_name = newFormData.warehouse_name;
		const warehouses = {
			Manhattan: 1,
			Washington: 2,
			Jersey: 3,
			SF: 4,
			"Santa Monica": 5,
			Seattle: 6,
			Miami: 7,
			Boston: 8,
		};

		const id = warehouses[warehouse_name];
		setFormData({ ...formData.current, ["warehouse_id"]: id });
	};

	const onChangeFormhandler = (event) => {
		setFormData({
			...formData.current,
			[event.target.name]: event.target.value,
		});
	};

	const backButtonHandler = (event) => {
		event.preventDefault();
		navigate(-1);
	};

	const postData = async (postFormData) => {
		axios
			.post(`http://localhost:8080/inventories/`, postFormData)
			.then((res) => {
				alert(`Item has been added successfully ${res.status}`);
			})
			.catch((err) => {
				alert(
					`Axios error adding item details,  http://localhost:8080/inventories/: ${err}`
				);
			});
	};

	const formHandler = (event) => {
		event.preventDefault();
		setWarehouseId(formData.current);
		console.log(formData.current);
		//Form validation logic
		if (
			formData.warehouse_id |
			formData.item_name |
			formData.category |
			(formData.category === "Please select a category") |
			formData.quantity |
			formData.warehouse_name |
			(formData.warehouse_name === "Please select a Warehouse")
		) {
			alert("Invalid data");
			return;
		}

		postData(formData.current);
	};

	function showQuantityFunc(show) {
		if (show === "In Stock") {
			setShowQuantity(true);
		} else {
			setShowQuantity(false);
		}
	}

	return (
		<>
			<TitleComponent
				title='Add Inventory Item'
				backButton={true}
			/>

			<section className='card-container__background'>
				<div className='card-container__card'>
					<div className='inventory-edit__container'>
						<form
							className='inventory-edit__form'
							onSubmit={formHandler}
							onChange={onChangeFormhandler}>
							<div className='inventory-edit__form__row'>
								<div className='inventory-edit__form__column'>
									<h2 className='inventory-edit__form__header'>
										Item Details
									</h2>
									<InputComponent
										labelName='Item Name'
										fieldName='item_name'
										defaultValue='Add Item Name'
										error={false}
									/>
									<InputComponent
										labelName='Description'
										type='textarea'
										defaultValue='Add a description'
										fieldName='description'
										error-description={false}
									/>
									<DropdownSelect
										labelName='Category'
										items={[
											"Please select a category",
											"Electronics",
											"Gear",
											"Apparel",
											"Accessories",
											"Health",
										]}
										defaultValue='Please select a category'
										fieldName='category'
										error-category={false}
									/>
								</div>

								<div className='inventory-edit__form__column'>
									<h2 className='inventory-edit__form__header'>
										Item Availabilty
									</h2>
									<RadioButtons
										labelName='Status'
										items={["In Stock", "Out of Stock"]}
										error-status={false}
										fieldName='status'
										defaultValue={`${
											formData.current.status
										}`}
										onChange = {(event) => showQuantityFunc(event.target.value)}
									/>

									{showQuantity && (
										<InputComponent
											labelName='Quantity'
											defaultValue='0'
											fieldName='quantity'
											error-quantity={false}
										/>
									)}

									<DropdownSelect
										labelName='Warehouse'
										items={[
											"Please select a Warehouse",
											"Manhattan",
											"Washington",
											"Jersey",
											"SF",
											"Santa Monica",
											"Seattle",
											"Miami",
											"Boston",
										]}
										defaultValue='Please select a Warehouse'
										error={false}
										fieldName='warehouse_name'
									/>
								</div>
							</div>
							<div className='inventory-edit__form__row'>
								<div className='inventory-edit__form__buttons'>
									<ButtonEl
										title='Cancel'
										buttonType='cancel'
										onClick={backButtonHandler}
									/>
									<ButtonEl
										title='+ Add Item'
										type='submit'
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
}

export default AddInventory;