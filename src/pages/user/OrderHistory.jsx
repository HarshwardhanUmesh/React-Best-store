/* eslint-disable no-unused-vars */
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../../AppContext"
import  { useEffect, useState } from "react"
export default function OrderHistory() {
    const [orderHistoryDetails, setorderHistoryDetails] = useState([])
    const { userCredentials } = useContext(AppContext)
    async function getOrderHistory() {
        let orderHistory = []
        // const form_Date = new FormData();
        // form_Date.append("sessionID", userCredentials.sessionID)
        // // Convert FormData to a plain object
        // const formObj = Object.fromEntries(form_Date.entries());
        // // Convert the plain object to URLSearchParams
        // const params = new URLSearchParams(formObj).toString();
        const response = await axios.get(`https://best-store-api-77f5ba459c2e.herokuapp.com/orderHistory?sessionID=${userCredentials.sessionID}`, { withCredentials: true })
        if (response.status === 200) {
            // console.log(response.data)
            orderHistory = response.data.orderHistory
        } else {
            alert("Something went wrong")
        }
        let promise = orderHistory.map(async (order, index) => {
            let x = order.items.map(async item => {
                let v = await Object.keys(item).map(async key => {
                    // const form_Date = new FormData();
                    // form_Date.append("sessionID", userCredentials.sessionID)
                    // // Convert FormData to a plain object
                    // const formObj = Object.fromEntries(form_Date.entries());
                    // // Convert the plain object to URLSearchParams
                    // const params = new URLSearchParams(formObj).toString();
                    const resp = await axios.get(`https://best-store-api-77f5ba459c2e.herokuapp.com/product/${key}?sessionID=${userCredentials.sessionID}`, { withCredentials: true })
                    if (resp.status === 200) {
                        item[key] = { ...item[key], ...resp.data }
                    }
                })
                await Promise.all(v)
            })
            await Promise.all(x)
        })
        let d = await Promise.all(promise)
        // console.log(JSON.stringify(orderHistory))
        setorderHistoryDetails(orderHistory)
    }
    useEffect(() => {
        getOrderHistory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getTotal(items) {
        let total = 0
        Object.values(items).map(item => {
            Object.keys(item).map(key => {
                // console.log(item[key].price)
                total += item[key].price ? item[key].price : 0
            })
        })
        // console.log("Total",total)
        return total
    }
    console.log(JSON.stringify(orderHistoryDetails))
    return (
        <div className="container my-4 p-4 border rounded text-center">
            <h2 className="mb-5 text-start">Your Order History</h2>
            {
                orderHistoryDetails.map((order, index) => {
                    return (
                        <div className="col-md-10 border container mb-5 " key={index} style={{ borderRadius: "10px" }}>
                            <div className="row d-flex justify-content-between" style={{ backgroundColor: "gainsboro", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", }}>
                                <div className="col-md-4 m-3">
                                    <div className="row">
                                        <div className="col-md-6 text-center">
                                            <p className="mb-1">ORDER PLACED</p>
                                            <p className="mb-1">{Date(order.time).toString().slice(4, 15)}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-6 text-center">
                                                <p className="mb-1">TOTAL</p>
                                                <p className="mb-1">{getTotal(order.items)}$</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="d-flex mt-3 mb-0 py-0">
                                        <p className="mb-1">ORDER ID:&nbsp;</p>
                                        <p className="mb-1">#{order.time.toString().slice(0, 5)}-{order.time.toString().slice(5, 10)}</p>
                                    </div>
                                    <div className="d-flex mb-3 mt-0 py-0">
                                        <a className="mb-1 me-2">View Order Details</a>
                                        <p>|</p>
                                        <a className="mb-1 ms-2">Invoice</a>
                                    </div>
                                </div>
                            </div>
                            {Object.values(order.items).map((item, index) => {
                                const i = index
                                return (
                                    <div key={index}>
                                        {
                                            Object.values(item).map((value, index) => {
                                                return (
                                                    <div key={index} className="row">
                                                        <div className="d-flex justify-content-between m-5">
                                                            <div className="col-md-7">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <img src={"https://best-store-api-77f5ba459c2e.herokuapp.com/images/"+value.imageFilename} alt="product"  style={{ maxWidth:"200px",maxHeight:"150px"}} />
                                                                    </div>
                                                                    <div className="col-md-8 text-start ps-5">
                                                                        <p className="mb-1" style={{ fontSize: "1.5rem", fontWeight: "300" }}>{value.name}</p>
                                                                        <p className="mb-1">{value.description.slice(0, 80)}...</p>
                                                                        <div className="d-flex mt-3 justify-content-between">
                                                                            <p className="mb-1">Qty: {value.quantity}</p>
                                                                            <p className="mb-1 ms-5">Price: {value.price}$</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <button className="btn btn-outline-secondary">Write a product review</button>
                                                                <div className="d-flex justify-content-center mt-3">
                                                                    <button className="btn btn-outline-secondary mx-1">Reorder</button>
                                                                    <button className="btn btn-outline-secondary mx-1">Raise Dispute</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr style={Object.values(order.items).length - 1 == i ? { display: "none" } : {}}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
                )
            }

        </div>
    )
}
