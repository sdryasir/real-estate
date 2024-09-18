import React from 'react'
import OwlCarousel from 'react-owl-carousel';

const DetailContainerCarousel = ({images}) => {
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
                    <img data-imgbigurl={images && images[0]?.url} src={images && images[0]?.url} alt="" />
            </OwlCarousel>
        </>
    )
}

export default DetailContainerCarousel