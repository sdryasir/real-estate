import React from 'react'
import { filterData } from '../Data/Filter.data'
const FilterShop = () => {
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
                                    <h6><span>12</span> Products found</h6>
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
         filterData.map((item,idx)=>{
           return <div className="col-lg-4 col-12" key={idx}>
             <div className="product__item">
                 <div className="product__item__pic set-bg" data-setbg="img/product/product-1.jpg">
                 <img src={item.img} alt="" />
                     <ul className="product__item__pic__hover">
                         <li><a href="#"><i className="fa fa-heart"></i></a></li>
                         <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                         <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                     </ul>
                 </div>
                 <div className="product__item__text">
                     <h6><a href="#">{item.title}</a></h6>
                     <h5>{item.price}</h5>
                 </div>
             </div>
         </div>
         })
        }
     </div>
    }
    </>
  )
}

export default FilterShop