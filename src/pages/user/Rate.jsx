import { useContext } from "react"
import { AppContext } from "../../AppContext"
import { useNavigate } from "react-router-dom"
export default function Rate() {
    const navigate = useNavigate()
    const {userCredentials} = useContext(AppContext)
    return (
        <div className="container my-4">
            <h2>Thank you {userCredentials.firstName.toUpperCase()} for shopping with us!</h2>
            <div className="my-5 border rounded p-4 col-md-6 mx-auto">
            <h4>Please rate your experience:</h4>
            <form onSubmit={
                (e) => {
                    navigate("/")
                    e.preventDefault()
                }
            }>
                <div className="form-group my-3">
                    <label htmlFor="rating my-2">Rating (Out of 5):</label>
                    <select className="form-control my-2" id="rating">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="feedback my-2">Feedback:</label>
                    <textarea className="form-control my-2" id="feedback" rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
            </div>
        </div>
    )
}