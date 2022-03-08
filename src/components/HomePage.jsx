import { useContext, useEffect, useRef, useState } from "react"
import "./Homepage.css";
import Button from '@mui/material/Button';
import { SearchContext } from "./searchContextApi";

const Home = () => {
    const [wines,setWines] = useState([]);
    const fil1 = useRef();
    const fil2 = useRef();
    const [showwines, setShowwines] = useState([]);
    const [maxPage, setMax] = useState(36);
    const [filteredArray, setFilteredArray] = useState([]);
    const [page,setPage] = useState(1);
    const {searchString} = useContext(SearchContext);
    const [searched, setSearched] = useState([]);
    useEffect(() => {
        getWines();
        if(!JSON.parse(localStorage.getItem("wineCart")))
        {
            let a = [];
            localStorage.setItem("wineCart", JSON.stringify(a)); 
        }
    }, []);
    useEffect(() => {
        let wi = wines.filter(w => {
            return w.wine === searchString;
        });
        setSearched(wi);
    }, [searchString])
    async function getWines() {
        try {
            let res = await fetch("https://api.sampleapis.com/wines/reds");
            let data = await res.json();
            const firstpage = data.slice((page-1)*20, (page-1)*20+20);
            setShowwines(firstpage)
            setWines(data);
        } catch(e) {
            console.log("Something went wrong");
        }
    }
    const changePage = (num) => {
        setPage(page + num);
        let arr;
        if(filteredArray.length)
        {
            arr = wines.slice((page-1)*20, (page-1)*20+20);
        }
        else
        {
            arr = filteredArray.slice((page-1)*20, (page-1)*20+20);
        }
        setShowwines(arr);
    }
    const applyRatings = (event) => {
        fil2.current.value = "select";
        let {value} = event.target;
        if(value == "select")
        {
            let arr = wines.slice(0, 20);
            setShowwines(arr);
            setMax(36);
            return;
        }
        var filteredArr = wines.filter(({rating}) => {
            return rating.average == value;
        });
        setFilteredArray(filteredArr);
        setMax(Math.ceil(filteredArr.length / 20))
        let arr = filteredArr.slice(0, 20);
        setShowwines(arr);
    }
    const applyReviews = (event) => {
        fil1.current.value = "select";
        let {value} = event.target;
        if(value == "select")
        {
            let arr = wines.slice(0, 20);
            setShowwines(arr);
            setMax(36);
            return;
        }
        let filteredArr = wines.filter(({rating}) => {
            if(value == 1500)
            {
                return (+rating.reviews.split(" ")[0] >= +value);
            }
            return (+rating.reviews.split(" ")[0] >= +value && +rating.reviews.split(" ")[0] < +value + 500);
        });
        setFilteredArray(filteredArr);
        setMax(Math.ceil(filteredArr.length / 20));
        let arr = filteredArr.slice(0, 20);
        setShowwines(arr);
    }

    const addToCart = (wine) => {
        let cart = JSON.parse(localStorage.getItem("wineCart"));
        cart.push(wine);
        localStorage.setItem("wineCart", JSON.stringify(cart));
    }
    console.log("x:", searchString);
    return <>
        <div id="filters">
            <div>
                <label htmlFor="ratings">Ratings:</label>
                <select ref={fil1} onChange={applyRatings} name="ratings" id="ratings">
                    <option value="select">Select</option>
                    <option value={4.7}>4.7</option>
                    <option value={4.8}>4.8</option>
                    <option value={4.9}>4.9</option>
                </select>
            </div>
            <div>
                <label htmlFor="reviewCount">No of reviews:</label>
                <select ref={fil2} onChange={applyReviews} name="reviewCount" id="reviewCount">
                    <option value="select">Select</option>
                    <option value={0}>Reviews between 0 and 500</option>
                    <option value={500}>Reviews between 500 and 1000</option>
                    <option value={1000}>Reviews between 1000 and 1500</option>
                    <option value={1500}>Reviews above 1500</option>
                </select>
            </div>
        </div>
        <div id="container">
            {!searchString.length && showwines.length && showwines.map((w) => {
                return (<div>
                    <img src={w.image} alt="https://images.vivino.com/thumbs/GpcSXs2ERS6niDxoAsvESA_pb_x300.png"/>
                    <div className="details">
                        <p>{w.wine}</p>
                        <p>$ {+w.rating.reviews.slice(0,2) * 100}</p>
                    </div>
                    <Button onClick={() => {addToCart(w)}} variant="contained">Add To Cart</Button>
                </div>)
            })}
            {searched.length && searched.map((w) => {
                return (<div>
                    <img src={w.image} alt="https://images.vivino.com/thumbs/GpcSXs2ERS6niDxoAsvESA_pb_x300.png"/>
                    <div className="details">
                        <p>{w.wine}</p>
                        <p>$ {+w.rating.reviews.slice(0,2) * 100}</p>
                    </div>
                    <Button onClick={() => {addToCart(w)}} variant="contained">Add To Cart</Button>
                </div>)
            })}
        </div>
        {!searchString.length && <div id="pagesCount">
            <button disabled = {page === 1} onClick={() => {changePage(-1)}}>PREV</button>
            {"   "}{page}{"   "} 
            <button disabled = {page === maxPage} onClick={() => {changePage(1)}}>NEXT</button>
        </div>}
    </>
}

export default Home;