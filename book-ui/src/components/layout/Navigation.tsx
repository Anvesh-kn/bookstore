import classes from "./Navigation.module.css";


function Navigation() {

    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <a href="/public">BookStore</a>
                </li>
                <li>
                    <a href="/orders">Orders</a>
                </li>
                <li>
                    <a href="/cart">Cart</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation