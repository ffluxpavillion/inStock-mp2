import "./Input.scss";

function InputComponent(props) {
	let { labelName, fieldName, defaultValue, type, customClasses, ...rest } = props;
	if (!type) {
		type = "text";
	}
	if (!fieldName) {
		fieldName = labelName;
	}

	switch (type) {
		case "text":
				return (
					<div className={`inputEl ${customClasses ? customClasses : ""}`}>
						<label className="inputEl__label label" htmlFor={fieldName}>
							<h3>{labelName}</h3>
						</label>
						<input id = {fieldName} className="inputEl__field" type={type} name={fieldName} placeholder= {defaultValue} {...rest}></input>
					</div>
				);
				
		case "textarea":
			return (
				<div className={`inputEl ${customClasses ? customClasses : ""}`}>
					<label className="inputEl__label label" htmlFor={fieldName}>
						<h3>{labelName}</h3>
					</label>
					<textarea rows = "5" id = {fieldName} className="inputEl__field" type={type} name={fieldName} placeholder= {defaultValue} {...rest}></textarea>
				</div>
			);
	}

}

export default InputComponent;