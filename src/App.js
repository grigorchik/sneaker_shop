import React from "react";
import Card from './components/Card';
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        fetch('https://63148ba5fa82b738f74994aa.mockapi.io/items').then((res) => {
            return res.json();
        })
            .then((json) => {
                setItems(json);
            });
    }, []);

    const onAddToCart = (obj) => {

        console.log(cartItems.includes(obj));
            setCartItems(prev => [...prev, obj])

    };

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)}/>}
            <Header onClickCart={() => setCartOpened(true)}/>
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>All sneakers</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder="Search..."/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.map((item) => (
                        <Card
                            key={item.title}
                            title={item.title}
                            price={item.price}
                            imageUrl={item.imageUrl}
                            onFavorite={() => console.log('Добавили в закладки')}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
