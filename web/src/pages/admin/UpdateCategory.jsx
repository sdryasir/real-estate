import React from 'react'
import { useFormik } from 'formik';
import { useUpdateCategoryMutation } from '../../redux/api/categoryApi';
import { useState } from 'react';

const UpdateCategory = ({ category }) => {

    const [updateMutation] = useUpdateCategoryMutation()

    const { handleChange, handleBlur, handleSubmit, handleReset, values } = useFormik({
        initialValues: category,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                await updateMutation(values)
                location.reload();
                handleReset();
            } catch (error) {
                console.error(error);
            }
        },
    });


    // const [preview,setPreview]=useState(undefined)

    // const handleImgChange = (e) => {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setFieldValue('avatar', reader.result);
    //       setPreview(reader.result)
    //     }
    //   } 
    //   reader.readAsDataURL(e.target.files[0]);
    // }
  

    return (
        <>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body mt-3">
                            <form onSubmit={handleSubmit}>
                                <center>
                                    <div>
                                        <input className='mb-3' type="text" name='title' value={values?.title} placeholder="Enter Category Name..." onChange={handleChange} onBlur={handleBlur} style={{ width: '250px' }} />
                                    </div>

                                    {/* <div className="col-lg-6 col-md-6">
                                        <input className='mb-3 pt-2' type="file" name='avatar' onChange={(e) => handleImgChange(e)} />
                                    </div> */}

                                    {/* <div className='col-md-6'>
                                        <img src={preview ? preview : `https://img.freepik.com/premium-vector/fresh-colorful-mix-citrus-fruits-with-lemons-grapefruits-limes-as-still-life_985204-61111.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716681600&semt=ais_user`} className='mt-3' width={150} alt="" value={values?.avatar} />
                                    </div> */}

                                    <div className="col-lg-12 text-center mt-5">
                                        <button type="submit" className="site-btn mb-3">Update Category</button>
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

export default UpdateCategory