import { useContext } from "react"
import { AppContext } from "../../AppContext"
import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function Checkout() {
    const navigate = useNavigate();
    const [stage, setStage] = useState(1)
    const { userCredentials } = useContext(AppContext);
    const [cartDetails, setCartDetails] = useState({})

    async function getProductDetails() {
        let updatedCart = {}
        let cart = {}
        try {
            const response = await axios.get("https://best-store-api-77f5ba459c2e.herokuapp.com/cart?sessionID=" + userCredentials.sessionID, { withCredentials: true }) // sessionID provided in the form", formData, { withCredentials: true })
            if (response.status === 200) {
                cart = response.data
            }
        } catch (error) {
            console.log(error);
        }
        console.log("Cart", cart)
        let promise = Object.entries(cart.cart).map(async entry => {
            try {
                const response = await axios.get(`https://best-store-api-77f5ba459c2e.herokuapp.com/product/${entry[0]}`);
                if (response.status === 200) {
                    updatedCart[entry[0]] = { ...entry[1], ...response.data }
                }
            } catch (error) {
                console.log(error);
            }
        });
        await Promise.all(promise);
        setCartDetails(updatedCart)
        // console.log("Cart Details", cartDetails)
    }
    useEffect(() => {
        getProductDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // console.log(userCredentials)
    const getCurrentDate = () => {
        const date = new Date();
        const day = date.getDate();
        const weekDayNames = [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        const weekDay = weekDayNames[date.getDay()];
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];

        return `${weekDay} ${day} ${month} `;
    };
    async function handleCheckout() {
    //     const form_Data = new FormData();
    //     form_Data.append("sessionID", userCredentials.sessionID);//sessionID provided in the form
    //     // Convert FormData to a plain object
    //     const formObj = Object.fromEntries(form_Data.entries());
    //     // Convert the plain object to URLSearchParams
    //     const params = new URLSearchParams(formObj).toString();
        try {
            const response = await axios.get(`https://best-store-api-77f5ba459c2e.herokuapp.com/cart/checkOut?sessionID=${userCredentials.sessionID}`, { withCredentials: true })
            if (response.status === 200) {
                alert("Order placed successfully")
                navigate("/user/rate")
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            console.log(error);
        }
    }
    function toIndianFormat(n) {
        if (n === undefined) return
        let num = n.toString().split('.');
        let lastThree = num[0].substring(num[0].length - 3);
        let otherNumbers = num[0].substring(0, num[0].length - 3);
        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
        }
        let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return num.length > 1 ? result + "." + num[1] : result;
    }
    return (
        <>
            <div className="container my-4 ">
                <div className="row">
                    <div className="col-md-8 ">
                        <div className="d-flex justify-content-between">
                        <h2 >Step 1: Select delivery address</h2>
                        <h2 style={stage > 1 ? { display: 'block' } : { display: 'none' }}>✓</h2>
                        </div>
                        <div className="border  rounded p-4 mx-auto" style={stage === 1 ? { display: 'block' } : { display: 'none' }}>
                            <h3>Your address</h3><hr />
                            <div className="form-check border  p-2 d-flex">
                                <input className="form-check-input mx-1" type="checkbox" value="" id="defaultCheck1" checked />
                                <label className="form-check-label mx-2">
                                    {userCredentials.address}
                                </label>
                            </div>
                            <div className="d-flex mt-3 mx-2"> <i className="bi bi-plus-lg mx-1"></i><p> Add new address</p></div>
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-outline-primary " onClick={() => navigate("/user/cart")}>BACK</button>
                                <button className="btn btn-warning" onClick={() => setStage(2)}>USE THIS ADDRESS</button>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <div className="d-flex justify-content-between">
                            <h2 className="mt-5">Step 2: Select payment method</h2>
                            <h2 className="mt-5" style={stage > 2 ? { display: 'block' } : { display: 'none' }}>✓</h2>
                            </div>
                            <div className="border  rounded p-4  mx-auto" style={stage === 2 ? { display: 'block' } : { display: 'none' }}>
                                <h3>Payment method</h3><hr />
                                <div className="form-check border  p-2 d-flex">
                                    <input className="form-check-input mx-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                    <label className="form-check-label mx-2">
                                        Cash on delivery <img width="30" height="30" src="https://img.icons8.com/color/96/banknotes.png" alt="banknotes" /></label>
                                </div>
                                <div className="form-check border  p-2 d-flex">
                                    <input className="form-check-input mx-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label mx-2">
                                        Credit card (**** **** **** 1234) <img width="30" height="30" src="https://img.icons8.com/color/96/mastercard-credit-card.png" alt="mastercard-credit-card" />
                                    </label>
                                </div>
                                <div className="form-check border  p-2 d-flex">
                                    <input className="form-check-input mx-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label mx-2">
                                        UPI &nbsp;
                                        <img src="https://www.vectorlogo.zone/logos/upi/upi-icon.svg" alt="UPI Icon" style={{ width: "20px", height: "20px" }} />
                                    </label>
                                </div>
                                <div className="form-check border  p-2 d-flex">
                                    <input className="form-check-input mx-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                    <label className="form-check-label mx-2">
                                        Wallet  (0.00₹) &nbsp;&nbsp;
                                        <img width="30" height="30" src="https://img.icons8.com/color/48/wallet--v1.png" alt="wallet--v1" />           </label>
                                </div>
                                <div className="d-flex justify-content-between" >
                                    <button className="btn btn-outline-primary mt-3" onClick={() => setStage(1)}>BACK</button>
                                    <button className="btn btn-warning mt-3" onClick={() => setStage(3)}>PROCEED TO PAY</button>

                                </div>

                            </div>

                        </div>
                        <hr/>
                        <div>
                            <h2 className="mt-5">Step 3: Review</h2>
                            <div className="border  rounded p-4  mx-auto" style={stage === 3 ? { display: 'block' } : { display: 'none' }}>
                                <h3></h3>
                                <big><p style={{ color: "green" }}>Arriving on {getCurrentDate()} </p></big>
                                <p>Items dispatched by Prime Store &nbsp; <img src="./logo.png" width="15" height="15" /></p>
                                <div className="row mx-5 ">
                                    {Object.entries(cartDetails).map(entry => {
                                        if (entry[1].checked == 1) {
                                            return (
                                                <>
                                                    <div key={entry[0]} className=" col-md-12 mt-3 px-1">
                                                        <div className="row ">
                                                            <div className="col-md-3 text-center ">
                                                                <img src={`https://best-store-api-77f5ba459c2e.herokuapp.com/images/${entry[1].imageFilename}`} height="70" alt="product" />
                                                                <p className="mt-2">Price : {toIndianFormat(entry[1].price)}.00 ₹</p>
                                                            </div>
                                                            <div className="col-md-8">
                                                                <big><p className="m-0">{entry[1].name}</p></big>
                                                                <p className="me-3">{`${entry[1].description.slice(0, 80)}... `}</p>

                                                            </div>
                                                            <div className="col-md-1 text-center mx-0 px-0">
                                                                <p className="m-0 px-1 py-3">Qty: {entry[1].quantity}</p>
                                                                <button className="btn btn-danger btn-sm">Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </>
                                            )
                                        }
                                        return null
                                    })}
                                </div>

                                <div className="d-flex justify-content-between" >
                                    <button className="btn btn-outline-primary ms-3 mt-3" onClick={() => setStage(2)}>BACK</button>
                                    <button className="btn btn-warning mt-3" onClick={handleCheckout}>CONTINUE</button>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="border  rounded p-4  mx-auto" style={{ position: "sticky", top: "80px" }}>
                            <h3>Cart summary</h3><hr />
                            <div className="d-flex justify-content-between px-5" style={{"line-height" : "1.2"}}>
                                <p>SubTotal :-</p>
                                <p>{`${toIndianFormat(Object.values(cartDetails).reduce((acc, curr) => acc + (curr.checked == 1 ? curr.price * curr.quantity : 0), 0))} ₹`}</p>
                            </div>
                            <div className="d-flex justify-content-between px-5" style={{"line-height" : "1.2"}}>
                                <p>Shipping :-</p>
                                <p>40 ₹</p>
                            </div>
                            <div className="d-flex justify-content-between px-5" style={{"line-height" : "1.2"}}>
                                <p style={{"color" : "green"}}>Discount :-</p>
                                <p style={{"color" : "green"}}>-80 ₹</p>
                            </div>
                            <hr className="my-2"/>
                            <div className="d-flex justify-content-between px-5" style={{"line-height" : "1.5"}}>
                                <big><p className="px-1">Total</p></big>
                                <big><p>{`${toIndianFormat(Object.values(cartDetails).reduce((acc, curr) => acc + (curr.checked == 1 ? curr.price * curr.quantity : 0), -40))} ₹`}</p></big>
                            </div>
                            <div className="text-center"><p className="text-success my-0">You will save 40₹ on this order!</p></div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
//https://best-store-api-77f5ba459c2e.herokuapp.com/static/icon.png
