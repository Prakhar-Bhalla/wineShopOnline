import { useEffect, useState } from "react"
import Button from '@mui/material/Button';
import "./Cart.css";

const WishList = () => {
    const [page, setPage] = useState(1);
    const [max, setMax] = useState(1);
    const [showwines, setShowwines] = useState([]);
    const [wish, setwish] = useState([]);
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("wineWishList")))
        {
            setwish(JSON.parse(localStorage.getItem("wineWishList")));
            let x = wish.slice((page-1)*20, (page-1)*20+20);
            console.log("x", x);
            setShowwines(x);
            setMax(Math.ceil(wish.length/20));
        }
    }, [])
    useEffect(() => {
        setShowwines(wish.slice((page-1)*20, (page-1)*20+20));
    }, [page, wish]);

    const changePage = (num) => {
        setPage(page + num);
    }

    const addToCart = (wine) => {
        let wishes = JSON.parse(localStorage.getItem("wineWishList"));
        let c = wishes.filter(w => {
            return w.winery !== wine.winery;
        });
        localStorage.setItem("wineWishList", JSON.stringify(c));
        setwish(c);
        setShowwines(c);
        let cart = JSON.parse(localStorage.getItem("wineCart"));
        cart.push(wine);
        localStorage.setItem("wineCart", JSON.stringify(cart));
    }
    console.log(showwines);
    return <>
        <div id="container">
            {showwines.length && showwines.map((w) => {
                return (<div>
                    <img src={w.image} alt="https://images.vivino.com/thumbs/GpcSXs2ERS6niDxoAsvESA_pb_x300.png"/>
                    <div className="details">
                        <p>{w.wine}</p>
                        <p style={{color : "goldenrod"}}>{w.winery}</p>
                        <p>$ {+w.rating.reviews.slice(0,2) * 100}</p>
                    </div>
                    <Button onClick={() => {addToCart(w)}} variant="contained">Add To Cart</Button>
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

export default WishList;