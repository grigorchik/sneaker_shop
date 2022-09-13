import React from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";

function Orders() {
    const [orders, setOrders] = React.useState([]);
    const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get('https://63148ba5fa82b738f74994aa.mockapi.io/orders');
                //console.log(data.map((obj)=>obj.items).flat());
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false);
            } catch (error) {
                alert('error on order');
            }

        })();
    }, []);
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>My orders</h1>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)]:orders).map((item, index) => (<Card
                    key={index}
                    onFavorite={(obj) => onAddToFavorite(obj)}

                    {...item}
                    loading={isLoading}
                />))}
            </div>
        </div>

    );
}

export default Orders;