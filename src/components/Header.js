import Index from "./Card";
import React from "react";
import {Link} from "react-router-dom";
import {useCart} from "../hooks/useCart";

function Header(props) {
    const{totalPrice} =useCart();

    return (
        <header className="d-flex justify-between align-center">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={50} height={40} src="/img/logo.png"/>
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Best sneaker shop</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li className="mr-30">
                    <img onClick={props.onClickCart} className="cu-p" width={18} height={18} src="/img/cart.svg"
                         alt="Cart"/>
                    <span className="cu-p" onClick={props.onClickCart}>{totalPrice}$</span>
                </li>
                <Link to="/favorites">
                    <li className="mr-20 cu-p">
                        <img className="cu-p" width={18} height={18} src="/img/heart.svg" alt="favorite"/>
                    </li>
                </Link>
                <Link to="/orders">
                    <li>
                        <img className="cu-p" width={18} height={18} src="/img/user.svg" alt="Order"/>
                    </li>
                </Link>

            </ul>
        </header>
    );
}

export default Header;