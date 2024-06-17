import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

export default function Register() {
    const navigate = useNavigate();
    const {userCredentials,setUserCredentials} = useContext(AppContext)

    if (userCredentials) {
        return <Navigate to="/" />
    }

    const  handleSubmit = async (e) =>{
        e.preventDefault();
        const form_data = new FormData(e.target);
        let user = Object.fromEntries(form_data.entries());
        console.log(user);
        if (!user.firstName || !user.lastName || !user.username || !user.password) {
            alert("All fields are required")
            return;
        }
        if (user.password !== user.confirmPassword) {
            alert("Password doesn't match")
            return;
        }
        form_data.delete('confirmPassword');

        try {
            const res = await fetch("https://best-store-api-77f5ba459c2e.herokuapp.com/user/register", {
                method: "POST",
                body: form_data, 
            })
            const data = await res.json();
            // console.log(data);
            if (res.ok) {
                alert("Account created successfully" , data)
                setUserCredentials(data)
                navigate("/")
            }else{
                alert("Unable to create account", data)
            }
        }catch(err){
            console.log(err)
            alert("Server error")
        }
        
    }
    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-lg-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create new Account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">First Name *</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="firstName"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Last Name *</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="lastName"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Email *</label>
                            <div className="col-sm-8">
                                <input type="username" className="form-control" name="username"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Phone Number </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="phoneNumber"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Address </label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" rows="3" name="address"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Password *</label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" name="password"/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Confirm Password *</label>   
                            <div className="col-sm-8">
                                <input type="password" className="form-control" name="confirmPassword"/>
                            </div>  
                        </div>
                        <div className="row mb-3">
                            <div className="offset-sm-4 col-sm-4 d-grid">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                            <div className="col-sm-4 d-grid">
                                <Link type="submit" className="btn btn-danger" to="/">Cancel</Link>
                            </div>
                        </div>
                    </form>
                    <p>* Required</p>
                </div>
            </div>
        </div>
    )
}