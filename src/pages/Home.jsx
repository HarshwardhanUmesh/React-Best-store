/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
export default function Home() {
    const [ProductsList, setProductsList] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState({ brand: "", category: "" })
    const [sortColumn, setSortColumn] = useState({ col: "id", order: 1 })
    const limit = 12
    const [timeUntilMidnight, setTimeUntilMidnight] = useState(getTimeUntilMidnight());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUntilMidnight(getTimeUntilMidnight());
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    function getTimeUntilMidnight() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
        const diff = midnight - now;

        const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

        return { hours, minutes, seconds };
    }


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
            {/* <div style={{ minheight: '400px', backgroundColor: '#08618d', width: 'wrap-content' }}>
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
            </div>*/ }
            <div>
                <div id="myCarousel" className="carousel slide" data-bs-ride="carousel" style={{ marginBottom: "0px" }}>
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1" ></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
                        <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className=""></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item ">
                            <img className="bd-placeholder-img" src="./bagpack.jpg" style={{ objectFit: 'cover' }}></img>
                            {/* <svg  width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#6bb5cb"></rect></svg> */}

                            <div className="container">
                                <div className="carousel-caption text-start" style={{ right: "6%", left: "6%" }}>
                                   <div className='text-start' style={{ minHeight: '400px' }}>
                                        <h1 className="chalk-line-outline" style={{ fontFamily: "Quicksand", fontSize: "80px" }}>Back to School<br/> Savings!</h1>
                                        <br/>
                                        <h1 style={{ fontFamily:"Quicksand", fontSize:"30px"}}>Special Discounts on Laptops and Tablets<br/>Free bag included with every purchase</h1>
                                        <br/>
                                        {/* <p style={{ fontFamily: "Chalk Line Outline", fontSize: "20px" }}>Upgrade your study setup with top-notch laptops and tablets</p> */}
                                        <button className="btn btn-outline-light btn-lg" type="button" style={{ fontFamily:"Quicksand", fontSize:"20px"}}>Shop Now</button>
                                    </div> 

                                </div>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#08618d"></rect></svg> */}
                            <img className="bd-placeholder-img" src="./bg.jpg" style={{ objectFit: 'cover',
                                    filter: "blur(5px)", }}></img>

                            <div className="container">
                                <div className="carousel-caption" style={{
                                    right: "6%", left: "6%",
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // semi-transparent black background
                                    padding: '20px',
                                    borderRadius: '8px',
                                    color: 'white' // ensure the text color is opaque
                                }}>
                                    <div className="text-center" style={{ minHeight: '400px', width: 'wrap-content', display: 'grid', placeItems: 'center' }}>
                                        <div >
                                            <h1 style={{
                                                fontSize: "180px",
                                                fontFamily: "Quicksand, sans-serif",
                                                fontOpticalSizing: "auto",
                                                fontWeight: "600",
                                                fontStyle: "normal"
                                            }}>Prime Store</h1>
                                            <p style={{
                                                fontSize: "30px",
                                                fontFamily: "Quicksand, sans-serif",
                                                fontOpticalSizing: "auto",
                                                fontWeight: "300",
                                                fontStyle: "normal"
                                            }}
                                            >Find the best electronics for your needs.<br />
                                                From the latest gadgets to powerful workstations, we have it all.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="bd-placeholder-img" src="./gradient.png"></img>
                            {/* <div className='bg-placeholder' style={{background: "white"}}></div> */}
                            {/* <svg className="bd-placeholder-img" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg> */}

                            <div className="container">
                                <div className="carousel-caption text-end pb-0" style={{ right: "6%", left: "6%", bottom: "0%" }}>
                                    <div className='row g-5'>
                                        <div className='col-md-4 pe-5'>
                                            <img src="./Kiara.png" />
                                        </div>
                                        <div className='col-md-8 text-center ps-5'>
                                            <h1 style={{
                                                fontSize: "160px",
                                                fontFamily: "Quicksand, sans-serif",
                                                fontOpticalSizing: "auto",
                                                fontWeight: "700",
                                                fontStyle: "normal"
                                            }}>50% OFF</h1>
                                            <p style={{
                                                fontSize: "30px",
                                                fontFamily: "Quicksand, sans-serif",
                                                fontOpticalSizing: "auto",
                                                fontWeight: "300",
                                                fontStyle: "normal"
                                            }}
                                            >On All Audio Devices Until Midnight!</p>
                                            <p style={{
                                                fontSize: "80px",
                                                fontFamily: "Quicksand, sans-serif",
                                                fontOpticalSizing: "auto",
                                                fontWeight: "300",
                                                fontStyle: "normal"
                                            }}
                                            >{`${timeUntilMidnight.hours}:${timeUntilMidnight.minutes}:${timeUntilMidnight.seconds}`}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev" style={{ width: '5%' }}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next" style={{ width: '5%' }}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
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
                            <div className="col-md-3 col-sm-6 p-2" key={index}>
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


const FloatingElement = ({ textInput }) => {
    const floatingElementStyle = {
      position: 'absolute',
      top: '-10px', // Adjust the top position as needed
      right: '-10px', // Adjust the right position as needed
      color: 'white', // Text color
      padding: '10px', // Padding around the text
      borderRadius: '50%', // Make it circular
      width: '50px', // Width of the circle
      height: '50px', // Height of the circle
      display: 'flex', // Center the text
      alignItems: 'center', // Center the text
      justifyContent: 'center', // Center the text
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for better visibility
      zIndex: 1000, // Ensure it stays on top of other elements
      textAlign: 'center', // Center align text inside the circle
      lineHeight: '0.2', // Center align text inside the circle
    };
  
    return (
      <div className="bg-danger" style={floatingElementStyle}>
        <div>
          <p>{textInput}</p>
          <p className='mb-0'>OFF</p>
        </div>
      </div>
    );
  };

  function toIndianFormat(n) {
    let num = n.toString().split('.');
    let lastThree = num[0].substring(num[0].length - 3);
    let otherNumbers = num[0].substring(0, num[0].length - 3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
    }
    let result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return num.length > 1 ? result + "." + num[1] : result;
  }
  
  
function ProductItem({ product }) {
    return (
        <div className="rounded border shadow p-4 text-center h-100" style={{ position: 'relative' }}>
            <FloatingElement textInput="10%"/>
            <img src={`https://best-store-api-77f5ba459c2e.herokuapp.com/images/${product.imageFilename}`} className="img-fluid" alt={product.name} style={{ height: '220px', objectFit: 'contain' }} />
            <hr />
            <h4 className="py-2">{product.name}</h4>
            <p>Brand : {product.brand} ,Category : {product.category} <br />
                {product.description.substring(0, 50) + "..."}
            </p>
            <h4 className="mb-2">{toIndianFormat(product.price)}&nbsp;₹</h4>
            <Link className="btn btn-primary btn-sm m-2" to={`/products/${product.id}`}>View Details</Link>
        </div>
    )
}
