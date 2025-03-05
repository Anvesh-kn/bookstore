import classes from "./Navigation.module.css";
import {Link} from "react-router-dom";


function Navigation() {

    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to="/">BookStore</Link>
                </li>
                <li>
                    <Link to="/orders">Orders</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation