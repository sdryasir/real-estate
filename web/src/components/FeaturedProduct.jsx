import React, {useEffect, useState} from 'react'
import { FeaturedProductData } from '../Data/FeaturedProduct'
import { useGetAllProductsQuery } from '../redux/api/productApi'
import ContentLoader from 'react-content-loader'
const FeaturedProduct = () => {



    const {data, isLoading, error} = useGetAllProductsQuery()



    const [products, setProducts] = useState([])



    useEffect(() => {
        if(data){
            setProducts(data.products)
        }  
        console.log(products);
        
    },[data, products])



    if(isLoading) return <ContentLoader/>
    

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
                                            <div className="featured__item__pic set-bg" data-setbg="img/featured/feature-1.jpg">
                                                <img src={item.img} />
                                                <ul className="featured__item__pic__hover">
                                                    <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                                    <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                                    <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                                </ul>
                                            </div>
                                            <div className="featured__item__text">
                                                <h6><a href="#">{item.title}</a></h6>
                                                <h5>{item.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default FeaturedProduct
