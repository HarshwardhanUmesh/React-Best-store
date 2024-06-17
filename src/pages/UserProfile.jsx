/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import { useContext } from "react";
import { AppContext } from "../AppContext";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function displayProfile() {
    const {userCredentials} = useContext(AppContext)
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <>
            <div className="row mb-3">
                <div className="col-sm-3">First Name</div>
                <div className="col-sm-6">{capitalizeFirstLetter(userCredentials.firstName)}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">Last Name</div>
                <div className="col-sm-6">{capitalizeFirstLetter(userCredentials.lastName)}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">Email</div>
                <div className="col-sm-6">{userCredentials.username}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">Phone</div>
                <div className="col-sm-6">{userCredentials.phoneNumber ? "+91 " + userCredentials.phoneNumber.toString() : 'N/A'}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">Address</div>
                <div className="col-sm-6">{userCredentials.address ? userCredentials.address : 'N/A'}</div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">Role</div>
                <div className="col-sm-6">{userCredentials.role}</div>
            </div>
        </>
    
    )
}

function updateProfile() {
    const {userCredentials, setUserCredentials} = useContext(AppContext);
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("id", userCredentials.id)//add an entry to the form
        formData.append("sessionID", userCredentials.sessionID) // sessionID provided in the form
        const user = Object.fromEntries(formData.entries());
        if (!user.firstName || !user.lastName || !user.username) {
            alert("All fields are required")
            return;
        }
        try {
            const res = await axios.post('https://best-store-api-77f5ba459c2e.herokuapp.com/user/update/', user, { withCredentials: true })
            if (res.status === 200){
                setUserCredentials(res.data)
                alert("Profile updated successfully")
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            alert("Server error")
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
            <label className="col-sm-4 col-form-label">First Name *</label>
            <div className="col-sm-8">
                <input className="form-control" name="firstName" defaultValue={userCredentials.firstName}/>
            </div>
            </div>

            <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Last Name *</label>
            <div className="col-sm-8">
                <input className="form-control" name="lastName" defaultValue={userCredentials.lastName}/>
            </div>
            </div>
            
            <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Email *</label>
            <div className="col-sm-8">
                <input className="form-control" name="username" defaultValue={userCredentials.username} readOnly/>
            </div>  
            </div>                

            <div className="row mb-3">    
            <label className="col-sm-4 col-form-label">Phone</label>
            <div className="col-sm-8">
                <input className="form-control" name="phoneNumber" defaultValue={userCredentials.phoneNumber}/>
            </div> 
            </div>

            <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Address</label>
            <div className="col-sm-8">
                <input className="form-control" name="address" defaultValue={userCredentials.address}/>
            </div>
            </div>


            <div className="text-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
            </div>

        </form>
    )
}

function updatePassword() {
    // const navigate = useNavigate();
    const {userCredentials, setUserCredentials} = useContext(AppContext);
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("username", userCredentials.username) //add an entry to the form
        formData.append("sessionID", userCredentials.sessionID) // sessionID provided in the form
        const user = Object.fromEntries(formData.entries());
        if (!user.oldpassword || !user.newpassword) {
            alert("All fields are required")
            return;
        }
        try {
            const res = await axios.post('https://best-store-api-77f5ba459c2e.herokuapp.com/user/updatePassword/', user, { withCredentials: true })
            if (res.status === 200){
                setUserCredentials(null)
                alert("Password updated successfully")
                // navigate("/auth/login")
            }else{
                alert("Something went wrong")
            }
        } catch (error) {
            alert("Server error")
        }
    }    
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Old Password *</label>
                <input className="form-control" name="oldpassword" type="password"/>
            </div>
            <div className="mb-3">
            <label className="form-label">New Password *</label>
                <input className="form-control" name="newpassword" type="password"/>
            </div>
            <div className="text-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
}
export default function UserProfile() {
    const [actions, setActions] = useState(0)
    return (
        <div className="container my-4">
            <div className="row ">
                {actions === 0 && 
                <div className="col-lg-8 mx-auto rounded border p-4">
                    <h2 className="mb-3">User Profile</h2>
                    <hr />
                    {displayProfile()}
                    <hr />
                    <button className="btn btn-primary btn-sm me-2" onClick={() => setActions(1)}>Update Profile</button>
                    <button className="btn btn-warning btn-sm" onClick={() => setActions(2)}>Update Password</button>
                </div>
                }
                {actions === 1 && 
                <div className="col-lg-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-3">Update Profile</h2>
                    <hr />
                    {updateProfile()}
                    <hr />
                    <div className="text-center">
                        <button type="button" className="btn btn-link text-decoration-none" onClick={() => setActions(0)}>Back to Profile</button>
                    </div>
                </div>
                }
                {actions === 2 &&
                <div className="col-lg-5 col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-3">Update Password</h2>
                    <hr />
                    {updatePassword()}
                    <hr />
                    <div className="text-center">
                        <button type="button" className="btn btn-link text-decoration-none" onClick={() => setActions(0)}>Back to Profile</button>
                    </div>
                </div>
                }
            </div>
        </div>
            )
}