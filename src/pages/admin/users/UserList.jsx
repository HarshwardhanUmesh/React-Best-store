import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../../../AppContext'
import { useContext } from 'react'
export default function UserList() {
    const {userCredentials, setUserCredentials} = useContext(AppContext)
    const [users , setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const limit = 3
    async function getUsers() { 
        try {
            const res = await axios.get("https://best-store-api-77f5ba459c2e.herokuapp.com/users?"  + "&_page=" + page + "&_limit=" + '&_page=' + page + '&_limit=' + limit + '&sessionID=' + userCredentials.sessionID , { withCredentials: true })  
            if (res.status === 200) {
                var totalPages = Math.ceil(parseInt(res.data.totalCount) / limit)
                console.log("total pages" , totalPages)
                setTotalPages(totalPages);
                setUsers(res.data.users)
            }else if (res.status === 401) {
                setUserCredentials(null)
            }   
        } catch (error) {
            console.log(error)  
        }
    }
    useEffect(() => {
        getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit])
    var paginationBtns = []
    for (let i = 1; i <= totalPages; i++) {
        paginationBtns.push(
            <li className={(i === page) ? "page-item active" : "page-item"} key={i} onClick={(event) => {
                event.preventDefault()
                setPage(i)
            }}><a className="page-link" href={"?page=" + i}>{i}</a></li>
        )
    }
    console.log(paginationBtns)

    return (
        <div className="container my-4">    
            <h2 className="text-center mb-3">User List</h2> 
            <table className="table">
                <thead>
                    <tr>
                        <th >#</th>
                        <th >First Name</th>
                        <th >Last Name</th>
                        <th >Email</th>
                        <th >Role</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.role[0] === "admin" ? <span className="badge rounded-pill bg-warning">ADMIN</span> : <span className="badge rounded-pill bg-info">CLIENT</span> }</td>
                        <td>
                            <Link className="btn btn-primary btn-sm " role='button' to={"/admin/user/" + user.id} >Details</Link>
                        </td>
                    </tr>
                ))} 
                </tbody>
            </table> 
            <ul className='pagination'>{paginationBtns}</ul>
        </div>
    )
}