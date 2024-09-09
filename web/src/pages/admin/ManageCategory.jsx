import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDeleteCategoryMutation } from '../../redux/api/categoryApi'
import UpdateCategory from './UpdateCategory'

const ManageCategory = () => {

    const { category } = useSelector(state => state.category);
    const [deleteCategory] = useDeleteCategoryMutation();
    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            location.reload();
        } catch (error) {
            console.log('Error deleting category', error);
        }
    }
    const [updatecategory,setUpdateCategory] = useState();
    const handleEdit = (category) => {
        setUpdateCategory(category)
    }

    return (
        <>
            <div className='mt-4 container'>
                <div className='d-flex align-items-center justify-content-between mb-4'>
                    <div><h3>Manage Category</h3></div>
                    <div>
                        <button className='btn btn-primary'><Link to={'/admin/add-category'} className='text-light'><b>Add Category</b></Link></button>
                    </div>
                </div>
                <div className="row">
                    <div className=" col-4">
                        <input type="text" placeholder='Category Name' className='form-control' />
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
                    category.length <= 0 ? <h2 className='mt-4 mb-4'>No Categories are Added</h2> :
                        <div className='mt-5 row mb-3'>
                            <b className="col-2">#</b>
                            <b className="col-4">Category Name</b>
                            <b className="col-4">Actions</b>
                            <b className="">Image</b>
                        </div>
                }
                {
                    category?.length > 0 && category ?
                        category?.map((item, key) => {
                            return <div key={key} className='row mb-3'>
                                <td className='col-2'>{++key}</td>
                                <td className='col-4'>{item.title}</td>
                                <td className='col-4'>
                                    <button className='actionEdit'  onClick={() => handleEdit(item)} data-toggle="modal" data-target="#exampleModal">Edit</button>
                                    &nbsp;&nbsp;
                                    <button className='actionDelete' onClick={() => handleDelete(item._id)}>Delete</button>
                                </td>
                                <img src={item.image ? item.image : 'https://img.freepik.com/premium-vector/fresh-colorful-mix-citrus-fruits-with-lemons-grapefruits-limes-as-still-life_985204-61111.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716681600&semt=ais_user'} alt="" className='prod-pic' />
                            </div>
                        }) : null
                }
            <UpdateCategory category={updatecategory}/>
            </div>
        </>
    )
}

export default ManageCategory