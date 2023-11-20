//Styles Import
import "./EditInventory.scss";
//Component Imports
import TitleComponent from "../TitleComponent/TitleComponent";
import InputComponent from "../Input/Input";
import DropdownSelect from "../Dropdown/Dropdown";
import RadioButtons from "../RadioButton/RadioButton";
import ButtonEl from "../Button/Button";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

/**
 *
 * @param {*} props
 * @returns Renders Edit Inventory Form component
 */

function EditInventory(props) {
	const params = useParams();
	const [itemData, setItemData] = useState();
	const navigate = useNavigate();
	const [showQuantity, setShowQuantity] = useState(false);
	let formData = useRef({
		item_name: "",
		description: "",
		category: "",
		status: "",
		quantity: "",
		warehouse_id: "",
	});

	const fetchData = async () => {
		axios
			.get(`http://localhost:8080/inventories/${params.itemId}`)
			.then((res) => {
				const items = res.data;
				setItemData(items[0]);
				setFormData({
					...formData.current,
					["item_name"]: items[0].item_name,
					["description"]: items[0].description,
					["category"]: items[0].category,
					["status"]: items[0].status,
					["quantity"]: items[0].quantity,
					["warehouse_name"]: items[0].warehouse_name,
				});
				setWarehouseId(formData.current);
				setShowQuantity(items[0].status);
				console.log(items);
			})
			.catch((err) => {
				console.log(
					`Axios error http://localhost:8080/inventories/${params.itemId}: ${err}`
				);
			});
	};

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

	function setFormData(newFormData) {
		formData.current = newFormData;
	}

	const postData = async (postFormData) => {
		axios
			.put(
				`http://localhost:8080/inventories/${params.itemId}`,
				postFormData
			)
			.then((res) => {
				alert(`Item has been updated successfully ${res.status}`);
			})
			.catch((err) => {
				alert(
					`Axios error updating item details,  http://localhost:8080/inventories/${params.itemId}: ${err}`
				);
			});
	};

	useEffect(() => {
		fetchData();
		console.log("ItemData:", itemData);
	}, []);

	const editFormHandler = (event) => {
		event.preventDefault();
		setWarehouseId(formData.current);
		console.log(formData.current);
		postData(formData.current);
		// navigate(-1);
	};

	const backButtonHandler = (event) => {
		event.preventDefault();
		navigate(-1);
	};

	const onChangeFormhandler = (event) => {
		setFormData({
			...formData.current,
			[event.target.name]: event.target.value,
		});
	};

	function showQuantityFunc(show){
		if(show === "In Stock") {
			setShowQuantity(true);
		} else {
			setShowQuantity(false);
		}
	}
	if (itemData) {
		return (
			<>
				<TitleComponent
					title='Edit Inventory Item'
					backButton={true}
				/>

				<section className='card-container__background'>
					<div className='card-container__card'>
						<div className='inventory-edit__container'>
							<form
								className='inventory-edit__form'
								onSubmit={editFormHandler}
								onChange={onChangeFormhandler}>
								<div className='inventory-edit__form__row'>
									<div className='inventory-edit__form__column'>
										<h2 className='inventory-edit__form__header'>
											Item Details
										</h2>
										<InputComponent
											labelName='Item Name'
											fieldName='item_name'
											defaultValue={itemData.item_name}
										/>
										<InputComponent
											labelName='Description'
											type='textarea'
											fieldName='description'
											defaultValue={itemData.description}
										/>
										<DropdownSelect
											labelName='Category'
											items={[
												"Electronics",
												"Gear",
												"Apparel",
												"Accessories",
												"Health",
											]}
											defaultValue={itemData.category}
											fieldName='category'
										/>
									</div>

									<div className='inventory-edit__form__column'>
										<h2 className='inventory-edit__form__header'>
											Item Availabilty
										</h2>

										<RadioButtons
											labelName='Status'
											items={["In Stock", "Out of Stock"]}
											defaultValue={formData.current.status}
											fieldName='status'
											onChange = {(event) => showQuantityFunc(event.target.value)}
										/>
										{showQuantity && 										
										<InputComponent
											labelName='Quantity'
											defaultValue='0'
											fieldName='quantity'
											error-quantity={false}
										/>}


										<DropdownSelect
											labelName='Warehouse'
											items={[
												"Manhattan",
												"Washington",
												"Jersey",
												"SF",
												"Santa Monica",
												"Seattle",
												"Miami",
												"Boston",
											]}
											defaultValue={
												itemData.warehouse_name
											}
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
											title='Submit'
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
	} else {
		return <h1>Loading</h1>;
	}
}

export default EditInventory;
