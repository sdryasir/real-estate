import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
      <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="header__logo">
                        <a href="./index.html"><img src="img/logo.png" alt=""/></a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <nav className="header__menu">
                        <ul>
                            <li className="active"><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/shop'}>Shop</Link></li>
                            <li><a href="#">Pages</a>
                                <ul className="header__menu__dropdown">
                                    <li><Link to={'/shop-details'}>Shop Details</Link></li>
                                    <li><Link to={'/cart'}>Shoping Cart</Link></li>
                                    <li><Link to={'/check-out'}>Check Out</Link></li>
                                    <li><Link to={'/blog-details'}>Blog Details</Link></li>
                                </ul>
                            </li>
                            <li><Link to={'/blog'}>Blog</Link></li>
                            <li><Link to={'/contact'}>Contact</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="col-lg-3">
                    <div className="header__cart">
                        <ul>
                            <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                            <li><a href="#"><i className="fa fa-shopping-bag"></i> <span>3</span></a></li>
                        </ul>
                        <div className="header__cart__price">item: <span>$150.00</span></div>
                    </div>
                </div>
            </div>
            {/* <div className="humberger__open">
                <i className="fa fa-bars"></i>
            </div> */}
        </div>
    </>
  )
}

export default Navbar
