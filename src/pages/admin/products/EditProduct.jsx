import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../../../AppContext"
export default function EditProduct() {

    const params = useParams()
    const { userCredentials, setUserCredentials } = useContext(AppContext)
    const [intialData, setIntialData] = useState({})
    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()

    function getProduct() {
        fetch(`https://best-store-api-77f5ba459c2e.herokuapp.com/product/${params.id}`).then((res) => {
            if (res.ok) {
                return res.json()
            }
            console.log(res)
            throw new Error('Something went wrong')
        }).then((data) => {
            console.log(data)
            setIntialData(data)
        }).catch((err) => console.log(err))
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const product = Object.fromEntries(formData.entries());
        if (!product.name || !product.brand || !product.category || !product.price
            || !product.description) {
            alert("All fields are required")
            return;
        } else {
            if (product.image.name) {
                try {
                    var form_data = new FormData();
                    form_data.append("image", intialData.imageFilename);
                    form_data.append("file", product.image);
                    form_data.append("sessionID", userCredentials.sessionID);
                    const res = await axios.patch('https://best-store-api-77f5ba459c2e.herokuapp.com/image/add/',
                        form_data, { withCredentials: true }
                    )
                    product.imageFilename = res.data.filename
                    console.log("Patch image filename: ", product.imageFilename)
                } catch (err) {
                    console.log(err)
                }
            } else {
                product.imageFilename = intialData.imageFilename
            }
            formData.delete('image');
            formData.append('imageFilename', product.imageFilename ? product.imageFilename : "default.png");
            formData.append("sessionID", userCredentials.sessionID);
            try {
                console.log(document.cookie)
                const config = {
                    withCredentials: true
                }
                const res = await axios.patch('https://best-store-api-77f5ba459c2e.herokuapp.com/product/edit/' + params.id, formData, config)
                if (res.status === 200) {
                    alert("Product added successfully")
                    navigate("/admin/products")
                } else if (res.status === 400) {
                    setValidationErrors(res.data)
                    console.log(validationErrors)
                } else {
                    alert("Something went wrong")
                }
            } catch (error) {
                alert("Server error")
                console.log(error)
            }
        }
    }
    useEffect(getProduct, [params.id]);
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 mx auto rounded border p-4">
                    <h2 className="text-center mb-5">Edit Product</h2>

                    <div className="row mb-3">
                        <label className="col-sm-3 col-form-label">ID</label>
                        <div className="col-sm-8">
                            <input readOnly className="form-control" defaultValue={params.id}></input>
                        </div>
                    </div>
                    {intialData &&
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" >Name</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="name" defaultValue={intialData.name} />
                                    <span className="text-danger">{validationErrors.name}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Brand</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="brand" defaultValue={intialData.brand} />
                                    <span className="text-danger">{validationErrors.brand}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" >Category</label>
                                <div className="col-sm-8">
                                    <select className="form-select" name="category" defaultValue={intialData.category}>
                                        <option value="Other">Other</option>
                                        <option value="Computers">Computers</option>
                                        <option value="Phones">Phones</option>
                                        <option value="Printers">Printers</option>
                                        <option value="Accessories">Accessories</option>
                                        <option value="Cameras">Cameras</option>
                                    </select>
                                    <span className="text-danger">{validationErrors.category}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" >Price</label>
                                <div className="col-sm-8">
                                    <input className="form-control" name="price" type="number" step={0.01} min={1} defaultValue={intialData.price} />
                                    <span className="text-danger">{validationErrors.price}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label" >Description</label>
                                <div className="col-sm-8">
                                    <textarea className="form-control" name="description" defaultValue={intialData.description}></textarea>
                                    <span className="text-danger">{validationErrors.description}</span>
                                </div>
                            </div>


                            <div className="row mb-3">
                                <div className=" offset-sm-4 col-sm-8">
                                    <img src={`https://best-store-api-77f5ba459c2e.herokuapp.com/images/${intialData.imageFilename}`} alt="Product" className="img-fluid" width={150} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Image</label>
                                <div className="col-sm-8">
                                    <input className="form-control imageInput" name="image" type="file" />
                                    <span className="text-danger">{validationErrors.image}</span>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Created At</label>
                                <div className="col-sm-8">
                                    <input className="form-control-plaintext" readOnly defaultValue={intialData.createdAt?.slice(0, 10)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="offset-sm-4 col-sm-4 d-grid">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                                <div className="col-sm-4 d-grid">
                                    <Link className="btn btn-outline-primary" to="/admin/products">Cancel</Link>
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
