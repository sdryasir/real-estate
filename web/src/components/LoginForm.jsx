import React, {useEffect, useState} from 'react'

import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginUserMutation } from '../redux/api/authApi';
import { useDispatch, useSelector } from 'react-redux';

import { setUserInfo } from '../redux/features/authSlice';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {


    const {isAuthenticated} = useSelector(state=>state.auth)
  
    const [loginUser, {isLoading, error}] = useLoginUserMutation();
    const dispatch = useDispatch();
    const [apiErr, setApiErr] = useState(null);
    
    const navigate = useNavigate();


    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
    }, [isAuthenticated])



    const { handleChange, handleBlur, handleSubmit, handleReset, errors, touched, values } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email').required('Email is required').trim(),
            // password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('password is required').trim(),
            password: Yup.string().required('password is required').trim(),

        }),
        onSubmit: async values => {
            
            await loginUser(values)
            navigate('/')
            
            // handleReset();
        },
    });
    return (
        <>
            <div className="contact-form spad">
                <div className="container">
                {
                    apiErr && <div class='alert alert-danger' role="alert">
                        {apiErr && apiErr.message}
                    </div>
                }
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="contact__form__title">
                                <h2>Login User</h2>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <input className='mb-3' type="text" name='email' value={values.email} placeholder="Enter Your Email" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.email && touched.email ? errors.email : null}</strong>
                            </div>
                            <div className="col-lg-6 col-md-6">

                                <input className='mb-3' type="password" name='password' value={values.password} placeholder="Enter Password" onChange={handleChange} onBlur={handleBlur} />
                                <strong className='text-danger mx-2'>{errors.password && touched.password ? errors.password : null}</strong>
                            </div>
                            <div className="col-lg-12 text-center mt-5">
                                <button type="submit" disabled={isLoading} className="site-btn mb-3">{isLoading ? 'Authenticating..': 'Sign in'}</button> <br />
                                <Link to={'/register'} className='text-primary'>Don't have an Account?</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginForm