import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';

const Product = () => {
    const [product, setProduct] = useState({});
    const [showDetails, setShowDetails] = useState({});
    const [listproducts, setListPorducts] = useState([]);
    const [productId, setProductId] = useState('');
    const [productname, setProductname] = useState('');
    const [details, setDetails] = useState();
    const [edit, setEdit] = useState('')


    // create Product form control

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const createProduct = async (data) => {
        const { name, categoryId, price, offerPrice, status, galleryImage, mainImage } = data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category_id", categoryId);
        formData.append("price", price);
        formData.append("offer_price", offerPrice);
        formData.append("status", status);
        formData.append("main_image", mainImage[0]);
        formData.append("gallery_image", galleryImage[0]);

        // console.log(name, categoryId, price, offerPrice, status, galleryImage, mainImage)

        // api fetching

        await fetch("https://wehatbazar.thecell.tech/api/merchant/product", {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    toast.success("Successfully create a shop");
                    setProduct(data)
                    console.log(data);
                } else {
                    toast.error(data.message)
                    // console.log(data)
                    reset()
                }
            })
            .catch(err => {
                console.log(err)
            })
        // fetch api ending
    }


    // create Product form control and fetching api end


    // Product list details api fetching 

    useEffect(() => {
        fetch("https://wehatbazar.thecell.tech/api/merchant/product", {
            method: "GET",
            headers: {
                'content-type': "application/json",
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data.data)
                setListPorducts(data?.data)
                setDetails(data)
                // setDetails(data?.data)
            })
    }, [product, edit])



    // details

    const showDetailsModel = async (id) => {

        await fetch(`https://wehatbazar.thecell.tech/api/merchant/product/${id}`, {
            method: "GET",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                setShowDetails(data)
            })
    }

    console.log(showDetails?.data)

   



    // console.log(updatedProduct)
    const updateProduct = async () => {

        const formData = new FormData();
        formData.append("product_id", productId)
        formData.append("name", productname)
        await fetch("https://wehatbazar.thecell.tech/api/merchant/product-update", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('token')}`,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: formData
        }).then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    console.log("updated:", data)
                    toast.success("Successfully Updated");
                    setEdit(data)
                } else {
                    toast.error(data.message)
                    reset()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }



    // Edit and update api end






    // console.log(listproducts)
    // Product list api fetching End


    return (
        <div className=''>
            <div className="flex flex-col items-center justify-around bg-white h-24 p-2 drop-shadow-2xl">
                <div className="flex flex-row space-x-3">

                    <h4 className="font-bold text-gray-500 p-1 ">Dashboard</h4>

                </div>
                <p className="text-gray-400 p-1">30th October 2020 | 1st November 2020</p>
            </div>

            {/* Responsive left control */}

            <div className='ml-[90px] pr-5'>

                <div className='container'>

                    {/* grid system*/}

                    <div className=" mt-8 grid lg:grid-cols-3 sm:grid-cols-2 gap-10 ">

                        <div className="card mt-5 w-auto cursor-pointer bg-base-100 shadow-xl">
                            <div className="flex items-center justify-between p-5">
                                <div>
                                    <div className="text-sm text-gray-400 text-left">Adding a product</div>
                                    <div className="flex items-center pt-1">
                                        <div className="text-3xl font-medium text-gray-600 ">Add Product</div>
                                    </div>
                                </div>
                                <div className="text-blue-500">
                                    <svg className='h-10 w-10' viewBox="0 0 20 20" fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="4.8"> <path opacity="0.4" d="M6 12H18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 18V6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M6 12H18" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 18V6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                </div>
                            </div>
                            <label htmlFor="adding-product" className="btn">Add Product</label>
                        </div>



                        <div className="card mt-5 w-auto bg-base-100 shadow-xl">
                            <div className="flex items-center justify-between p-5">
                                <div>
                                    <div className="text-sm text-gray-400 text-left">Edit Product</div>
                                    <div className="flex items-center pt-1">
                                        <div className="text-3xl font-medium text-gray-600 ">Edit Product</div>
                                    </div>
                                </div>
                                <div className="text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                </div>
                            </div>
                            <label htmlFor="product_update_modal" className="btn">Edit</label>
                        </div>

                        <div className="card mt-5 w-auto bg-base-100 shadow-xl">
                            <div className="flex items-center justify-between p-5">
                                <div>
                                    <div className="text-sm text-gray-400 ">Total Products</div>
                                    <div className="flex items-center pt-1">
                                        <div className="text-3xl font-medium text-gray-600 ">{listproducts?.length}</div>
                                    </div>
                                </div>
                                <div className="text-pink-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* Grid End point */}


                    {/* product lists */}

                    {listproducts &&
                        <div className='container grid sm:grid-cols-1 lg:grid-cols-4 gap-5 mt-10 '>


                            {listproducts.map((allList, index) => (
                                <div className="card mt-5 w-auto bg-base-100 shadow-xl">

                                    <div className=" p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
                                        <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">{allList?.name}</h5>
                                        <div className="flex items-baseline justify-between">
                                            <div>
                                                <span className="text-3xl font-semibold">$</span>
                                                <span className="text-5xl font-extrabold tracking-tight">{allList?.offer_price}</span>
                                                <span className="ml-1 text-xl font-normal text-gray-500 ">/PER</span>
                                            </div>
                                            <div>
                                                <span className="text-xl font-semibold line-through text-red-700">$</span>
                                                <span className="text-2xl font-extrabold tracking-tight line-through text-red-700">{allList?.price}</span>
                                                <span className="ml-1 text-xl font-normal   text-red-700">/PER</span>
                                            </div>
                                        </div>
                                        {/* <!-- List --> */}
                                        <ul className="space-y-5 my-7">
                                            <li className="flex items-center space-x-3">
                                                {/* <!-- Icon --> */}
                                                Shop Name:
                                                <span className="text-base pl-4 font-normal leading-tight text-gray-500 dark:text-gray-400">{allList?.shop?.name}</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* <!-- Icon --> */}
                                                Shop Address:
                                                <span className="text-base pl-4 font-normal leading-tight text-gray-500 dark:text-gray-400">{allList?.shop?.address}</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                {/* <!-- Icon --> */}
                                                Product id:
                                                <span className="text-base pl-4 font-normal leading-tight text-gray-500 dark:text-gray-400">{allList?.id}</span>
                                            </li>
                                            <li className="flex items-center space-x-3 line-through decoration-gray-500">
                                                {/* <!-- Icon --> */}
                                                Shop id:
                                                <span className="text-base pl-4 font-normal leading-tight text-gray-500 dark:text-gray-400">{allList?.shop_id}</span>
                                            </li>
                                            <li className="flex items-center space-x-3 decoration-gray-500">
                                                {/* <!-- Icon --> */}
                                                <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> Category Id:
                                                <span className="text-base font-normal leading-tight text-gray-500">{allList?.category_id}</span>
                                            </li>
                                            <li className="flex items-center space-x-3 decoration-gray-500">
                                                {/* <!-- Icon --> */}
                                                Status:
                                                <span className="text-base font-normal leading-tight pl-3 text-gray-500"><div className="badge badge-lg"> <div className="badge badge-lg"> 987,654</div></div></span>
                                            </li>
                                        </ul>
                                        <label htmlFor="details_modal" onClick={() => showDetailsModel(allList?.id)} type="button" className="text-white  bg-black focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">See Details</label>
                                    </div>

                                </div>
                            ))}
                        </div>
                    }


                    {/* product list end */}
                </div>
            </div>


            {/* card */}


            {/*Add product create modal  */}


            <input type="checkbox" id="adding-product" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box lg:w-11/12 sm:w-auto">
                    {/* Form Body start */}
                    <div className="card-body">

                        {/* add product form */}

                        <form onSubmit={handleSubmit(createProduct)} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Product Name</label>

                                <input type='text' placeholder="Product Name" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required=""
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Product name must be required"
                                        }
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.name?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Category Id</label>

                                <input type='text' placeholder="Category Id" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required=""
                                    {...register("categoryId", {
                                        required: {
                                            value: true,
                                            message: "Category Id must be required"
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only give number."
                                        }
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.categoryId?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Price</label>

                                <input type='text' placeholder="Price" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required=""
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message: "Price must be required"
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only give number."
                                        },
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.price?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Offer Price</label>

                                <input type='text' placeholder="Offer Price" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required=""
                                    {...register("offerPrice", {
                                        required: {
                                            value: true,
                                            message: "Offer Price must be required"
                                        },
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: "Only give number."
                                        },
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.offerPrice?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Status</label>

                                <input type='text' placeholder="Status" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required=""
                                    {...register("status", {
                                        required: {
                                            value: true,
                                            message: "Status active must be required"
                                        }
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.status?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="Profile" className="block mb-2 text-sm font-medium text-gray-900 text-left">Main Image</label>

                                <input type='file' className="file-input file-input-bordered rounded-lg file-input-sm w-full " required=""
                                    {...register("mainImage", {
                                        required: {
                                            value: true,
                                            message: "Main picture must be required"
                                        },
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.mainImage?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="banner image" className="block mb-2 text-sm font-medium text-gray-900 text-left">Gallery Image</label>

                                <input type='file' className="file-input file-input-bordered rounded-lg file-input-sm w-full " required=""
                                    {...register("galleryImage", {
                                        required: {
                                            value: true,
                                            message: "Gallery image must be required"
                                        },
                                    })}
                                />
                                <p className='text-left text-xs text-red-500'>{errors.galleryImage?.message}</p>
                            </div>

                            <div className="card-actions justify-center">
                                <button htmlFor="adding-product" type="submit" className="btn w-full btn-primary">Add Product</button>
                                {/* <label htmlFor="adding-product" className="btn">Yay!</label> */}
                            </div>

                        </form>
                    </div>
                    {/* form body end */}
                    <div className="modal-action">
                        <label htmlFor="adding-product" className="btn">Close</label>
                    </div>
                </div>
            </div>
            {/* end model */}



            {/* product Edit and update modal start */}

            {/* The button to open modal */}
            {/* <label htmlFor="product_update_modal" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="product_update_modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-1/2 max-w-auto">
                    {/* <form onSubmit={handleSubmit(handleCreateCategory)} className="space-y-4 md:space-y-6"> */}
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Product Id:</label>
                        <input type="text" onChange={(e) => setProductId(e.target.value)} className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" placeholder="123456789" />
                        {/* <p className='text-left text-xs text-red-500'>{errors.shopId?.message}</p> */}
                    </div>
                    <div>
                        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Product Name</label>

                        <input type='text' onChange={(e) => setProductname(e.target.value)} placeholder="category name" className="bg-gray-50 border border-gray-300 text-[#0A0A0A] text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5" required="" />
                        {/* <p className='text-left text-xs text-red-500'>{errors.categoryName?.message}</p> */}
                    </div>

                    <div className="card-actions mt-4 justify-center">
                        <button onClick={updateProduct} type='submit' className="btn w-full btn-primary">Updated Product</button>
                    </div>

                    {/* </form> */}
                    <div className="modal-action">
                        <label htmlFor="product_update_modal" className="btn">close</label>
                    </div>
                </div>
            </div>


            {/* product Edit and update modal start */}

            {/* show details modal */}

            {/* The button to open modal */}
            {/* <label htmlFor="details_modal" className="btn">open modal</label> */}

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="details_modal" className="modal-toggle" />
            <label htmlFor="details_modal" className="modal cursor-pointer">

                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ">
                    <img className="object-cover w-full rounded-t-lg lg:h-1/2 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={showDetails?.data?.gallery[0]?.original_url} alt="" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight">{showDetails?.data?.name}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><span className='text-bold text-black'>Price:</span>{showDetails?.data?.price}.</p>
                        </div>
                </div>


            </label>



            <Toaster />
        </div>
    );
};

export default Product;




