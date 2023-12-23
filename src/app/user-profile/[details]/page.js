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

    async function goToPackgeBuy(){
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
                                            class="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" 
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
                                    <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        
                                        <p>Roll: {userData.role}</p>
                                    </div>
                                    <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        
                                        Class: {userData.class_name}
                                    </div>

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
                </section>
            </div>
        </div>
    );

}