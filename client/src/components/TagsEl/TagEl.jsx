import "./TagEl.scss";

function TagEl(props) {
	const { type } = props;
	return (
		<>
			{(() => {
				switch (type) {
					case "In Stock":
						return <span className='tag in-stock label'>INSTOCK</span>;
					case "Out of Stock":
						return (
							<span className='tag no-stock label'>OUT OF STOCK</span>
						);
					default: return (<span>Error</span>)
				}
			})()}
		</>
	);
}

export default TagEl;
