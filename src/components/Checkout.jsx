import { useState } from "react";
import "./Checkout.css"

const Checkout = (event) => {
    const [flag, setflag] = useState(false);
    let form  = event.target;
    const handleForm = (event) => {
        event.preventDefault();
        if(form.Name.value.length < 4)
        {
            setflag(true);
        }
        else if(!form.email.value.test(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/))
        {
            setflag(true);
        }
        else if(form.mobile.value.length !== 10)
        {
            setflag(true);
        }
        else if(form.address.value.length < 8)
        {
            setflag(true);
        }
        else
        {
            let c = [];
            localStorage.setItem("wineCart", JSON.stringify(c));
        }
    }
    return <div id="formBox">
        {flag && <p style={{color : "red"}}>Enter valid details</p>}
        <form id="form" onSubmit={handleForm}>
        <input placeholder="Enter Name" id="Name"/>
        <input placeholder="Enter Email" id="email"/>
        <input placeholder="Mobile" id="mobile"/>
        <input placeholder="Address" id="address"/>
        <button type="submit">Submit</button>
    </form>
    </div>
}

export default Checkout;