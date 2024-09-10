import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const LatestProducts = () => {
  const carouselSettings = {
    loop: true,
    margin: 0,
    items: 1,
    dots: false,
    nav: true,
    navText: [
      '<span class="fa fa-angle-left"></span>',
      '<span class="fa fa-angle-right"></span>',
    ],
    smartSpeed: 1200,
    autoplay: true,
  };

  const carouselItems = [
    {
      image: 'img/latest-product/lp-1.jpg',
      title: 'Crab Pool Security',
      price: '$30.00',
    },
    {
      image: 'img/latest-product/lp-2.jpg',
      title: 'Crab Pool Security',
      price: '$30.00',
    },
    {
      image: 'img/latest-product/lp-3.jpg',
      title: 'Crab Pool Security',
      price: '$30.00',
    },
  ];

  return (
    <section className="latest-product spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Latest Products</h4>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Top Rated Products</h4>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="latest-product__text">
              <h4>Review Products</h4>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
              <OwlCarousel className="owl-theme" {...carouselSettings}>
                {carouselItems.map((item, index) => (
                  <div key={index} className="latest-product__item">
                    <div className="latest-product__item__pic">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="latest-product__item__text">
                      <h6>{item.title}</h6>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;