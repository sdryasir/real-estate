import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddProductMutation } from '../../redux/api/productApi';

const AddProduct = () => {
    const [addProduct, { isLoading, error, data }] = useAddProductMutation();
    const [apiMessage, setApiMessage] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [mainImagePreview, setMainImagePreview] = useState(null); // Preview for the main image
    const [remainingImages, setRemainingImages] = useState([]);
    const [remainingImagesPreviews, setRemainingImagesPreviews] = useState([]); // Previews for remaining images

    const dispatch = useDispatch();

    const { handleChange, handleBlur, handleSubmit, handleReset, errors, touched, values, resetForm } = useFormik({
        initialValues: {
            title: '',
            price: '',
            quantity: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().min(3, 'Minimum 3 characters').max(100, 'Maximum 100 characters').required('Title is required').trim(),
            price: Yup.number().min(0, 'Price must be a positive number').required('Price is required'),
            description: Yup.string().min(10, 'Minimum 10 characters').max(500, 'Maximum 500 characters').required('Description is required').trim(),
            quantity: Yup.number().min(1, 'Quantity must be at least 1').max(100, 'Quantity not more than 100').required('Quantity is required'),
        }),
        onSubmit: async (values) => {
          // Prepare form data for multipart request
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('price', values.price);
          formData.append('quantity', values.quantity);
          formData.append('description', values.description);
      
          if (mainImage) {
              formData.append('mainImage', mainImage);
          }
      
          remainingImages.forEach((image) => {
              formData.append('remainingImages', image);
          });
      
          try {
              const product = await addProduct(formData).unwrap();
              console.log(product);
      
              if (product.success) {
                  setApiMessage(product);
                  // Reset form and images only if submission is successful
                  resetForm(); // Reset form fields
                  setMainImage(null); // Clear main image
                  setMainImagePreview(null); // Clear main image preview
                  setRemainingImages([]); // Clear remaining images
                  setRemainingImagesPreviews([]); // Clear remaining images previews
              } else {
                  setApiMessage({
                      success: false,
                      message: product.message || 'Something went wrong',
                  });
              }
          } catch (error) {
              console.error(error);
              setApiMessage({
                  success: false,
                  message: 'Error creating product',
              });
          }
      },
    });

    // Handle main image file input change
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        setMainImage(file);
        setMainImagePreview(URL.createObjectURL(file)); // Create preview URL
    };

    // Handle remaining images input change
    const handleRemainingImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setRemainingImages(files);
        setRemainingImagesPreviews(files.map((file) => URL.createObjectURL(file))); // Create preview URLs
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
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="text"
                                    name="title"
                                    value={values.title}
                                    placeholder="Enter Product Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {errors.title && touched.title ? errors.title : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3"
                                    type="number"
                                    name="price"
                                    value={values.price}
                                    placeholder="Enter Price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {errors.price && touched.price ? errors.price : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input
                                    className="mb-3 mt-3"
                                    type="number"
                                    name="quantity"
                                    value={values.quantity}
                                    placeholder="Enter Quantity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {errors.quantity && touched.quantity ? errors.quantity : null}
                                </strong>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <textarea
                                    className="mb-3 mt-3"
                                    name="description"
                                    value={values.description}
                                    placeholder="Enter Product Description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <strong className="text-danger mx-2">
                                    {errors.description && touched.description ? errors.description : null}
                                </strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <label>Main Image</label>
                                <input
                                    className="mb-3"
                                    type="file"
                                    name="mainImage"
                                    accept="image/*"
                                    onChange={handleMainImageChange}
                                />
                                {/* Preview main image */}
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
                                {/* Preview remaining images */}
                                <div className="image-previews">
                                    {remainingImagesPreviews.map((preview, index) => (
                                        <img key={index} src={preview} alt={`Remaining Image Preview ${index + 1}`} width="100" />
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-12 text-center">
                                <button type="submit" className="site-btn mb-3">Add Product</button> <br />
                                <Link to={'/'} className='text-primary'>Go Back</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
