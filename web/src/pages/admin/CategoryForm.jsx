import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateCategoryMutation } from "../../redux/api/categoryApi";
import { useDispatch } from "react-redux";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApi";

const CategoryForm = () => {

  const [createCategory,{data,isLoading,error}] = useCreateCategoryMutation()
  
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      avatar: "",
    },
    validationSchema: Yup.object({
        title: Yup.string()
        .max(50, "Maximum 50 letters")
        .required("Category Name is required")
        .trim(),
        avatar: Yup.string()
      
    }),
    onSubmit: async (values) => {
      await createCategory(values).unwrap()
      // console.log(categoryCreated.title,categoryCreated.avatar);
      alert('Category Added in DB')
    },
  });

  const handleImgChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFieldValue("avatar", reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div className="contact-form spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact__form__title">
                <h2>Add New Category</h2>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <input className='mb-3' type="text" name='title' value={values.title} placeholder="Enter Category Name..." onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.title && touched.title ? errors.title : null}</strong>
                            </div>

                            <div className="col-lg-6 col-md-6">
                               <input className='mb-3 pt-2' type="file" name='avatar' onChange={(e)=>handleImgChange(e)}/>
                            </div>
                           
                            <div className="col-lg-12 text-center mt-5">
                                <button type="submit" className="site-btn mb-3">Add Category</button> <br />
                                <Link to={'/admin/dashboard'} className='text-primary'>Back to Dashboard</Link>
                               
                            </div>
                        </div>
                    </form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
