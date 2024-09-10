import React from 'react'
import OwlCarousel from 'react-owl-carousel';
const LatestProdSlider = () => {
    return (
        <>
            <OwlCarousel
                className="latest-product__slider owl-carousel"
                loop={true}
                items={1}
                nav={true}
                smartSpeed={1200}
                autoplay={true}
            >
                <div className="latest-prdouct__slider__item">
                    <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                            <img src="img/latest-product/lp-1.jpg" alt="" />
                        </div>
                        <div className="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                        </div>
                    </a>
                    <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                            <img src="img/latest-product/lp-2.jpg" alt="" />
                        </div>
                        <div className="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                        </div>
                    </a>
                    <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                            <img src="img/latest-product/lp-3.jpg" alt="" />
                        </div>
                        <div className="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                        </div>
                    </a>
                </div>
                <div className="latest-prdouct__slider__item">
                    <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                            <img src="img/latest-product/lp-1.jpg" alt="" />
                        </div>
                        <div className="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                        </div>
                    </a>
                    <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                            <img src="img/latest-product/lp-2.jpg" alt="" />
                        </div>
                        <div className="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                        </div>
                    </a>
                    <a href="#" className="latest-product__item">
                        <div className="latest-product__item__pic">
                            <img src="img/latest-product/lp-3.jpg" alt="" />
                        </div>
                        <div className="latest-product__item__text">
                            <h6>Crab Pool Security</h6>
                            <span>$30.00</span>
                        </div>
                    </a>
                </div>
            </OwlCarousel>
        </>
    )
}

export default LatestProdSlider