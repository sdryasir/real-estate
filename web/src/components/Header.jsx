import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useGetMeQuery, useLazyLogoutQuery } from '../redux/api/authApi';
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
import { clearUserInfo } from '../redux/features/authSlice';


const Header = () => {


  const {isLoading} = useGetMeQuery()
  const [logout, {data}] = useLazyLogoutQuery()
  const {isAuthenticated, user} = useSelector(state=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const handlelogout = async ()=>{
    await logout()
    navigate(0)
  }
  

    const [showMenu, setShowMenu] = useState(false);

    const handleHamburgerClick = () => {
      setShowMenu(!showMenu);
    };

    const [showPagesDropdown, setShowPagesDropdown] = useState(false);

    const handlePagesClick = () => {
      setShowPagesDropdown(!showPagesDropdown);
    };


  return (
    <>
      
 
      {showMenu && (<div className="humberger__menu__overlay active" onClick={() => setShowMenu(false)}></div>)}
      
        
        {showMenu && (
        <div className="humberger__menu__wrapper show__humberger__menu__wrapper">
          <div className="humberger__menu__logo">
            <a href="#"><img src="img/logo.png" alt=""/></a>
        </div>
        <div className="humberger__menu__cart">
            <ul>
                <li><a href="#"><i className="fa fa-heart"></i> <span>1</span></a></li>
                <li><a href="#"><i className="fa fa-shopping-bag"></i> <span>3</span></a></li>
            </ul>
            <div className="header__cart__price">item: <span>$150.00</span></div>
        </div>
        <div className="humberger__menu__widget">
            <div className="header__top__right__language">
                <img src="img/language.png" alt=""/>
                <div>English</div>
                <span className="arrow_carrot-down"></span>
                <ul>
                    <li><a href="#">Spanis</a></li>
                    <li><a href="#">English</a></li>
                </ul>
            </div>
            <div className="header__top__right__auth">
  
            <Link to={'/register'}><i className="fa fa-user"></i> Sign-up</Link>
            <Link to={'/login'}><i className="fa fa-user"></i> Login</Link>
            </div>
        </div>
        <nav className="humberger__menu__nav mobile-menu">
  <ul>
    <li className="active">
      <Link to={'/'}>Home</Link>
    </li>
    <li>
      <Link to={'/shop'}>Shop</Link>
    </li>
    <li>
        <a onClick={handlePagesClick}>
          Pages <i className="fa-solid fa-angle-right"></i>
        </a>
        {showPagesDropdown && (
          <ul className="header__menu__dropdown">
            <li>
              <Link to={'/shop-details'}>Shop Details</Link>
            </li>
            <li>
              <Link to={'/cart'}>Shoping Cart</Link>
            </li>
            <li>
              <Link to={'/check-out'}>Check Out</Link>
            </li>
            <li>
              <Link to={'/blog-details'}>Blog Details</Link>
            </li>
          </ul>
        )}
      </li>
    <li>
      <Link to={'/blog'}>Blog</Link>
    </li>
    <li>
      <Link to={'/contact'}>Contact</Link>
    </li>
  </ul>
</nav>
          <div id="mobile-menu-wrap"></div>
        <div className="header__top__right__social">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-linkedin"></i></a>
            <a href="#"><i className="fa fa-pinterest-p"></i></a>
            
        </div>
        <div className="humberger__menu__contact">
            <ul>
                <li><i className="fa fa-envelope"></i> hello@colorlib.com</li>
                <li>Free Shipping for all Order of $99</li>
            </ul>
        </div>
        </div>
      )}
        
    
   

   
    <header className="header">
        <div className="header__top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-6">
                        <div className="header__top__left">
                            <div className="header__top__right__social">
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-linkedin"></i></a>
                                <a href="#"><i className="fa fa-pinterest-p"></i></a>
                                
                            </div>
                            <div className="header__top__right__language">
                                <img src="img/language.png" alt=""/>
                                <div>English</div>
                                <span className="arrow_carrot-down"></span>
                                <ul>
                                    <li><a href="#">Spanis</a></li>
                                    <li><a href="#">English</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      
                            <div className='d-flex justify-content-end'>
                              <div className="header__top__right__auth d-flex pt-3">
                                
                                {
                                  isAuthenticated && (user?.success || user.data?.success) ? <div className="header__top__right__language">
                                  <img style={{width:'30px', height:'30px', borderRadius:'50%'}} src={user?.user?.avatar} alt=""/>
                                  <div>Hi, {user?.user?.firstname} {user?.user?.lastname}</div>
                                  <span className="arrow_carrot-down"></span>
                                  <ul>
                                      <li><Link to="#">Dashboard</Link></li>
                                      <li><Link to="#">Profile</Link></li>
                                      <li><button onClick={handlelogout}>Logout</button></li>
                                  </ul>
                                  </div>:
                                  <>
                                  <Link to={'/register'}><i className="fa fa-user"></i> Sign-up</Link>
                                  <Link to={'/login'}><i className="fa fa-user"></i> Login</Link>
                                  </>
                                }
                                
                              </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
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
            <div className="humberger__open" onClick={handleHamburgerClick}>
                <i className="fa fa-bars"></i>
            </div>
        </div>
    </header>
    
    </>
  )
}

export default Header
