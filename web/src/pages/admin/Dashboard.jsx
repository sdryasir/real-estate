import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetAllCategoryQuery } from '../../redux/api/categoryApi';
import { useGetAllProductsQuery } from '../../redux/api/productApi';
import DataTable from 'react-data-table-component';

const Dashboard = () => {
    const { products } = useSelector(state => state.products);
    useGetAllProductsQuery();
    useGetAllCategoryQuery();

    const columns = [
        {
            name: '#',
            cell: (row, index) => index + 1, // Auto-increment serial number
            width: '80px'
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true
        },
        {
            name: 'Stock',
            selector: row => row.stock,
            sortable: true
        },
        {
            name: 'Weight',
            selector: row => row.weight,
            sortable: true
        },
        {
            name: 'Rating',
            selector: row => row.ratings,
            sortable: true
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true
        }
    ];

    return (
        <>
            <div className='dashboard'>
                <div className='aside p-4'>
                    <center>
                        <h3>Links</h3>
                        <hr className='mt-5' />
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
                        products.length <= 0
                            ? <h2 className='mt-5'>No Products Found</h2>
                            : <DataTable
                                columns={columns}
                                data={products}
                                noDataComponent={<h2>No products available</h2>}
                                pagination
                                highlightOnHover
                                pointerOnHover
                              />
                    }
                </div>
            </div>
        </>
    );
}

export default Dashboard;
