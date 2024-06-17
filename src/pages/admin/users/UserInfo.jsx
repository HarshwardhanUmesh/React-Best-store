import { Link } from "react-router-dom";
import { useState } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";
import { useEffect } from "react";

export default function UserInfo() {
    const [user, setUser] = useState({})
    const params = useParams()
    const {userCredentials, setUserCredentials } = useContext(AppContext)
    async function getUser() {
        try {
            const res = await axios.get(`https://best-store-api-77f5ba459c2e.herokuapp.com/userInfo/${params.id}?sessionID=${userCredentials.sessionID}`, {
                withCredentials: true
            })
            if (res.status === 401) {
                alert("Unauthorized")
                setUserCredentials(null)
                return
            }
            if (res.status === 200) {
                setUser(res.data)
            }
        } catch (error) {
            console.log(error)
            alert("Server error")
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <div className="container my-4">
            <h2 className="mb-3">User Info</h2>
            <hr/>
            <div className="row mb-3">
                <div className="col-4">ID</div>
                <div className="col-8">{user.id}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">First Name</div>
                <div className="col-8">{user.firstName}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Last Name</div>
                <div className="col-8">{user.lastName}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Email</div>
                <div className="col-8">{user.username}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Address</div>
                <div className="col-8">{user.address ? user.address : "N/A"}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Phone</div>
                <div className="col-8">{user.phone ? user.phone : "N/A"}</div>
            </div>
            <div className="row mb-3">
                <div className="col-4">Role</div>
                <div className="col-8">{user.role}</div>
            </div>
            <hr/>
            <Link className="btn btn-primary btn-sm" to="/admin/users" role="button">Back</Link>
        </div>
    )
}