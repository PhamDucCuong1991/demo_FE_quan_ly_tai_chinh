import {Link, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import Update from "./Update";
import {Login} from "../account/Login";
import $ from 'jquery';
import {Register} from "../account/Register";


export default function Container() {

    if (localStorage.getItem('token') != null) {
        $("#login").hide()
    }
return(
    <>
        <Link to={'/home'}>Home</Link>&ensp;
        <Link id={'login'} to={'/login'}>Login</Link>&ensp;
        <Link to={'/register'}>Register</Link>

        <Routes>
            <Route path={'home'} element={<Home></Home>}></Route>
            <Route path={'create-product'} element={<Create/>}></Route>
            <Route path={'update-product/:id'} element={<Update/>}></Route>
            <Route path={'login'} element={<Login/>}></Route>
            <Route path={'register'} element={<Register/>}></Route>
        </Routes>
    </>
)

}