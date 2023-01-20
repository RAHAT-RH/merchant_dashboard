import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import TokenAuth from '../../Authentication/TokenAuth/TokenAuth';

const Login = () => {
    // handle form validation and error handling
    const { setToken } = TokenAuth();

    const { register, handleSubmit, formState: { errors }, } = useForm({ mode: 'onTouched' });

    // Submit login button

    const handleLogin = async data => {
        const user = {
            phone: data.phone,
            password: data.password
        }
        // fetching data post
        fetch("https://wehatbazar.thecell.tech/api/merchant-login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "Success") {
                    toast.success("Login Successfully")
                } else {
                    toast.error(data.message)
                }
                setToken(data.data.access_token)
                console.log(data)
            })
    }
    // handle show password icon
    const [toggle1, setToggle1] = useState(false);
    return (
        <div className='relative top-0 z-40 bg-white h-screen'>
            <section className=" container ">
                <div className="flex items-center  justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-black dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Login
                            </h1>
                            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Your Phone Number</label>
                                    <input type="text" className="bg-[#171717] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="01600012547"
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: "Number is Required"
                                            },
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Only give number."
                                            },
                                            minLength: {
                                                value: 11,
                                                message: "must be exceed 11 characters"
                                            }
                                        })}
                                    />
                                    {/* error handling message */}
                                    <p className='text-xs text-red-500 text-left'>{errors.phone?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-white">Password</label>

                                    {/* icon show password */}

                                    {(toggle1 === false) ? <RiEyeOffLine className='text-white cursor-pointer absolute mt-3 ml-[350px]' onClick={() => setToggle1(!toggle1)}></RiEyeOffLine> : <RiEyeLine className='text-red-500 cursor-pointer absolute mt-3 ml-[350px]' onClick={() => setToggle1(!toggle1)}></RiEyeLine>}


                                    {/* icon show password end*/}

                                    <input type={toggle1 ? "text" : "password"} placeholder="••••••••" className="bg-[#171717] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: "Password is Required"
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                                message: "Minimum six characters, at least one letter and one number"
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Must be exceed 6 characters"
                                            }
                                        })}
                                    />
                                    {/* error handling message for password */}
                                    <p className='text-xs text-red-500 text-left'>{errors.password?.message}</p>
                                </div>

                                <button type="submit" className="w-full text-black bg-white hover:bg-[#171717] transition hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Log In</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    create an account  <Link to='/signup' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster />
        </div>
    );
};

export default Login;