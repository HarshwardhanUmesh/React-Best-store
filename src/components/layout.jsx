import { Link } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "../AppContext"
import Cookies from 'js-cookie'

export function Navbar() {
    const {userCredentials,setUserCredentials} = useContext(AppContext)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <div className="container">
                    <Link className="navbar-brand text-center p-0 d-flex align-items-center" to='/'>
                        <img src="./logo.png" alt="Logo"  height="34" className="me-2 d-inline-block align-text-top" />
                        <h1 className="m-0" style={{fontFamily: "Quicksand, sans-serif", fontSize: "20px" ,fontWeight: "500" }}>Prime Store</h1>
                    </Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        {userCredentials && userCredentials.role === 'admin' &&
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/products">Product List</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/users">Client List</Link></li>
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><a className="dropdown-divider"></a></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link className="dropdown-item" to="/" onClick={() => {Cookies.remove('connect.sid') ; setUserCredentials(null);}}>Logout</Link></li>
                                </ul>
                            </li>
                        </ul>}
                        {userCredentials && userCredentials.role === 'user' &&
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Client
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/user/cart">Cart</Link></li>
                                    <li><Link className="dropdown-item" to="/user/history">Orders</Link></li>
                                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    <li><a className="dropdown-divider"></a></li>
                                    <div className="dropdown-divider"></div>
                                    <li><Link className="dropdown-item" to="/" onClick={() => {Cookies.remove('connect.sid') ; setUserCredentials(null);}}>Logout</Link></li>
                                </ul>
                            </li>
                            </ul>}
                        { !userCredentials &&
                    <ul className="navbar-nav mx-2">
                        <li className="nav-item my-1">
                            <Link className="btn btn-outline-primary me-2" to="/auth/register" role="button">Register</Link>
                        </li>
                        <li className="nav-item my-1">
                            <Link className="btn btn-primary" to="/auth/login" role="button">&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;</Link>
                        </li>
                    </ul>
                    }
                    </div>
                    
                </div>
            </nav>
        </>
    )
}

export function Footer() {
    return (
        <>
            <footer className="text-center p-3 border-top d-flex justify-content-center" >
                        <img src="./logo.png" alt=""  height="34" className="me-2 d-inline-block align-text-top" />
                        <h1 className="m-0" style={{fontFamily: "Quicksand, sans-serif", fontSize: "20px" ,fontWeight: "500" }}>Prime Store</h1>
                        <p>Copyright ©2024. All rights reserved.</p>
            </footer>
        </>
    )
}
