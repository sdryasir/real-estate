import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementItem, decrementItem, removeItem } from '../redux/features/cartSlice'
import {Link} from 'react-router-dom'
const ShopContainer = () => {
    const {cart} = useSelector(state=>state.cart)
    const dispatch = useDispatch();
    const handleIncrement = (item)=>{
        dispatch(incrementItem(item))
    }
    const handleDecrement = (item)=>{
        dispatch(decrementItem(item))
    }
    const handleRemove = (item)=>{
        dispatch(removeItem(item))
        // console.log("**********", item);
        
    }
  return (
    <>
     <section className="shoping-cart spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="shoping__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th className="shoping__product">Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   cart?.map((item, i)=><tr key={i}>
                                    <td className="shoping__cart__item">
                                        <img style={{width:'100px'}} src={item.images[0].url} alt=""/>
                                        <h5>{item?.title}</h5>
                                    </td>
                                    <td className="shoping__cart__price">
                                        PKR {item?.price}
                                    </td>
                                    <td className="shoping__cart__quantity">
                                        <div className="quantity">
                                            <div className="pro-qty">
                                                <button onClick={()=>handleDecrement(item)}>-</button>
                                                <input type="text" value={item?.qty}/>
                                                <button  onClick={()=>handleIncrement(item)}>+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="shoping__cart__total">
                                        {item?.price * item?.qty}
                                    </td>
                                    <td className="shoping__cart__item__close">
                                        <span onClick={()=>handleRemove(item)} className="icon_close"></span>
                                    </td>
                                </tr>) 
                                }

                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="shoping__cart__btns">
                        <a href="#" className="primary-btn cart-btn">CONTINUE SHOPPING</a>
                        <a href="#" className="primary-btn cart-btn cart-btn-right"><span className="icon_loading"></span>
                            Upadate Cart</a>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="shoping__continue">
                        <div className="shoping__discount">
                            <h5>Discount Codes</h5>
                            <form action="#">
                                <input type="text" placeholder="Enter your coupon code"/>
                                <button type="submit" className="site-btn">APPLY COUPON</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="shoping__checkout">
                        <h5>Cart Total</h5>
                        <ul>
                            <li>Subtotal <span>PKR.{cart.reduce(function(acc, val) { return acc + (val.price * val.qty); }, 0)}</span></li>
                            <li>Shipping Charges <span>{cart.length==0 ? 0 :150}</span></li>
                            <li>Total <span>PKR.{
                                cart.length==0? cart.reduce(function(acc, val) { return acc + (val.price * val.qty); }, 0): cart.reduce(function(acc, val) { return acc + (val.price * val.qty); }, 0) + 150
                                }</span></li>
                        </ul>
                        <Link to={'/check-out'} className="primary-btn">PROCEED TO CHECKOUT</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ShopContainer