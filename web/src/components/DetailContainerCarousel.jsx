import React from 'react'
import OwlCarousel from 'react-owl-carousel';

const DetailContainerCarousel = () => {
    return (
        <>
            <OwlCarousel
                className="product__details__pic__slider owl-carousel"
                loop={true}
                items={4}
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
                    <img data-imgbigurl="img/product/details/product-details-2.jpg"
                        src="img/product/details/thumb-1.jpg" alt="" />
                    <img data-imgbigurl="img/product/details/product-details-3.jpg"
                        src="img/product/details/thumb-2.jpg" alt="" />
                    <img data-imgbigurl="img/product/details/product-details-4.jpg"
                        src="img/product/details/thumb-3.jpg" alt="" />
                    <img data-imgbigurl="img/product/details/product-details-5.jpg"
                        src="img/product/details/thumb-4.jpg" alt="" />
            </OwlCarousel>
        </>
    )
}

export default DetailContainerCarousel