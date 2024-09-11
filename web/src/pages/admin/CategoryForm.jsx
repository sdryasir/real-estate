import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateCategoryMutation } from "../../redux/api/categoryApi";

const CategoryForm = () => {
  const [createCategory, { data, isLoading, error }] = useCreateCategoryMutation();

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
      image: {
        public_id: "",
        url: "",
      },
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must have at least 3 characters")
        .max(50, "Title must be less than 50 characters")
        .required("Category title is required"),
      image: Yup.object({
        public_id: Yup.string().required("Public ID is required"),
        url: Yup.string().required("Image URL is required"),
      }),
    }),
    onSubmit: async (values) => {
      await createCategory(values).unwrap();
      alert('Category Added in DB');
    },
  });

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFieldValue("image.url", reader.result); 
      }
    };
    reader.readAsDataURL(file);
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
                <input
                  className="mb-3"
                  type="text"
                  name="title"
                  value={values.title}
                  placeholder="Enter Category Name..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <strong className="text-danger mx-2">
                  {errors.title && touched.title ? errors.title : null}
                </strong>
              </div>

              <div className="col-lg-6 col-md-6">
                <input
                  className="mb-3 pt-2"
                  type="text"
                  name="image.public_id"
                  value={values.image.public_id}
                  placeholder="Enter Image Public ID..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <strong className="text-danger mx-2">
                  {errors.image?.public_id && touched.image?.public_id ? errors.image.public_id : null}
                </strong>
              </div>

              <div className="col-lg-6 col-md-6">
                <input
                  className="mb-3 pt-2"
                  type="file"
                  name="image.url"
                  onChange={(e) => handleImgChange(e)}
                />
                <strong className="text-danger mx-2">
                  {errors.image?.url && touched.image?.url ? errors.image.url : null}
                </strong>
              </div>

              <div className="col-lg-12 text-center mt-5">
                <button type="submit" className="site-btn mb-3">
                  Add Category
                </button> <br />
                <Link to={'/admin/dashboard'} className="text-primary">Back to Dashboard</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
