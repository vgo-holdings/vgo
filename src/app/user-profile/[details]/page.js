"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import imagePlaceholder from "../../../assets/images/propic.png";
import { userProfileShare } from "@/services/user";
import { productBySellerId } from "@/services/product";

export default function userProfile() {
    const {
        pageLevelLoader,
        setPageLevelLoader,
        orderDetails,
        setOrderDetails,
        user,
    } = useContext(GlobalContext);
    const [userProduct, setProductData] = useState([]);


    const params = useParams();
    const router = useRouter();

    async function goToPackgeBuy() {
        router.push(`/register/member-register?status=${params["details"]}`)
    }

    const [userData, setUserData] = useState([]);
    // const userDetails = await userProfileShare(params.details);
    // console.log("🚀 ~ file: page.js:24 ~ userProfile ~ userDetails:", "userDetails")

    async function handle_UserConnection() {
        // console.log(user?._id, "user?._id");
        const testVal = await userProfileShare(params["details"]);
        console.log("🚀 ~ file: page.js:31 ~ handle_UserConnection ~ testVal:", testVal.finalData?.user)
        return testVal.finalData.user
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await handle_UserConnection();
            setUserData(data);
        };

        fetchData();
    }, []);

    const [copySuccess, setCopySuccess] = useState(false);
    function handleCopyUserId() {
        const userId = params["details"];
        if (userId) {
            const textArea = document.createElement("textarea");
            textArea.value = userId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopySuccess(true);

            // Reset the success message after a short delay
            setTimeout(() => {
                setCopySuccess(false);
            }, 2000);
        }
    }

    useEffect(() => {

        const fetchProductData = async () => {
            const testVal = await userProfileShare(params["details"]);
            const getAllProducts = await productBySellerId(testVal.finalData.user._id);
            console.log("🚀 ~ file: page.js:73 ~ fetchProductData ~ userData:", userData)
            console.log("🚀 ~ file: page.js:586 ~ fetchProductData ~ getAllProducts:", getAllProducts.data)
            setProductData(getAllProducts.data);
            console.log("🚀 ~ userProduct", userProduct);
        };

        fetchProductData();
    }, []);
    return (

        <div class="h-full bg-gray-200 p-8">
            <div>
                <div class="bg-white rounded-lg shadow-xl pb-8 mt-1">
                    <section class="relative block h-500-px mt-5">
                        <div class="absolute top-0 w-full h-[250px]">
                            <img src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg" class="w-full h-full rounded-tl-lg rounded-tr-lg " />
                        </div>
                        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }}>
                            <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                                <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                            </svg>
                        </div>
                    </section>
                </div>
                <section class="relative py-16 bg-blueGray-200">
                    <div class="container mx-auto px-4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                            <div class="px-6">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div class="relative">
                                            <img alt="..." src={userData?.imageURL ? userData?.imageURL : imagePlaceholder}
                                                class="shadow-xl rounded-full w-40 h-40 align-middle border-4 border-orange-600 -mt-12 bg-hero bg-cover bg-no-repeat" />
                                        </div>
                                    </div>
                                    <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                                        <div class="py-6 px-3 sm:mt-0 flex justify-center">
                                            <button
                                                class="bg-myOrange active:bg-myOrange uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={goToPackgeBuy}
                                            >
                                                Connect
                                            </button>

                                        </div>

                                    </div>
                                    <div class="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div class="flex justify-center  lg:pt-4  ">
                                            <div class="mr-4 p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-black ">{userData.memberCount}</span><span class="text-sm text-black">Connections</span>
                                            </div>
                                            <div class="mr-4 p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-black">{userData.productCount}</span><span class="text-sm text-black">Products</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <h3 class="text-2xl font-semibold leading-normal mb-2 text-black mb-2">
                                        {userData.name}
                                    </h3>
                                    <div class="text-sm mt-0 mb-2 text-black   py-2">
                                        RefID: <span onClick={handleCopyUserId} style={{ cursor: "pointer" }}>
                                            {params["details"]}{" "}
                                            <i
                                                style={{ marginLeft: "10px" }}
                                                className="fa fa-file text-italic text-lg"
                                            ></i>
                                        </span>
                                        {copySuccess && (
                                            <span className="text-white-600 ml-2">
                                                (Copied to clipboard)
                                            </span>
                                        )}
                                    </div>
                                    <div class="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">

                                        <p>Roll: {userData.role}</p>
                                    </div>
                                    <div class="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">

                                        Class: {userData.class_name}
                                    </div>

                                </div>
                                <div className="border-t ">
                                    <div class="mt-6 mb-6 lg:pb-0 sm:w-2/5 lg:w-1/5 mx-auto flex flex-wrap items-center justify-between">
                                        <a href={userData?.facebookURL} target="_blank" rel="noopener noreferrer" className=" socialIcon">
                                            <i className='fab fa-facebook socialIconFont fa-lg text-blue-500'></i>
                                        </a>
                                        <a href={userData?.youtubeURL} target="_blank" rel="noopener noreferrer" className="  socialIcon">
                                            <i className='fab fa-youtube socialIconFont fa-lg text-red-500'></i>
                                        </a>
                                        <a href={`https://wa.me/${userData?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="socialIcon">
                                            <i className='fab fa-whatsapp socialIconFont fa-lg text-green-500'></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="mt-1 py-10 border-t border-blueGray-200 text-center">
                                    <div class="flex flex-wrap justify-center">
                                        <div class="w-full lg:w-9/12 px-4">
                                            <p class="mb-4 text-lg leading-relaxed text-black">
                                                {userData?.aboutMe}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div class="bg-white p-3 shadow-sm rounded-sm border-t">
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 justify-center mb-2">
                                        <span class="tracking-wide text-2xl"></span>
                                    </div>
                                    <div class="text-gray-700">
                                        <div class="grid md:grid-cols-2 text-sm">
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">First Name</div>
                                                <div class="px-4 py-2">{userData.first_name}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Last Name</div>
                                                <div class="px-4 py-2">{userData.last_name}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Contact No.</div>
                                                <div class="px-4 py-2">{userData.phone}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">District</div>
                                                <div class="px-4 py-2">{userData.district}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">City</div>
                                                <div class="px-4 py-2">{userData.city}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Email.</div>
                                                <div class="px-4 py-2">
                                                    <a class="text-blue-800" href="mailto:jane@example.com">{userData.email}</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-lg shadow-xl p-8 ">

                        <div class="flex items-center justify-between">
                            <h4 class="text-xl text-gray-900 font-bold">My Products ({userProduct?.length})</h4>
                            <a href={`/product/listing/${userData?._id}`} title="View All">

                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                                </svg>
                                {/* See More */}
                            </a>
                        </div>
                        <section class="flex items-center ">
                            <div class="pt-5">
                                <div class="grid grid-cols-1 gap-4 lg:gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-5">
                                    {userProduct && userProduct.length
                                        ? userProduct.map((item) => (
                                            <div class="relative overflow-hidden bg-white rounded-xl dark:bg-gray-700 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 cursor-pointer"
                                                onClick={() =>
                                                    router.push(`/product/${item._id}`)
                                                }
                                                key={item._id}
                                            >
                                                <div class="relative overflow-hidden p-5">
                                                    <div class="mb-5 overflow-hidden ">
                                                        <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src={item.imageUrl} alt="" />
                                                    </div>
                                                    {item.onSale === "yes" ? (
                                                        <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
                                                            <p className="rounded-full text-sm uppercase tracking-wide text-white sm:py-1 sm:px-3">
                                                                {item.priceDrop}% Off
                                                            </p>
                                                        </button>
                                                    ) : null}
                                                </div>
                                                <a>
                                                    <h3 class="px-5 mb-1 text-lg font-bold dark:text-white h-10"> {item.name} </h3>
                                                </a>
                                                <div class="px-5 p-2">
                                                    <p class="mt-1 text-sm text-slate-400">{item.location ? item.location : "Colombo"}</p>
                                                    <div class="flex gap-1 text-orange-400 mt-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-star-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-star-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-star-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-star-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            class="bi bi-star" viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div class="flex">
                                                    <div class="w-1/2 px-5 pb-3">
                                                        <p class="text-md font-bold text-orange-500 dark:text-orange-300">
                                                            {item.price -
                                                                (item.price * item.priceDrop) /
                                                                100}
                                                        </p>
                                                        <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">{`LKR ${item.price}`}</span>
                                                    </div>
                                                    <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
                                                        Add To Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                        : <p>No matching products found</p>
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </section>

            </div>
        </div>
    );

}