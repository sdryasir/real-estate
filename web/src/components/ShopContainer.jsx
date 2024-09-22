import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementQuantity, decrementQuantity, removeItem } from '../redux/features/cartSlice'

const ShopContainer = () => {
    const {cart} = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const handleRemove = (item) => {
        dispatch(removeItem(item));
    }
    const handleIncrement = (item) => {
        dispatch(incrementQuantity(item));
    }
    const handleDecrement = (item) => {
        dispatch(decrementQuantity(item));
    }
  return (
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
                                    cart?.map((item, index) => <tr key={index}>
                                    <td className="shoping__cart__item">
                                        <img style={{width:"100px"}} src={item.images[0].url} alt=""/>
                                        <h5>{item?.title}</h5>
                                    </td>
                                    <td className="shoping__cart__price">
                                        {item?.price}
                                    </td>
                                    <td className="shoping__cart__quantity">

                                        <div className="quantity">
                                            <div className="pro-qty">
                                                <button onClick={()=>handleDecrement(item)}>-</button>
                                                <input type="text" value={item?.qty}/>
                                                <button onClick={()=>handleIncrement(item)}>+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="shoping__cart__total">
                                        {item?.price * item?.qty}
                                    </td>
                                    <td className="shoping__cart__item__close">
                                        <span className="icon_close" onClick={()=>handleRemove(item)}></span>
                                    </td>
                                </tr>
                                )}
                                
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
                            <li>Subtotal <span>$454.98</span></li>
                            <li>Total <span>$454.98</span></li>
                        </ul>
                        <a href="#" className="primary-btn">PROCEED TO CHECKOUT</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ShopContainer