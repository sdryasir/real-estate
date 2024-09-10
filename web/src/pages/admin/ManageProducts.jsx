import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDeleteProductMutation } from '../../redux/api/productApi'
import UpdateProduct from './UpdateProduct'

const ManageProducts = () => {

    const { products } = useSelector(state => state.products);
    const [deleteProduct] = useDeleteProductMutation();
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id)
            console.log('Product deleted');
            location.reload();
        } catch (error) {
            console.log('Error deleting product', error);
        }
    };

    const [product,setProduct] = useState();
    const handleEdit = (product) => {
       setProduct(product)
    }
    

    return (
        <>
            <div className='mt-4 container'>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <div><h3>Manage Products</h3></div>
                    <div>
                        <button className='btn btn-primary'><Link to={'/admin/add-product'} className='text-light'><b>Add Product</b></Link></button>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-4">
                        <input type="text" placeholder='Product Name' className='form-control' />
                    </div>
                    <div className='col-2'>
                        <select class="form-select">
                            <option selected>Select Category</option>
                            <option >Option 1</option>
                            <option >Option 2</option>
                            <option >Option 3</option>
                        </select>
                    </div>
                    <div>
                        <select class="form-select">
                            <option selected>Sort by</option>
                            <option >Option 1</option>
                            <option >Option 2</option>
                            <option >Option 3</option>
                        </select>
                    </div>
                </div>
                {
                    products.length <= 0 ? <h2 className='mt-4 mb-4'>No Products are Added</h2> :
                        <div className='mt-5 row mb-3'>
                            <b className="col-3">Title</b>
                            <b className="col-2">Price</b>
                            <b className="col-2">Quantity</b>
                            <b className="col-3">Actions</b>
                            <b className="">Image</b>
                        </div>
                }
                {
                    products?.length > 0 && products ?
                        products?.map((item, key) => {
                            return <div key={key} className='row mb-3'>
                                <td className='col-3'>{item.title}</td>
                                <td className='col-2'>{item.price}</td>
                                <td className='col-2'>{item.quantity}</td>
                                <td className='col-3'>
                                    <button className='actionEdit' onClick={() => handleEdit(item)} data-toggle="modal" data-target="#exampleModal">Edit</button>
                                    &nbsp;&nbsp;
                                    <button className='actionDelete' onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                                <img src={item.image ? item.image : 'https://img.freepik.com/premium-vector/fresh-colorful-mix-citrus-fruits-with-lemons-grapefruits-limes-as-still-life_985204-61111.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716681600&semt=ais_user'} alt="" className='prod-pic'/>
                            </div>
                        }) : null
                }
                <UpdateProduct product={product}/>
            </div>
        </>
    )
}

export default ManageProducts