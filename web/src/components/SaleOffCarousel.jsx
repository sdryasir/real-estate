import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import { saleCarouselData } from '../Data/SaleOff.data';
const SaleOffCarousel = () => {
    return (
        <>
            <div className="row">
                <OwlCarousel
                    className="product__discount__slider owl-carousel"
                    loop={true}
                    items={3}
                    animateOut="fadeOut"
                    animateIn="fadeIn"
                    smartSpeed={1200}
                    autoplay={true}
                    responsive={{
                        0: {
                          items: 1,
                        },
                        480: {
                          items: 2,
                        },
                        768: {
                          items: 3,
                        }
                      }}
                >
                    {
                        saleCarouselData.map((item,idx)=>{
                            return  <div className="col-lg-4" key={idx}>
                            <div className="product__discount__item">
                                <div className="product__discount__item__pic set-bg"
                                    data-setbg="img/product/discount/pd-1.jpg">
                                        <img src={item.img} alt="" />
                                    <div className="product__discount__percent">{item.discount}</div>
                                    <ul className="product__item__pic__hover">
                                        <li><a href="#"><i className="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i className="fa fa-retweet"></i></a></li>
                                        <li><a href="#"><i className="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div className="product__discount__item__text">
                                    <span>{item.category}</span>
                                    <h5><a href="#">{item.title}</a></h5>
                                    <div className="product__item__price">{item.price1} <span>{item.price2}</span></div>
                                </div>
                            </div>
                        </div>
                        })
                    }
                        
                </OwlCarousel>
            </div >
        </>
    )
}

export default SaleOffCarousel