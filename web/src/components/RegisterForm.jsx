import { Link, useNavigate   } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useRegisterUserMutation } from '../redux/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../redux/features/authSlice';

const RegisterForm = () => {


    const navigate = useNavigate();
    const [registerUser, { isLoading, error, data }] = useRegisterUserMutation()
    const {isAuthenticated} = useSelector(state=>state.auth)
    const [apiMessage, setApiMessage] = useState(null)
    
    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
    }, [isAuthenticated])

    const dispatch = useDispatch()

    const { handleChange, handleBlur, handleSubmit, handleReset, errors, touched, values, setFieldValue} = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            cPassword: '',
            phonenumber: '',
            avatar: ''
        },
        validationSchema: Yup.object({
            firstname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid first name').min(3, 'Minimum 3 letters').max(25, 'Maximum 25 letters').required('First Name is required').trim(),
            lastname: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid last name').min(3, 'Minimum 3 letters').max(25, 'Maximum 25 letters').required('Last Name is required').trim(),
            username: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid User name').min(3, 'Minimum 3 letters').max(25, 'Maximum 25 letters').required('User Name is required').trim(),
            email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email').required('Email is required').trim(),
            password: Yup.string().required('password is required').trim(),
            cPassword: Yup.string().required('Confirm password is required').trim(),
            // password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('password is required').trim(),
            // cPassword: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('Confirm password is required').trim(),
            phonenumber: Yup.string().matches(/^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/, 'Phone number not match 03xx xxxxxxx').required('Phone number is required').trim(),

        }),
        onSubmit: async values => {
            delete values.cPassword;
            const user = await registerUser(values).unwrap()
            if(user){
                setApiMessage(user)
            }else{
                setApiMessage({
                    success:false,
                    message:'Something went wrong'
                }) 
            }
            
            // handleReset()

        },
    });

    const [preview,setPreview]=useState(undefined)

    const handleImgChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setFieldValue('avatar', reader.result);
            setPreview(reader.result)
            document.getElementById('preview-reset').reset()
          }
        } 
        reader.readAsDataURL(e.target.files[0]);
    }
    

    return (
        <>
            <div className="contact-form spad">
                <div className="container">
                {
                    apiMessage && <div class={`alert alert-${apiMessage && apiMessage.success ? 'success':'danger'}`} role="alert">
                        {apiMessage && apiMessage.message}
                    </div>
                }
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact__form__title">
                                <h2>Register New User</h2>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">

                                <input className='mb-3' type="text" name='firstname' value={values.firstname} placeholder="Enter First name" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.firstname && touched.firstname ? errors.firstname : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-6">

                                <input className='mb-3' type="text" name='lastname' value={values.lastname} placeholder="Enter Last name" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger  mx-2'>{errors.lastname && touched.lastname ? errors.lastname : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-6">

                                <input className='mb-3 mt-3' type="text" name='username' value={values.username} placeholder="Enter User name" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.username && touched.username ? errors.username : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <input className='mb-3 mt-3' type="text" name='email' value={values.email} placeholder="Enter Your Email" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.email && touched.email ? errors.email : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-6">

                                <input className='mb-3 mt-3' type="password" name='password' value={values.password} placeholder="Enter Password" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.password && touched.password ? errors.password : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-6">

                                <input className='mb-3 mt-3' type="password" name='cPassword' value={values.cPassword} placeholder="Enter Confirm Password" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.cPassword && touched.cPassword ? errors.cPassword : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-6">

                                <input className='mb-3 mt-3' type="text" name='phonenumber' value={values.phonenumber} placeholder="Enter Your Phone Number" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.phonenumber && touched.phonenumber ? errors.phonenumber : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-3">
                               <input className='mb-3 mt-3 pt-2' type="file" name='avatar' onChange={(e)=>handleImgChange(e)}/>
                            </div>
                            <div className='col-md-12 text-center mb-4'>
                                <img src={preview ? preview : `https://www.w3schools.com/howto/img_avatar.png`} className='mt-3' width={100} alt="" value={values.avatar} />
                            </div>
                            <div className="col-lg-12 text-center">
                                <button type="submit" className="site-btn mb-3">Sign up</button> <br />
                                <Link to={'/login'} className='text-primary'>Already have an Account?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RegisterForm