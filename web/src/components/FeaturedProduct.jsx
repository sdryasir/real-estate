import React, {useEffect, useState} from 'react'
import { FeaturedProductData } from '../Data/FeaturedProduct'
import { useGetAllProductsQuery } from '../redux/api/productApi'
import ContentLoader from 'react-content-loader'
import ReactPaginate from 'react-paginate';
const FeaturedProduct = () => {

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);

    const {data, isLoading, error} = useGetAllProductsQuery({ search, limit, sort, page})

    useEffect(() => {
        if(data){
            setProducts(data.products)
            setTotalPages(data.pages)
        }          
    },[data, products, search, sort, page, limit])

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // Reset to first page on search change
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1); // Reset to first page on sort change
    };

    const handleLimitChange = (e) => {
        setLimit(parseInt(e.target.value));
        setPage(1); // Reset to first page on limit change
    };

    const handlePageChange = (event) => {
        setPage(event.selected + 1);
    };

    if(isLoading) return <ContentLoader/>



    return (
        <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Featured Product</h2>
                            </div>
                            <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                />
                <select value={sort} onChange={handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="title">Title</option>
                    <option value="-title">Title (Desc)</option>
                    <option value="price">Price</option>
                    <option value="-price">Price (Desc)</option>
                </select>
                <select value={limit} onChange={handleLimitChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {
                            products?.map((item, idx) => {
                                return  <div className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat" key={idx}>
                                        <div className="featured__item">
                                            <div className="featured__item__pic set-bg" data-setbg={item?.images[0]?.url}>
                                                <img src={item?.images[0]?.url} />
                                                <ul className="featured__item__pic__hover">
                                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div className="featured__item__text">
                                                <h6><a href="#">{item?.title}</a></h6>
                                                <h5>{item?.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                    />
                </div>
            </section>
    )
}

export default FeaturedProduct
