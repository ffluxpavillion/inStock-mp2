import { useNavigate, Link, Navigate } from "react-router-dom";
import arrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import "./TitleComponent.scss";
import searchImg from "../../assets/Icons/search-24px.svg";
import ButtonEl from "../Button/Button";

/**
 *
 * @param {title: string, backButton: boolean, buttonType: (cancel | edit | delete), buttonTitle: string, buttonLink: string, searchComponent: boolean} as props
 * @returns Title Component with header
 */
function TitleComponent(props) {
	const {
		title,
		backButton,
		buttonType,
		buttonTitle,
		buttonLink,
		searchComponent,
	} = props;

	const navigate = useNavigate();
	const backButtonHandler = (event) => {
		event.preventDefault();
		navigate(-1);
	};

	return (
		<div className='header-block'>
			<div className={`header-block__container ${buttonType === "edit" ? "header-edit" : ""}`}>
				<div className='header-block__title'>
					{backButton && (
						<Link
							className='header-block__back-button'
							to='..'
							onClick={backButtonHandler}>
							<div className='header-block__back-button__img'>
								<img
									src={arrowIcon}
									alt='back Icon'
								/>
							</div>
						</Link>
					)}
					<h1>{title}</h1>
				</div>

				{searchComponent && (
					<div className='header-block__search tablet-view'>
						<input
							type='text'
							className='header-block__search-bar'
							placeholder='Search...'
						/>
						<img
							src={searchImg}
							alt='sort icon'
						/>
					</div>
				)}
				{buttonTitle && <ButtonEl className = "buttonEl" title={buttonTitle} buttonType={buttonType} link={buttonLink}/>}

			</div>
		</div>
	);
}

export default TitleComponent;
