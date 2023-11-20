import "./Dropdown.scss";
import dropdownArrow from '../../assets/Icons/arrow_drop_down-24px.svg'
function DropdownSelect(props) {
    
    const { items, labelName, fieldName, defaultValue, customClasses, ...rest } = props;
	return (
		<div className={`inputEl inputEl-dropdown ${customClasses ? customClasses : ""}`}>
			<label
				className='inputEl__label label'
				htmlFor={fieldName}>
				<h3>{labelName}</h3>
			</label>
                <div className="inputEl-dropdown">
                <select id = {fieldName} name = {fieldName} className='inputEl__dropdown'>
                    {items.map(item => <option value = {item} selected = {item === defaultValue ? "selected" : false}>{item}</option>)}
                </select>
                <span className="inputEl__dropdown__icon"><img src={dropdownArrow} alt = "Dropdown Arrow"/></span>
                </div>
		</div>
	);
}

export default DropdownSelect;
