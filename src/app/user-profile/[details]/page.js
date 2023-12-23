"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import imagePlaceholder from "../../../assets/images/propic.png";
import { userProfileShare } from "@/services/user";

export default function userProfile() {
    const {
        pageLevelLoader,
        setPageLevelLoader,
        orderDetails,
        setOrderDetails,
        user,
    } = useContext(GlobalContext);



    const params = useParams();
    const router = useRouter();

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

    // async function extractOrderDetails() {
    //     setPageLevelLoader(true);

    //     const res = await userProfileShare(params["details"]);

    //     if (res.success) {
    //         setPageLevelLoader(false);
    //         setOrderDetails(res.data);
    //     } else {
    //         setPageLevelLoader(false);
    //     }

    //     console.log(res);
    // }

    // useEffect(() => {
    //     extractOrderDetails();
    // }, []);

    return (
        // <div className="w-full min-h-screen flex justify-center items-center">
        //   <h1 className="text-orange-900">Hello KK</h1>
        //   <h1>{params["details"]}</h1>
        // </div>
        <div class="h-full bg-gray-200 p-8">
            {/* <div class="w-full lg:w-4/12 px-4 mx-auto"> */}
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
                    {/* <div class="flex flex-col items-center -mt-20">

                    <div class="relative">
                        <img src={user?.imageURL ? user?.imageURL : imagePlaceholder} class="w-40 h-40 border-4 border-orange-600 rounded-full bg-hero bg-cover bg-no-repeat" />
                        <input
                            accept="image/*"
                            max="1000000"
                            type="file"
                            name="file-image"
                            id="file-image"
                            className="hidden"
                            // onChange={handleImage}
                            style={{ display: "none" }}
                        />
                        <label htmlFor="file-image" className="bottom-0 right-5 absolute w-12 h-12 border-4 border-red-500 bg-red-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="fa fa-camera "></i>
                        </label>
                    </div>

                    <div class="flex items-center space-x-2 mt-2">
                        <p class="text-2xl text-black font-bold">{user?.name}</p>
                        <span class="bg-blue-500 rounded-full p-1" title="Verified">
                            <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </span>
                    </div>

                </div> */}
                </div>
                <section class="relative py-16 bg-blueGray-200">
                    {/* <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                        <h1>fgfg</h1>
                        <div class="relative">
                            <img src={user?.imageURL ? user?.imageURL : imagePlaceholder} class="w-40 h-40 border-4 border-orange-600 rounded-full bg-hero bg-cover bg-no-repeat" />
                            <input
                                accept="image/*"
                                max="1000000"
                                type="file"
                                name="file-image"
                                id="file-image"
                                className="hidden"
                                // onChange={handleImage}
                                style={{ display: "none" }}
                            />
                            <label htmlFor="file-image" className="bottom-0 right-5 absolute w-12 h-12 border-4 border-red-500 bg-red-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                                <i className="fa fa-camera "></i>
                            </label>
                        </div>
                    </div> */}
                    <div class="container mx-auto px-4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                            <div class="px-6">
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div class="relative">
                                            {/* <img src={user?.imageURL ? user?.imageURL : imagePlaceholder} class="w-40 h-40 border-4 border-orange-600 rounded-full bg-hero bg-cover bg-no-repeat" /> */}
                                            <img alt="..." src={userData?.imageURL ? userData?.imageURL : imagePlaceholder}
                                                class="shadow-xl rounded-full w-40 h-40 align-middle border-4 border-orange-600 -mt-12" />
                                        </div>
                                    </div>
                                    <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                                        <div class="py-6 px-3 sm:mt-0 flex justify-center">
                                            <button class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                                Connect
                                            </button>

                                        </div>

                                    </div>
                                    <div class="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div class="flex justify-center  lg:pt-4  ">
                                            <div class="mr-4 p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{userData.memberCount}</span><span class="text-sm text-blueGray-400">Connections</span>
                                            </div>
                                            <div class="mr-4 p-3 text-center">
                                                <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{userData.productCount}</span><span class="text-sm text-blueGray-400">Products</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <h3 class="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                        {userData.name}
                                    </h3>
                                    <div class="text-sm mt-0 mb-2 text-blueGray-400   py-2">
                                        <p>RefID: {params["details"]}</p>
                                    </div>
                                    <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        {/* <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i> */}
                                        <p>Roll: {userData.role}</p>
                                    </div>
                                    <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        {/* <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i> */}
                                        Class: {userData.class_name}
                                    </div>
                                    {/* <div class="mb-2 text-blueGray-600 mt-10">
                                        <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
                                    </div>
                                    <div class="mb-2 text-blueGray-600">
                                        <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
                                    </div> */}
                                </div>
                                <div className="border-t ">
                                    <div class="mt-6 mb-6 lg:pb-0 sm:w-2/5 lg:w-1/5 mx-auto flex flex-wrap items-center justify-between">
                                        <a href={userData?.facebookURL} target="_blank" rel="noopener noreferrer" className=" socialIcon">
                                            <i className='fab fa-facebook socialIconFont fa-lg'></i>
                                        </a>
                                        <a href={userData?.youtubeURL} target="_blank" rel="noopener noreferrer" className="  socialIcon">
                                            <i className='fab fa-youtube socialIconFont fa-lg'></i>
                                        </a>
                                        <a href={`https://wa.me/${userData?.whatsapp}`} target="_blank" rel="noopener noreferrer" className="socialIcon">
                                            <i className='fab fa-whatsapp socialIconFont fa-lg'></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="mt-1 py-10 border-t border-blueGray-200 text-center">
                                    <div class="flex flex-wrap justify-center">
                                        <div class="w-full lg:w-9/12 px-4">
                                            <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                {userData?.aboutMe}
                                            </p>
                                            {/* <a href="#pablo" class="font-normal text-pink-500">Show more</a> */}
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
                                    {/* <button
                                        class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                                        Full Information</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* </div> */}
        </div>
        // <section class="pt-16 bg-blueGray-50">
        //     <div class="w-full lg:w-4/12 px-4 mx-auto">
        //     <section class="relative block h-500-px mt-32">
        //         <div class="absolute top-0 w-full h-full bg-center bg-cover mt-20" 
        //         style={{
        //             backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`
        //           }}
        //         >
        //         <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
        //         </div>
        //         <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"  style={{ transform: 'translateZ(0px)' }}>
        //             <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
        //                 <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
        //             </svg>
        //         </div>
        //     </section>
        //     <section class="relative py-16 bg-blueGray-200">
        //         <div class="container mx-auto px-4">
        //             <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
        //                 <div class="px-6">
        //                     <div class="flex flex-wrap justify-center">
        //                         <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
        //                             <div class="relative">
        //                                 <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"/>
        //                             </div>
        //                         </div>
        //                         <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
        //                             <div class="py-6 px-3 mt-32 sm:mt-0">
        //                                 <button class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
        //                                     Connect
        //                                 </button>
        //                             </div>
        //                         </div>
        //                         <div class="w-full lg:w-4/12 px-4 lg:order-1">
        //                             <div class="flex justify-center py-4 lg:pt-4 pt-8">
        //                                 <div class="mr-4 p-3 text-center">
        //                                     <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span class="text-sm text-blueGray-400">Friends</span>
        //                                 </div>
        //                                 <div class="mr-4 p-3 text-center">
        //                                     <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span class="text-sm text-blueGray-400">Photos</span>
        //                                 </div>
        //                                 <div class="lg:mr-4 p-3 text-center">
        //                                     <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span class="text-sm text-blueGray-400">Comments</span>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div class="text-center mt-12">
        //                         <h3 class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
        //                             Jenna Stones
        //                         </h3>
        //                         <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
        //                             <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
        //                             Los Angeles, California
        //                         </div>
        //                         <div class="mb-2 text-blueGray-600 mt-10">
        //                             <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution Manager - Creative Tim Officer
        //                         </div>
        //                         <div class="mb-2 text-blueGray-600">
        //                             <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of Computer Science
        //                         </div>
        //                     </div>
        //                     <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        //                         <div class="flex flex-wrap justify-center">
        //                             <div class="w-full lg:w-9/12 px-4">
        //                                 <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
        //                                     An artist of considerable range, Jenna the name taken by
        //                                     Melbourne-raised, Brooklyn-based Nick Murphy writes,
        //                                     performs and records all of his own music, giving it a
        //                                     warm, intimate feel with a solid groove structure. An
        //                                     artist of considerable range.
        //                                 </p>
        //                                 <a href="#pablo" class="font-normal text-pink-500">Show more</a>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <footer class="relative bg-blueGray-200 pt-8 pb-6 mt-8">
        //             <div class="container mx-auto px-4">
        //                 <div class="flex flex-wrap items-center md:justify-between justify-center">
        //                     <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        //                         <div class="text-sm text-blueGray-500 font-semibold py-1">
        //                             Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </footer>
        //     </section>
        // </div>
        // </section>
    );

}