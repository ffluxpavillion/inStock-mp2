import "./Header.scss";
import Logo from "../../assets/Logo/InStock-Logo.svg";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

/**
 * Has class name - header section header__logo header__buttons-container header__button-font
 * @returns Header component for Instock
 */
function Header() {
  return (
    <header className="header section">
      {/* <div className="header__container"> */}
      <Link to='/'>
        <div className="header__logo">
          <img src={Logo} alt="logo" className="header__logo" />
        </div>
        </Link>
        <div className="header__buttons-container">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "header__buttons header__button-active"
                : "header__buttons"
            }
          >
            <p className="header__button-font">Warehouses</p>
          </NavLink>
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "header__buttons header__button-active"
                : "header__buttons"
            }
          >
            <p className="header__button-font">Inventory</p>
          </NavLink>
        </div>
      {/* </div> */}
    </header>
  );
}

export default Header;
