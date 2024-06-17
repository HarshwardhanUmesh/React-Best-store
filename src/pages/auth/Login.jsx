import { Link, useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import axios from "axios";
export default function Login() {
    const navigate = useNavigate();
    const {userCredentials,setUserCredentials} = useContext(AppContext)

    if (userCredentials) {
        return <Navigate to="/" />
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form_data = new FormData(e.target);
        let user = Object.fromEntries(form_data.entries());
        // console.log(user.toString());
        if (!user.username || !user.password) {
            alert("All fields are required")
            return;
        }
        try {
            const res = await axios.post("https://best-store-api-77f5ba459c2e.herokuapp.com/user/login", form_data, {
                withCredentials: true,
            })
            if (res.status === 401) {
                alert("Invalid credentials")
            } else {
                const data = res.data;
                // console.log(data);
                if (res.status === 200) {
                    alert("Login successful");
                    console.log(Object.fromEntries(res.headers));
                    setUserCredentials(data);
                    navigate("/");
                } else {
                    alert("Login failed", data);
                }
            }
        } catch (err) {
                console.log(err)
                alert("Server error")
        }

        
    }
    return (
        <div className="container my-4">
            <div className="mx-auto rounded border p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-5">Welcome,please Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" />
                    </div>
                    <div className="row">
                        <div className="offset-sm-4 col-sm-4 d-grid">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <div className="col-sm-4 d-grid">
                            <Link type="submit" className="btn btn-danger" to="/">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}