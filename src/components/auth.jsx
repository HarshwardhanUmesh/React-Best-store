import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AppContext } from "../AppContext"
export  function AdminRoute(props){
    const {userCredentials} = useContext(AppContext)
    if (!userCredentials || userCredentials.role !== 'admin') {
        return <Navigate to="/" />
    }
    // eslint-disable-next-line react/prop-types
    return props.children
}

export function AuthRoute(props){
    const {userCredentials} = useContext(AppContext)
    if (!userCredentials) {
        return <Navigate to="/" />
    }
    // eslint-disable-next-line react/prop-types
    return props.children
}

export function UserRoute(props){
    const {userCredentials} = useContext(AppContext)
    if (!userCredentials || userCredentials.role !== 'user') {
        return <Navigate to="/" />
    }
    // eslint-disable-next-line react/prop-types
    return props.children
}
 