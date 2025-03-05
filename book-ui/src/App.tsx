import './App.css'
import Navigation from "./components/layout/Navigation.tsx";
import BooksComponent from "./components/books/BooksComponent.tsx";
import {Fragment} from "react";


function App() {

    return (
        <Fragment>
            <Navigation></Navigation>
            <BooksComponent></BooksComponent>
        </Fragment>
    )
}

export default App
