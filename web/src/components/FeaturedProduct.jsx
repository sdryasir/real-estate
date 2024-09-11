import React, {useEffect, useState} from 'react'
import { FeaturedProductData } from '../Data/FeaturedProduct'
import { useGetAllProductsQuery } from '../redux/api/productApi'
import ContentLoader from 'react-content-loader'
import ReactPaginate from 'react-paginate';
const FeaturedProduct = () => {

    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);

    const {data, isLoading, error} = useGetAllProductsQuery({ search, limit, sort, page})

    const [products, setProducts] = useState([])



    useEffect(() => {
        if(data){
            setProducts(data.products)
        } 
        console.log("---------------", products);
         
    },[data, products])



    if(isLoading) return <ContentLoader/>


    
    const endOffset = itemOffset + limit;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.page;
    const pageCount = data.pages;


    const handlePageClick = (event) => {
        setPage(page + 1);
        if(page > pageCount){
            setPage(page-1)
        }
    }
    

    return (
        <>
            <section className="featured spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h2>Featured Product</h2>
                            </div>
                            
                        </div>
                    </div>
                    <div className="row featured__filter">
                        {
                            products.map((item, idx) => {
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
                                nextLabel="next"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={pageCount}
                                previousLabel="previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                </div>
            </section>
        </>
    )
}

export default FeaturedProduct
