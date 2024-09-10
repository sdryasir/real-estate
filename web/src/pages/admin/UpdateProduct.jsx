import React from 'react'
import { useFormik } from 'formik';
import { useUpdateProductMutation } from '../../redux/api/productApi';

const UpdateProduct = ({ product }) => {
    const [updateMutation] = useUpdateProductMutation()
    const { handleChange, handleBlur, handleSubmit, handleReset, values } = useFormik({
        initialValues: product,
        enableReinitialize: true,
        onSubmit: async (values) => {
          try {
             await updateMutation(values);
             location.reload();
             handleReset()
          } catch (error) {
              console.error(error);
          }
      },
    });
    return (
        <>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mt-3">
                        <form onSubmit={handleSubmit}>
                        <center>
                            <div>
                                <input
                                    className="mb-3"
                                    type="text"
                                    name="title"
                                    value={values?.title}
                                    placeholder="Enter Product Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{width:'300px'}}
                                />
                            </div>
                            <div>
                                <input
                                    className="mb-3 mt-3"
                                    type="number"
                                    name="price"
                                    value={values?.price}
                                    placeholder="Enter Price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{width:'300px'}}
                                />
                            </div>
                            <div>
                                <input
                                    className="mb-3 mt-3"
                                    type="number"
                                    name="quantity"
                                    value={values?.quantity}
                                    placeholder="Enter Quantity"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{width:'300px'}}
                                />
                            </div>
                            <div>
                                <textarea
                                    className="mb-3 mt-3"
                                    name="description"
                                    value={values?.description}
                                    placeholder="Enter Product Description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    style={{width:'300px'}}
                                />
                            </div>
                            {/* <div className="col-lg-6 col-md-6">
                                <label>Main Image</label>
                                <input
                                    className="mb-3"
                                    type="file"
                                    name="mainImage"
                                    accept="image/*"
                                    onChange={handleMainImageChange}
                                />
                                {mainImagePreview && <img src={mainImagePreview} alt="Main Image Preview" width="200" />}
                            </div> */}
                            {/* <div className="col-lg-6 col-md-6">
                                <label>Additional Images (up to 5)</label>
                                <input
                                    className="mb-3"
                                    type="file"
                                    name="remainingImages"
                                    accept="image/*"
                                    multiple
                                    onChange={handleRemainingImagesChange}
                                /> */}
                                {/* Preview remaining images */}
                                {/* <div className="image-previews">
                                    {remainingImagesPreviews.map((preview, index) => (
                                        <img key={index} src={preview} alt={`Remaining Image Preview ${index + 1}`} width="100" />
                                    ))}
                                </div> */}
                            {/* </div> */}

                            <div className="text-center">
                                <button type="submit" className="site-btn mb-3">Update Product</button>
                            </div>
                        </center>
                    </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct