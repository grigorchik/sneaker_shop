import Card from './components/Card';
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
    return (
        <div className="wrapper clear">
            <Drawer/>
            <Header/>
            <div className="content p-40">
                <div className="d-flex align-center mb-40 justify-between">
                    <h1>All sneakers</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search"/>
                        <input placeholder="Search..."/>
                    </div>
                </div>
                <div className="d-flex">
                    <Card/>
                    <div className="card">
                        <div className="favorite">
                            <img src="/img/unliked.svg" alt="Unliked"/>
                        </div>
                        <img width={133} height={112} src="/img/sneakers/2.jpg" alt="Sneakers"/>
                        <h5>Men's sneakers Nike Blazer Mid Suede</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Price:</span>
                                <b>155$</b>
                            </div>
                            <button className="button">
                                <img width={11} height={11} src="/img/plus.svg" alt="Plus"/>
                            </button>

                        </div>
                    </div>
                    <div className="card">
                        <div className="favorite">
                            <img src="/img/unliked.svg" alt="Unliked"/>
                        </div>
                        <img width={133} height={112} src="/img/sneakers/3.jpg" alt="Sneakers"/>
                        <h5>Men's sneakers Nike Blazer Mid Suede</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Price:</span>
                                <b>155$</b>
                            </div>
                            <button className="button">
                                <img width={11} height={11} src="/img/plus.svg" alt="Plus"/>
                            </button>

                        </div>
                    </div>
                    <div className="card">
                        <div className="favorite">
                            <img src="/img/unliked.svg" alt="Unliked"/>
                        </div>
                        <img width={133} height={112} src="/img/sneakers/4.jpg" alt="Sneakers"/>
                        <h5>Men's sneakers Nike Blazer Mid Suede</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Price:</span>
                                <b>155$</b>
                            </div>
                            <button className="button">
                                <img width={11} height={11} src="/img/plus.svg" alt="Plus"/>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
