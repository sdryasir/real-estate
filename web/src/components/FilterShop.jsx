import React, {useEffect, useState} from 'react'
import { filterData } from '../Data/Filter.data'
import { useParams } from 'react-router-dom'
import { useGetAllProductsQuery } from '../redux/api/productApi'
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
const FilterShop = () => {
    const {id} = useParams();

    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('desc');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [category, setCategory] = useState('');

    const {data, isLoading, error} = useGetAllProductsQuery({ search, limit, sort, page, category})

    useEffect(() => {
        setCategory(id)
        if(data){
            setProducts(data.products)
            setTotalPages(data.pages)
        }  
    },[data, products, search, sort, page, limit, category]);

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



  return (
    <>
    <div className="filter__item">
                        <div className="row">
                            <div className="col-lg-4 col-md-5">
                                <div className="filter__sort">
                                    <span>Sort By</span>
                                    <select className='sort-select'>
                                        <option value="0">Default</option>
                                        <option value="0">Default</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="filter__found">
                                    <h6><span>{products?.length}</span> Products found on this page</h6>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-3">
                                <div className="filter__option">
                                    <span className="icon_grid-2x2"></span>
                                    <span className="icon_ul"></span>
                                </div>
                            </div>
                        </div>
                    </div>
    {
        <div className="row container">
        
        {
         products?.map((item,idx)=>{
           return <div className="col-lg-4 col-12" key={idx}>
             <div className="product__item">
                 <div className="product__item__pic set-bg" data-setbg={item?.images[0]?.url}>
                 <img src={item?.images[0]?.url} alt="" />
                     <ul className="product__item__pic__hover">
                         <li><a href="#"><i className="fa fa-heart"></i></a></li>
                         <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                         <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                     </ul>
                 </div>
                 <div className="product__item__text">
                     <h6><Link to={`/product/${item._id}`}>{item.title}</Link></h6>
                     <h5>{item.price}</h5>
                 </div>
             </div>
         </div>
         })
        }
     </div>
    }
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
    </>
  )
}

export default FilterShop