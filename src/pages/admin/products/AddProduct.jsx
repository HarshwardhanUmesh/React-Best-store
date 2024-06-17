import { Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../../../AppContext"
export default function AddProduct() {
    const {userCredentials} = useContext(AppContext)
    const [validationErrors, setValidationErrors] = useState({})
    const navigate = useNavigate()
    async function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const product = Object.fromEntries(formData.entries());
        if (!product.name || !product.brand || !product.category || !product.price
             || !product.description || !product.image.name) {
            alert("All fields are required")
            return;
        }else{
            try {
                var form_data = new FormData();
                form_data.append("image", product.image);
                form_data.append("sessionID", userCredentials.sessionID);
                const res = await axios.post('https://best-store-api-77f5ba459c2e.herokuapp.com/image/add/',
                    form_data, { withCredentials: true }
                )
                product.imageFilename = res.data.filename
            }catch(err){
                console.log(err)
            }
            formData.delete('image');
            formData.append('imageFilename', product.imageFilename?product.imageFilename:"default.png");
            formData.append("sessionID", userCredentials.sessionID);
            try {
                const res = await axios.post('https://best-store-api-77f5ba459c2e.herokuapp.com/product/add/', formData, { withCredentials: true })
                if (res.status === 200){
                    alert("Product added successfully")
                    navigate("/admin/products")
                }else if(res.status === 400){
                    setValidationErrors(res.data)
                    console.log(validationErrors)
                }else{
                    alert("Something went wrong")
                }
            } catch (error) {
                alert("Server error")
                console.log(error)
            }
        }
    }
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 mx auto rounded border p-4">
                    <h2 className="text-center mb-5">Add Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name"/>
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="brand"/>
                                <span className="text-danger">{validationErrors.brand}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <select className="form-select" name="category">
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
                            <label className="col-sm-3 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type="number" step={0.01} min={1}/>
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" name="description"></textarea>
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-3 col-form-label">Image</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="image" type="file" />
                                <span className="text-danger">{validationErrors.image}</span>
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
                </div>
            </div>
        </div>
    )
}