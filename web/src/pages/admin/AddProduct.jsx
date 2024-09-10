import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAddProductMutation } from '../../redux/api/productApi';

const AddProduct = () => {
    const [addProduct, { isLoading, error, data }] = useAddProductMutation();
    const [apiMessage, setApiMessage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null);
    const [remainingImagesPreviews, setRemainingImagesPreviews] = useState([]);

    const formik = useFormik({
        initialValues: {
            title: '',
            price: '',
            stock: '',
            description: '',
            ratings: '',
            // category: '',
            weight: '',
            // numOfReviews: '',
            mainImage: '',
            remainingImages: []
        },
        validationSchema: Yup.object({
            title: Yup.string().min(5, 'Minimum 5 characters').max(50, 'Maximum 50 characters').required('Title is required'),
            price: Yup.number().min(100, 'Minimum price is 100').max(10000, 'Maximum price is 10000').required('Price is required'),
            description: Yup.string().min(10, 'Minimum 10 characters').required('Description is required'),
            stock: Yup.number().min(1, 'stock must be at least 1').max(100, 'stock not more than 100').required('stock is required'),
            ratings: Yup.number().min(1, 'Minimum rating is 1').max(5, 'Maximum rating is 5').required('Rating is required'),
            // category: Yup.string().required('Category is required'),
            weight: Yup.number().min(1, 'Minimum weight is 1').max(20, 'Maximum weight is 20').required('Weight is required'),
            // numOfReviews: Yup.number().min(0, 'Minimum number of reviews is 0').required('Number of reviews is required')
        }),
        onSubmit: async (values) => {
            try {
                const product = await addProduct(values).unwrap();

                if (product.success) {
                    setApiMessage(product);
                    formik.resetForm();
                    setMainImagePreview(null);
                    setRemainingImagesPreviews([]);
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
        formik.setFieldValue('mainImage', base64);
        setMainImagePreview(URL.createObjectURL(file));
    };

    const handleRemainingImagesChange = async (e) => {
        const files = Array.from(e.target.files);
        const base64Images = await Promise.all(files.map((file) => convertToBase64(file)));
        formik.setFieldValue('remainingImages', base64Images);
        setRemainingImagesPreviews(files.map((file) => URL.createObjectURL(file)));
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
                                    placeholder="Enter stock"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.stock && formik.touched.stock ? formik.errors.stock : null}
                                </strong>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <textarea
                                    className="mb-3"
                                    name="description"
                                    value={formik.values.description}
                                    placeholder="Enter Product Description"
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
                            {/* <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="text"
                                    name="category"
                                    value={formik.values.category}
                                    placeholder="Enter Category"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.category && formik.touched.category ? formik.errors.category : null}
                                </strong>
                            </div> */}
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
                            {/* <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="number"
                                    name="numOfReviews"
                                    value={formik.values.numOfReviews}
                                    placeholder="Enter Number of Reviews"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {formik.errors.numOfReviews && formik.touched.numOfReviews ? formik.errors.numOfReviews : null}
                                </strong>
                            </div> */}
                            <div className="col-lg-6 col-md-6">
                                <label>Main Image</label>
                                <input
                                    className="mb-3"
                                    type="file"
                                    name="mainImage"
                                    accept="image/*"
                                    onChange={handleMainImageChange}
                                />
                                {mainImagePreview && <img src={mainImagePreview} alt="Main Image Preview" width="200" />}
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <label>Additional Images (up to 5)</label>
                                <input
                                    className="mb-3"
                                    type="file"
                                    name="remainingImages"
                                    accept="image/*"
                                    multiple
                                    onChange={handleRemainingImagesChange}
                                />
                                <div className="image-previews">
                                    {remainingImagesPreviews.map((preview, index) => (
                                        <img key={index} src={preview} alt={`Remaining Image Preview ${index + 1}`} width="100" />
                                    ))}
                                </div>
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
