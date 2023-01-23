import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';


const AddCategory = () => {
    const [lists, setLists] = useState({});
    const [depend, setDepend] = useState({});
    // const [category, setCategory] = useState();
    // const [details, setDetails] = useState([]);
    // Create category 
    const { register, handleSubmit, formState: { errors }, } = useForm();

    // handle create category button
    const handleCreateCategory = async data => {
        const category = {
            shop_id: data.shopId,
            name: data.categoryName
        }
        // console.log(category);
        // fetching data

        await fetch("https://wehatbazar.thecell.tech/api/merchant/category", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                "authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(category)
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.success === true) {
                    toast.success("Successfully create category")
                    console.log(data)
                    setDepend(data);
                } else {
                    toast.error(data.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    // category List
    useEffect(() => {
        fetch("https://wehatbazar.thecell.tech/api/merchant/category", {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data.data)
                setLists(data)
                // setDetails(data?.data)
            })
    }, [depend])

    // console.log(details)

    // const id = details?.map((id) => {
    //     return id?.id
    // })
    // console.log(id)

    const allLists = lists?.data;


    return (
        <div className='ml-[90px] pr-5'>
            <div className="container">
                <div className='grid lg:grid-cols-2 w-full sm:grid-cols-3 gap-5'>
                    {/* Add Categories */}

                    <div className="card lg:w-full sm:w-96 bg-base-100 shadow-2xl">
                        <div className="card-body">
                            <h2 className="text-center">Add Category</h2>

                            {/* add categories form */}

                            <form onSubmit={handleSubmit(handleCreateCategory)} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Shop In No:</label>
                                    <input type="text" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" placeholder="123456789"
                                        {...register("shopId", {
                                            required: {
                                                value: true,
                                                message: "shop id is a number"
                                            },
                                            pattern: {
                                                value: /^[0-9]*$/,
                                                message: "Only give number."
                                            },
                                        })}
                                    />
                                    <p className='text-left text-xs text-red-500'>{errors.shopId?.message}</p>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-left">Shop Name</label>

                                    <input type='text' placeholder="category name" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required=""
                                        {...register("categoryName", {
                                            required: {
                                                value: true,
                                                message: "Category name must be required"
                                            },
                                            minLength: {
                                                value: 4,
                                                message: "Must be exceed 4 characters"
                                            }
                                        })}
                                    />
                                    <p className='text-left text-xs text-red-500'>{errors.categoryName?.message}</p>
                                </div>

                                <div className="card-actions justify-center">
                                    <button type='submit' className="btn w-full btn-primary">Create Category</button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* categories details */}


                </div>


                {/* {allLists.length} */}

                <div>

                    {allLists &&
                        <div className=' grid sm:grid-cols-1 lg:grid-cols-4 gap-5 mt-10 '>


                            {allLists.map((allList, index) => (
                                <div className="card mt-5 w-auto bg-base-100 shadow-xl">

                                    <div key={index} className="card-body">
                                        <div className="flex justify-between items-center">
                                            <span className='font-semibold text-2xl sm:text-xl'>{allList.shop.name}</span>
                                            <span className='text-sm'>shop id: {allList.shop_id}</span>
                                        </div>
                                        <p className='text-left text-sm'>Address: {allList.shop.address}</p>

                                        <span className='text-left pl-5'>Category Name: {allList.name}</span>
                                        <span className='text-left pl-5'>Category Id: {allList.id}</span>
                                        <span className='text-left pl-5'>Status:  <span className="badge badge-sm p-2">{allList.status}</span></span>
                                    </div>

                                </div>
                            ))}
                        </div>
                    }
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default AddCategory;