import "./RadioButton.scss";

function RadioButtons(props) {
	let {
		items,
		labelName,
		fieldName,
		defaultValue,
		type,
		customClasses,
		...rest
	} = props;

	if (!fieldName) {
		fieldName = labelName;
	}

	const RadioOptions = () => items.map(item => 
					<div className= {`inputEl-radio__option`} >
						<input
							className='inputEl-radio__button'
							type='radio'
							name={fieldName}
							id={`${fieldName}-${item}`}
							defaultChecked={item === defaultValue ? "checked" : false}
							value={item}
						/>
						<label
							className='inputEl-radio__label p2'
							htmlFor={item}>
							{item}
						</label>
					</div>
				);
	return (
		<div
			className={`inputEl inputEl-radio ${
				customClasses ? customClasses : ""
			}`}
			{...rest}>
			<label
				className='inputEl__label label'
				htmlFor={fieldName}>
				<h3>{labelName}</h3>
			</label>
			<div className='inputEl-radio__container'>
				{<RadioOptions />}
			</div>
		</div>
	);
}

export default RadioButtons;
