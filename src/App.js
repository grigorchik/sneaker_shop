import React from "react";
import axios from "axios";
import Card from './components/Card';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home"
import Favorites from "./pages/Favorites"
import Orders from "./pages/Orders"
import AppContext from "./context";
import {
    Routes,
    Route,
} from "react-router-dom";


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [favorites, setFavorites] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    console.log(JSON.stringify(cartItems));


    React.useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, favoriteResponse, itemsResponse] =
                    await Promise.all([axios.get('https://63148ba5fa82b738f74994aa.mockapi.io/cart'), axios.get('https://63148ba5fa82b738f74994aa.mockapi.io/favorites'), axios.get('https://63148ba5fa82b738f74994aa.mockapi.io/items')]);
                setIsLoading(true);
                axios.get('https://63148ba5fa82b738f74994aa.mockapi.io/cart');
                axios.get('https://63148ba5fa82b738f74994aa.mockapi.io/favorites');
                axios.get('https://63148ba5fa82b738f74994aa.mockapi.io/items');
                setIsLoading(false);
                setCartItems(cartResponse.data);
                setFavorites(favoriteResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('error with data')
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
                await axios.delete(`https://63148ba5fa82b738f74994aa.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems(prev => [...prev, obj]);
                const {data} = await axios.post('https://63148ba5fa82b738f74994aa.mockapi.io/cart', obj);
                setCartItems((prev) => prev.map(item=>{
                    if(item.parentId === data.parentId){
                        return{
                            ...item,
                            id:data.id
                        };
                    }
                    return item;
                }));
            }
        } catch (error) {
            alert('failed to add');
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://63148ba5fa82b738f74994aa.mockapi.io/favorites/${obj.id}`);
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post('https://63148ba5fa82b738f74994aa.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('failed to add')
        }

    };


    const onRemoveItem = (id) => {
        try {
            console.log(id);
            axios.delete(`https://63148ba5fa82b738f74994aa.mockapi.io/cart/${id}`);
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('error with remove');
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    }

    return (<AppContext.Provider
        value={{cartItems, favorites, items, isItemAdded, onAddToFavorite, setCartOpened, setCartItems}}>
        <div className="wrapper clear">
            <Drawer items={cartItems} onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem} opened={cartOpened}/>
            <Header onClickCart={() => setCartOpened(true)}/>
            <Routes>
                <Route path="/" element={<Home
                    items={items}
                    cartItems={cartItems}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}

                    onAddToCart={onAddToCart}
                    isLoading={isLoading}
                />}/>
            </Routes>
            <Routes>
                <Route path="/favorites" element={
                    <Favorites/>
                }
                />
            </Routes>
            <Routes>
                <Route path="/orders" element={
                    <Orders/>
                }
                />
            </Routes>
        </div>
    </AppContext.Provider>);

}

export default App;
