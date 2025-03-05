import './App.css'
import Navigation from "./components/layout/Navigation.tsx";
import BooksComponent from "./components/books/BooksComponent.tsx";
import {Fragment} from "react";
import {Route, Routes} from "react-router-dom";
import OrderComponent from "./components/orders/OrderComponent.tsx";
import CartComponent from "./components/cart/CartComponent.tsx";


function App() {

    return (
        <Fragment>
            <Navigation></Navigation>
            <Routes>
                <Route path="/" element={<BooksComponent/>}/>
                <Route path="/orders" element={<OrderComponent/>}/>
                <Route path="/cart" element={<CartComponent/>}/>
            </Routes>
        </Fragment>
    )
}

export default App
