import React from 'react';
import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';
import { useGetAllCategoryQuery } from '../redux/api/categoryApi';
import { Link } from 'react-router-dom';


const Category = () => {

  const {data: categories, isLoading, error} = useGetAllCategoryQuery()

  const settings = {
    lazyload: true,
    nav: false,
    mouseDrag: true
  };
  
  return (
    <div>
      <section className="categories">
        <div className="container">
          <div className="row">
            {
                categories?.category?.map((category) => 
                  <div className="col-lg-3">
                    <div className="categories__item set-bg" data-setbg={category?.image?.url}>
                      <img src={category?.image?.url}/>
                      <h5><Link to={`/shop/${category._id}`}>{category.title}</Link></h5>
                    </div>
                  </div>
                )
              }

          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;