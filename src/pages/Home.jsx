/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
export default function Home() {
    const [ProductsList, setProductsList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState({brand : "", category : ""})
    const [sortColumn, setSortColumn] = useState({col : "id", order : 1})
    const limit = 12
    function getProductList() {
        let url = 'https://best-store-api-77f5ba459c2e.herokuapp.com/products?_sort=' + sortColumn.col + '&_order=' + sortColumn.order + '&_page=' + page + '&_limit=' + limit + '&q=' + (filters.brand !== "" ? "&brand=" + filters.brand : "") + (filters.category !== "" ? "&category=" + filters.category : "")
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    // res.headers.forEach((key, value) => {
                    //     console.log(key, value)
                    // })
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
    useEffect(getProductList, [filters.brand, filters.category, page, sortColumn.col, sortColumn.order])


    var paginationBtns = []
    for (let i = 1; i <= totalPages; i++) {
        paginationBtns.push(
            <li className={(i === page) ? "page-item active" : "page-item"} key={i} onClick={(event) => {
                event.preventDefault()
                setPage(i)
            }}><a className="page-link" href={"?page=" + i}>{i}</a></li>
        )
    }

    function handleBrandChange(e) {
        setFilters({ ...filters, brand: (e.target.value !== "All Brands") ? e.target.value : "" })
        setPage(1)
    }
    function handleCategoryChange(e) {
        setFilters({ ...filters, category: (e.target.value !== "All Categories") ? e.target.value : "" })
        setPage(1)
    }
    function handleSort(e) {
        let value = e.target.value
        if (value === "0") {
            setSortColumn({ col: "id", order: 1 })
        } else if (value === "1") {
            setSortColumn({ col: "price", order: 1 })
        } else if (value === "2") {
            setSortColumn({ col: "price", order: -1 })
        }
    }
    return (
        <>
            <div style={{ minheight: '400px', backgroundColor: '#08618d', width: 'wrap-content' }}>
                <div className="container text-white py-5">
                    <div className="row g-5">
                        <div className="col-md-6">
                            <h1 className="mb-5 display-2">Best Store of Electronics</h1>
                            <p className="lead">
                                Find the best electronics for your needs.<br></br> From the latest gadgets to powerful workstations, we have it all.
                            </p>
                        </div>
                        <div className="col-md-6 text-center">
                            <img src="https://best-store-api-77f5ba459c2e.herokuapp.com/static/hero.png" alt="hero" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-light">
                <div className="container py-5">
                    <div className="row mb-5 g-2">
                        <div className="col-md-6">
                            <h4>Products</h4>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleBrandChange}>
                                <option selected>All Brands</option>
                                <option value="Samsung">Samsung</option>
                                <option value="Apple">Apple</option>
                                <option value="Nokia">Nokia</option>
                                <option value="Hp">Hp</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleCategoryChange}>
                                <option selected>All Categories</option>
                                <option value="Computers">Computers</option>
                                <option value="Phones">Phones</option>
                                <option value="Printers">Printers</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Cameras">Cameras</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-select" onChange={handleSort}>
                                <option selected value="0">Order By Newest</option>
                                <option value="1">Price : Low to High</option>
                                <option value="2">Price :High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="row mb-5 g-3">
                        {ProductsList.map((product, index) => (
                            <div className="col-md-3 col-sm-6" key={index}>
                                <ProductItem product={product} />
                            </div>
                        ))}
                    </div>
                    <ul className="pagination">{paginationBtns}</ul>
                </div>
            </div>
        </>
    )
}

function ProductItem({ product }) {
    return (
        <div className="rounded border shadow p-4 text-center h-100">
            <img src={`https://best-store-api-77f5ba459c2e.herokuapp.com/images/${product.imageFilename}`} className="img-fluid" alt={product.name} style={{ height: '220px', objectFit: 'contain' }} />
            <hr />
            <h4 className="py-2">{product.name}</h4>
            <p>Brand : {product.brand} ,Category : {product.category} <br />
                {product.description.substring(0, 50) + "..."}
            </p>
            <h4 className="mb-2">{product.price}$</h4>
            <Link className="btn btn-primary btn-sm m-2" to={`/products/${product.id}`}>View Details</Link>
        </div>
    )
}