import React from 'react';
import OwlCarousel from 'react-owl-carousel';

const Category = () => {
  return (
    <div>
      <section className="categories">
        <div className="container">
          <div className="row">
            <OwlCarousel
              className="categories__slider owl-carousel"
              loop={true}
              margin={0}
              items={4}
              dots={false}
              nav={true}
              navText={[
                "<span class='fa fa-angle-left'><span/>",
                "<span class='fa fa-angle-right'><span/>",
              ]}
              animateOut="fadeOut"
              animateIn="fadeIn"
              smartSpeed={1200}
              autoHeight={false}
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
                },
                992: {
                  items: 4,
                },
              }}
            >
              <div className="col-lg-3">
                <div className="categories__item set-bg" data-setbg="img/categories/cat-1.jpg">
                  <img src='img\categories\cat-1.jpg'/>
                  <h5><a href="#">Fresh Fruit</a></h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="categories__item set-bg" data-setbg="img/categories/cat-2.jpg">
                <img src='img\categories\cat-2.jpg'/>
                  <h5><a href="#">Dried Fruit</a></h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="categories__item set-bg" data-setbg="img/categories/cat-3.jpg">
                <img src='img\categories\cat-3.jpg'/>
                  <h5><a href="#">Vegetables</a></h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="categories__item set-bg" data-setbg="img/categories/cat-4.jpg">
                <img src='img\categories\cat-4.jpg'/>
                  <h5><a href="#">drink fruits</a></h5>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="categories__item set-bg" data-setbg="img/categories/cat-5.jpg">
                <img src='img\categories\cat-5.jpg'/>
                  <h5><a href="#">drink fruits</a></h5>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;