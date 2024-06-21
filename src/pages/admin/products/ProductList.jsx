import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../../AppContext";

export default function ProductList() {
    const [productsList, setProductsList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchString, setSearchString] = useState("")
    const [sortColumn, setSortColumn] = useState({col : "id", order : 1})
    const limit = 5
    const {userCredentials, setUserCredentials} = useContext(AppContext)

    function getProductList() {
        fetch('https://best-store-api-77f5ba459c2e.herokuapp.com/products?_sort=' + sortColumn.col + '&_order=' + sortColumn.order + '&_page=' + page + '&_limit=' + limit + '&q=' + searchString)
            .then((res) => {
                if (res.ok) {
                    res.headers.forEach((key, value) => {
                        console.log(key, value)
                    })
                    var totalPages = Math.ceil(parseInt(res.headers.get('X-Total-Count')) / limit)
                    setTotalPages(totalPages);
                    console.log("totalPages", totalPages)
                    return res.json()
                }
                console.log(res)
                throw new Error('Something went wrong')
            })
            .then((data) => setProductsList(data))
            .catch((err) => console.log(err))
    }
    useEffect(getProductList, [page, searchString, sortColumn.col, sortColumn.order])
    function deleteProduct(id) {
        var confirm = window.confirm("Are you sure you want to delete this product?")
        if (!confirm) return
        axios.delete(`https://best-store-api-77f5ba459c2e.herokuapp.com/product/delete/${id}?sessionID=${userCredentials.sessionID}`, {
            withCredentials: true
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.data
                }
                console.log(res)
                throw new Error('Something went wrong')
            })
            .then(() => getProductList())
            .catch((err) => console.log(err))
    }

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

    function handleSearch(e){
        e.preventDefault()
        let searchText = e.currentTarget.parentNode.parentNode.childNodes[0].value
        console.log("SEARCH",searchText)
        setPage(1)
        setSearchString(searchText)
    }
        function toIndianFormat(n) {
        if (n === undefined) return
        let num = n.toString().split('.');
        let lastThree = num[0].substring(num[0].length - 3);
        let otherNumbers = num[0].substring(0, num[0].length - 3);
        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
        }
        let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return num.length > 1 ? result + "." + num[1] : result;
    }
    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Product List</h2>
            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-2" to="/admin/products/add">Add Product</Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getProductList}>Refresh</button>
                </div>
                <div className="col">
                    <form role="form">
                        <div className="row">
                        <div className="col-4"></div>
                            <div className="col-8">
                                <form className="input-group input-group-lg">
                                    <input type="text" className="form-control py-0 mx-2 rounded" style={{fontSize:"1rem"}} placeholder="Search" />    
                                    <div className="input-group-btn">
                                        <button type="submit" className="btn btn-outline-primary" onClick={handleSearch} >Search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center" scope="col" style={{cursor:"pointer"}} onClick={() => setSortColumn(sortColumn.col === "id" ? {col : "id", order : sortColumn.order === 1 ? -1 : 1} : {col : "id", order : 1})}>
                            #&nbsp;&nbsp;{sortColumn.col === "id" && <i className={`bi ${sortColumn.order === 1 ? "bi-sort-down-alt" : "bi-sort-up"}`}></i>}
                        </th>
                        <th className="text-center" scope="col" style={{cursor:"pointer"}} onClick={() => setSortColumn(sortColumn.col === "name" ? {col : "name", order : sortColumn.order === 1 ? -1 : 1} : {col : "name", order : 1})}>
                            Name&nbsp;&nbsp;{sortColumn.col === "name" && <i className={`bi ${sortColumn.order === 1 ? "bi-sort-down-alt" : "bi-sort-up"}`}></i>}
                        </th>
                        <th className="text-center" scope="col" style={{cursor:"pointer"}} onClick={() => setSortColumn(sortColumn.col === "brand" ? {col : "brand", order : sortColumn.order === 1 ? -1 : 1} : {col : "brand", order : 1})}>
                            Brand&nbsp;&nbsp;{sortColumn.col === "brand" && <i className={`bi ${sortColumn.order === 1 ? "bi-sort-down-alt" : "bi-sort-up"}`}></i>}
                        </th>
                        <th className="text-center" scope="col" style={{cursor:"pointer"}} onClick={() => setSortColumn(sortColumn.col === "category" ? {col : "category", order : sortColumn.order === 1 ? -1 : 1} : {col : "category", order : 1})}>
                            Category&nbsp;&nbsp;{sortColumn.col === "category" && <i className={`bi ${sortColumn.order === 1 ? "bi-sort-down-alt" : "bi-sort-up"}`}></i>}
                        </th>
                        <th className="text-center" scope="col" style={{cursor:"pointer"}} onClick={() => setSortColumn(sortColumn.col === "price" ? {col : "price", order : sortColumn.order === 1 ? -1 : 1} : {col : "price", order : 1})}>
                            Price&nbsp;&nbsp;{sortColumn.col === "price" && <i className={`bi ${sortColumn.order === 1 ? "bi-sort-down-alt" : "bi-sort-up"}`}></i>}
                        </th>
                        <th className="text-center" scope="col" >Image</th>
                        <th className="text-center" scope="col" style={{cursor:"pointer"}} onClick={() => setSortColumn(sortColumn.col === "createdAt" ? {col : "createdAt", order : sortColumn.order === 1 ? -1 : 1} : {col : "createdAt", order : 1})}>
                            Date&nbsp;&nbsp;{sortColumn.col === "createdAt" && <i className={`bi ${sortColumn.order === 1 ? "bi-sort-down-alt" : "bi-sort-up"}`}></i>}
                        </th>
                        <th className="text-center" scope="col" >Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productsList.map((product, index) => (
                        <tr key={index}>
                            <th scope="row" className="text-center">{product.id}</th>
                            <td className="text-center" >{product.name}</td>
                            <td className="text-center">{product.brand}</td>
                            <td className="text-center">{product.category}</td>
                            <td className="text-center">{toIndianFormat(product.price)} ₹</td>
                            <td className="text-center"><img src={`https://best-store-api-77f5ba459c2e.herokuapp.com/images/${product.imageFilename}`} alt="Product" width="100" height="auto" /></td>
                            <td className="text-center">{product.createdAt.slice(0, 10)}</td>
                            <td className="text-center">
                                <Link className="btn btn-primary me-2" to={`/admin/products/edit/${product.id}`}>Edit</Link>
                                <button type="button" className={`${product.id} btn btn-outline-danger`} onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination">{paginationBtns}</ul>
        </div>
    )
}
