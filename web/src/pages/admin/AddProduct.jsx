import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useAddProductMutation } from '../../redux/api/productApi';
import { useGetAllCategoryQuery } from '../../redux/api/categoryApi';

const AddProduct = () => {
    const [addProduct, { isLoading, error }] = useAddProductMutation();
    const [apiMessage, setApiMessage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const { user } = useSelector(state => state.auth);
    const { data: categoriesData } = useGetAllCategoryQuery();

    const categories = categoriesData?.category?.map(cat => ({
        id: cat._id,
        title: cat.title
    })) || [];

    const categoryNameToIdMap = categories.reduce((acc, cat) => {
        acc[cat.title] = cat.id;
        return acc;
    }, {});

    const formik = useFormik({
        initialValues: {
            title: '',
            price: '',
            stock: '',
            description: '',
            ratings: '',
            category: '', 
            weight: '',
            numReviews: '',
            image: [{ public_id: "", url: "" }],
            reviews: [{ user: "", rating: '', comment: '' }],
            user: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().min(5, 'Minimum 5 characters').max(50, 'Maximum 50 characters').required('Title is required'),
            price: Yup.number().min(100, 'Minimum price is 100').max(10000, 'Maximum price is 10000').required('Price is required'),
            description: Yup.string().min(10, 'Minimum 10 characters').required('Description is required'),
            stock: Yup.number().min(1, 'Stock must be at least 1').max(100, 'Stock not more than 100').required('Stock is required'),
            ratings: Yup.number().min(1, 'Minimum rating is 1').max(5, 'Maximum rating is 5').required('Rating is required'),
            category: Yup.string().required('Category is required'),
            weight: Yup.number().min(1, 'Minimum weight is 1').max(20, 'Maximum weight is 20').required('Weight is required'),
            numReviews: Yup.number().min(0, 'Minimum number of reviews is 0').required('Number of reviews is required')
        }),
        onSubmit: async (values) => {
      
            const categoryId = categoryNameToIdMap[values.category];
            if (!categoryId) {
                setApiMessage({ success: false, message: 'Invalid category selected' });
                return;
            }

            const productData = {
                ...values,
                category: categoryId, 
                user: user._id
            };

            console.log('hh', productData);
            

            try {
                const product = await addProduct(productData).unwrap();
                if (product.success) {
                    setApiMessage(product);
                    formik.resetForm();
                    setMainImagePreview(null);
                } else {
                    setApiMessage({
                        success: false,
                        message: product.message || 'Something went wrong',
                    });
                }
            } catch (error) {
                setApiMessage({
                    success: false,
                    message: 'Error creating product',
                });
            }
        }
    });

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleMainImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        formik.setFieldValue('image', [{ public_id: "", url: base64 }]);
        setMainImagePreview(URL.createObjectURL(file));
    };

    return (
        <>
            <div className="contact-form spad">
                <div className="container">
                    {apiMessage && (
                        <div className={`alert alert-${apiMessage.success ? 'success' : 'danger'}`} role="alert">
                            {apiMessage.message}
                        </div>
                    )}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact__form__title">
                                <h2>Add New Product</h2>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="text"
                                    name="title"
                                    value={formik.values.title}
                                    placeholder="Enter Product Title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.title && formik.touched.title ? formik.errors.title : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="number"
                                    name="price"
                                    value={formik.values.price}
                                    placeholder="Enter Price"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.price && formik.touched.price ? formik.errors.price : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="number"
                                    name="stock"
                                    value={formik.values.stock}
                                    placeholder="Enter Stock Quantity"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.stock && formik.touched.stock ? formik.errors.stock : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <textarea
                                    className="mb-3"
                                    name="description"
                                    value={formik.values.description}
                                    placeholder="Enter Description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.description && formik.touched.description ? formik.errors.description : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="number"
                                    name="ratings"
                                    value={formik.values.ratings}
                                    placeholder="Enter Ratings (1-5)"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.ratings && formik.touched.ratings ? formik.errors.ratings : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="number"
                                    name="weight"
                                    value={formik.values.weight}
                                    placeholder="Enter Weight"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.weight && formik.touched.weight ? formik.errors.weight : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="number"
                                    name="numReviews"
                                    value={formik.values.numReviews}
                                    placeholder="Enter Number of Reviews"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.numReviews && formik.touched.numReviews ? formik.errors.numReviews : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <select
                                    name="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="mb-3"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.title}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                                <strong className="text-danger mx-2">
                                    {formik.errors.category && formik.touched.category ? formik.errors.category : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <label>Image</label>
                                <input
                                    className="mb-3"
                                    type="file"
                                    name="image"
                                    onChange={handleMainImageChange}
                                />
                                {mainImagePreview && <img src={mainImagePreview} alt="Main Image Preview" width="200" />}
                            </div>
                            <div className="col-lg-12 text-center">
                                <button type="submit" className="site-btn mb-3" disabled={isLoading}>
                                    {isLoading ? 'Adding Product...' : 'Add Product'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
