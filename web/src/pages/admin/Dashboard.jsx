import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useGetAllCategoryQuery } from '../../redux/api/categoryApi';
import { useGetAllProductsQuery } from '../../redux/api/productApi';

const Dashboard = () => {

    const {products} = useSelector(state=>state.products);
    useGetAllProductsQuery();
    useGetAllCategoryQuery();

    return (
        <>
            <div className='dashboard'>
                <div className='aside p-4'>
                    <center>
                        <h3>Links</h3>
                        <hr className='mt-5'/>
                        <Link to={'/admin/add-product'} className='text-dark'><b>Add New Product</b></Link><br /><hr />
                        <Link to={'/admin/manage-products'} className='text-dark'><b>Manage All Products</b></Link><br /><hr />
                        <Link to={'/admin/add-category'} className='text-dark'><b>Add New Category</b></Link><br /><hr />
                        <Link to={'/admin/manage-category'} className='text-dark'><b>Manage All Categories</b></Link><hr />
                    </center>
                </div>
                <div className='dashboard-container p-4'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div><h3>Dash Board</h3></div>
                        <div><Link to={'/admin/add-product'} className='text-light'><button className='btn btn-primary'><b>Add New Product</b></button></Link></div>
                    </div>
                    {
                        products.length<=0 ? <h2 className='mt-5'>No Products Found</h2> :
                                    <div className='mt-5 row mb-3'>
                                    <b className="col-2">#</b>
                                    <b className="col-2">Title</b>
                                    <b className="col-2">Price</b>
                                    <b className="col-2">Quantity</b>
                                    <b className="col-4">Description</b>
                                    </div>
                    }
                    {
                        products?.length > 0 && products?
                            products?.map((item,key) => {
                                return <div key={key} className='row mb-3'>
                                            <th className='col-2'>{++key}</th>
                                            <td  className='col-2'>{item.title}</td>
                                            <td className='col-2'>{item.price}</td>
                                            <td className='col-2'>{item.quantity}</td>
                                            <td className='col-4'>{item.description}</td>
                                </div>
                    })  : null
                   }
                </div>

            </div>
        </>
    )
}

export default Dashboard