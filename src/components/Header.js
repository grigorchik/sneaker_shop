import Index from "./Card";

function Header (props){
    return(
        <header className="d-flex justify-between align-center">
            <div className="d-flex align-center">
                <img width={50} height={40} src="/img/logo.png"/>
                <div>
                    <h3 className="text-uppercase">React Sneakers</h3>
                    <p className="opacity-5">Best sneaker shop</p>
                </div>
            </div>
            <ul className="d-flex">
                <li className="mr-30">
                    <img onClick={props.onClickCart} className="cu-p" width={18} height={18} src="/img/cart.svg"/>
                    <span>200$</span>
                </li>
                <li >
                    <img className="cu-p" width={18} height={18} src="/img/user.svg"/>
                </li>
            </ul>
        </header>
    );
}

export default Header;