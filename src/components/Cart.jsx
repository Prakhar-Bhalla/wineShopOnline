import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
    const [page, setPage] = useState(1);
    const [max, setMax] = useState(1);
    const [showwines, setShowwines] = useState([]);
    const [cart, setcart] = useState([]);
    useEffect(() => {
        setcart(JSON.parse(localStorage.getItem("wineCart")));
        let x = cart.slice((page-1)*20, (page-1)*20+20);
        setShowwines(x);
        setMax(Math.ceil(cart.length/20));
        if(!JSON.parse(localStorage.getItem("wineWishList")))
        {
            let a = [];
            localStorage.setItem("wineWishList", JSON.stringify(a)); 
        }
    }, [])
    useEffect(() => {
        setShowwines(cart.slice((page-1)*20, (page-1)*20+20));
    }, [page, cart])

    const changePage = (num) => {
        setPage(page + num);
    }

    const addTowishlist = (wine) => {
        let cart = JSON.parse(localStorage.getItem("wineCart"));
        let c = cart.filter(w => {
            return w.winery !== wine.winery;
        });
        localStorage.setItem("wineCart", JSON.stringify(c));
        setcart(c);
        setShowwines(c);
        let wish = JSON.parse(localStorage.getItem("wineWishList"));
        wish.push(wine);
        localStorage.setItem("wineWishList", JSON.stringify(wish));
    }
    console.log(showwines);
    return <>
        <div id="checkoutDiv">
            <Button style={{marginTop : "10px"}} variant="contained"><Link to="/checkout">Checkout</Link></Button>
        </div>
        <div id="container">
            {showwines.length && showwines.map((w) => {
                return (<div>
                    <img src={w.image} alt="https://images.vivino.com/thumbs/GpcSXs2ERS6niDxoAsvESA_pb_x300.png"/>
                    <div className="details">
                        <p>{w.wine}</p>
                        <p style={{color : "goldenrod"}}>{w.winery}</p>
                        <p>$ {+w.rating.reviews.slice(0,2) * 100}</p>
                    </div>
                    <Button onClick={() => {addTowishlist(w)}} variant="contained">Add To WishList</Button>
                </div>)
            })}
        </div>
        <div id="pagesCount">
            <button disabled = {page === 1} onClick={() => {changePage(-1)}}>PREV</button>
            {"   "}{page}{"   "} 
            <button disabled = {page === max} onClick={() => {changePage(1)}}>NEXT</button>
        </div>
    </>
}

export default Cart;