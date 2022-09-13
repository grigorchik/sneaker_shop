import React from "react";
import axios from "axios";
import styles from './Drawer.module.scss'
import {useCart} from "../../hooks/useCart";
import Info from '../Info';

function Drawer({onClose, onRemove, items = [], opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);


    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://63148ba5fa82b738f74994aa.mockapi.io/orders',
                {items: cartItems,});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://63148ba5fa82b738f74994aa.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert('failed order');
        }
        setIsLoading(false);
    }

    return (

        <div className={`${styles.overlay} ${opened ? styles.overlayVisible:`` }`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">
                    Cart<img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close"/>
                </h2>

                {
                    items.length > 0 ?
                        <div className="d-flex flex-column flex">
                            <div className="items flex">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div
                                            style={{backgroundImage: `url(${obj.imageUrl})`}}
                                            className="cartItemImg"></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} $</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn"
                                             src="/img/btn-remove.svg"
                                             alt="Remove"/>
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Totla price:</span>
                                        <div></div>
                                        <b>{totalPrice}$</b>
                                    </li>
                                    <li>
                                        <span>Tax 5%:</span>
                                        <div></div>
                                        <b>{Math.round(totalPrice * 0.05)}$</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Make an
                                    order<img src="/img/arrow.svg" alt="Arrow"/>
                                </button>
                            </div>
                        </div>
                        : (
                            <Info title={isOrderComplete ? "Order complete" : "Drawer clear"}
                                  description={isOrderComplete ? `Your order #${orderId}` : "Add at least one pair of sneakers"}
                                  image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}/>
                        )
                }
            </div>
        </div>
    );
}

export default Drawer;