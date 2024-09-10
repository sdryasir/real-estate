import React from 'react'
import Sidebar from '../components/Sidebar.Shop'
import SaleOffCarousel from '../components/SaleOffCarousel'
import FilterShop from '../components/FilterShop'
import HeroSection from '../components/HeroSection'
import BreadcrumbSection from '../components/Breadcrumb'
const Shop = () => {
  return (
    <>
  <HeroSection/>
  <BreadcrumbSection pageName={'Shop'}/>
    <section className="product spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-5">
                    <Sidebar/>
                </div>
                <div className="col-lg-9 col-md-7">
                    <div className="product__discount">
                        <div className="section-title product__discount__title">
                            <h2>Sale Off</h2>
                        </div>
                       <SaleOffCarousel/>
                    </div>
                    <FilterShop/>
                    <div className="product__pagination">
                        <a href="#">1</a>
                        <a href="#">2</a>
                        <a href="#">3</a>
                        <a href="#"><i className="fa fa-long-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    </>
  )
}

export default Shop