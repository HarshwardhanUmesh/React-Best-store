import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../AppContext"

import axios from "axios"

export default function ProductDetails() {
    const params = useParams()
    const [product, setProduct] = useState({})
    const {userCredentials} = useContext(AppContext);
    // sessionid keyword- form_data.append("sessionID", userCredentials.sessionId)
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    async function getProduct() {
        try {
            const res = await fetch('https://best-store-api-77f5ba459c2e.herokuapp.com/product/' + params.id)
            const product = await res.json()
            if (res.ok) {
                setProduct(product)
            } else {
                alert("Something went wrong")
            }
        } catch (error) {
            console.log(error)
            alert("Server error")
        }

    }
    useEffect(() => {
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Add params.id to the dependency array

    async function addTOCart(e) {
        e.preventDefault()
        if (!userCredentials){
            navigate("/auth/login")
            return
        }
        const form_data = new FormData(e.target);
        form_data.append("id", params.id);
        form_data.append("sessionID", userCredentials.sessionID) //add an entry to the form\
        try {
            let res = await axios.post('https://best-store-api-77f5ba459c2e.herokuapp.com/cart/add', form_data, { withCredentials: true })
            if (res.status === 200) {
                alert("Added to cart")
            }
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/auth/login")
            }else{
                console.log(error)
                alert("Server error")
            }
        }
    }
    function toIndianFormat(n) {
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
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-4 text-center">
                        <img src={"https://best-store-api-77f5ba459c2e.herokuapp.com/images/" + product.imageFilename} alt="..." className="img-fluid mb-3" width={250} />
                    </div>
                    <div className="col-md-8">
                        <h3 className="mb-3">{product.name}</h3>
                        <h3 className="mb-3">{toIndianFormat(product.price)}&nbsp;₹</h3>
                        <form className="d-flex mb-3 text-center" onSubmit={addTOCart}>
                            <p className="me-2 pt-2">Qty:</p>
                            <input className="form-control form-control-sm me-3 mt-1" name="quantity" type="number" step={1} min={1} max={9} defaultValue={1} style={{ width: "50px" ,height:"30px"}} />
                            <button type="submit" className="btn btn-primary btn-sm mt-1" style={{ height: "30px" }}>
                            Add to cart &nbsp;&nbsp;
                            <i className="bi bi-cart4"></i>
                        </button>
                        </form>
                        
                        <hr />
                        <div className="row mb-3">
                            <div className="col-sm-3 fw-bold">Brand</div><div className="col-sm-9">{product.brand}</div>

                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-3 fw-bold">Category</div><div className="col-sm-9">{product.category}</div>
                        </div>
                        <div className="fw-bold">Description</div>
                        <p className="mb-3">{product.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
