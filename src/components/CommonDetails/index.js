"use client";

import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import Notification from "../Notification";
import './style.css';
import { useRouter } from "next/navigation";

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();

  const imageArray = [
    item.imageUrl,
    item.imageUrl2? item.imageUrl2 : "",
    item.imageUrl3? item.imageUrl3 : "",
    item.imageUrl4? item.imageUrl4 : "",
    item.imageUrl5? item.imageUrl5 : "",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const updateMainImage = () => {
    return imageArray[currentIndex];
  };

  const handlePrevClick = (event) => {
    event.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageArray.length) % imageArray.length);
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  async function handleAddToCart(getItem) {

    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem?._id, userID: user._id });

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return (
    <section class="py-10 font-poppins dark:bg-gray-800">
      <div class="max-w-6xl px-4 mx-auto lg:h-screen">
        <div class="flex flex-wrap mb-24 -mx-4">
          <div class="w-full px-4 mb-8 md:w-1/2 md:mb-0">
            <div class="sticky top-0 overflow-hidden ">
              <div class="relative mb-6 lg:mb-10 lg:h-96">
                <a class="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#" onClick={handlePrevClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-5 h-5 text-orange-500 bi bi-chevron-left dark:text-orange-200" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z">
                    </path>
                  </svg>
                </a>
                <img className="object-contain w-full lg:h-full" src={updateMainImage()} alt="" />
                {/* <img class="object-contain w-full lg:h-full" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="" /> */}
                <a class="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#" onClick={handleNextClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-5 h-5 text-orange-500 bi bi-chevron-right dark:text-orange-200" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                    </path>
                  </svg>
                </a>
              </div>
              <div class="flex-wrap hidden -mx-2 md:flex">
                <div class="w-1/2 p-2 sm:w-1/4">
                  <a class="block border border-gray-200 hover:border-orange-400 dark:border-gray-700 dark:hover:border-orange-300" href="#">
                    <img class="object-contain w-full lg:h-28" src={item.imageUrl2} alt="" />
                  </a>
                </div>
                <div class="w-1/2 p-2 sm:w-1/4">
                  <a class="block border border-gray-200 hover:border-orange-400 dark:border-gray-700 dark:hover:border-orange-300" href="#">
                    <img class="object-contain w-full lg:h-28" src={item.imageUrl3} alt="" />
                  </a>
                </div>
                <div class="w-1/2 p-2 sm:w-1/4">
                  <a class="block border border-gray-200 hover:border-orange-400 dark:border-gray-700 dark:hover:border-orange-300" href="#">
                    <img class="object-contain w-full lg:h-28" src={item.imageUrl4} alt="" />
                  </a>
                </div>
                <div class="w-1/2 p-2 sm:w-1/4">
                  <a class="block border border-gray-200 hover:border-orange-400 dark:border-gray-700 dark:hover:border-orange-300" href="#">
                    <img class="object-contain w-full lg:h-28" src={item.imageUrl5} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full px-4 md:w-1/2">
            <div class="lg:pl-20">
              <div class="mb-6 ">

                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      router.push(`https://www.vigour.space/user-profile/${item?.user}`)
                    }
                    class="px-2.5 py-0.5 text-xs text-black bg-orange-500 dark:bg-orange-500 rounded-xl dark:text-black">
                    Seller Profile
                  </button>

                </div>
                <span class="px-2.5 py-0.5 text-xs text-orange-600 bg-orange-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">New
                  Arrival</span>
                <h2 class="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                  {item?.name}
                </h2>
                <div class="flex flex-wrap items-center mb-6">
                  <ul class="flex mb-4 mr-2 lg:mb-0">
                    <li>
                      <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star " viewBox="0 0 16 16">
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z">
                          </path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                  {/* <a class="mb-4 text-xs underline hover:text-orange-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#">
                    View the acer store
                  </a> */}
                </div>
                <p class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                  <span>{`LKR :${(
                    item?.price -
                    item?.price * (item?.priceDrop / 100)
                  ).toFixed(2)}`}</span>
                  {(item.onSale == "yes") ?
                    < span class="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">LKR{item && item?.price}</span>
                    : null
                  }
                </p>
              </div>
              <div class="mb-6">
                <h2 class="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Description :</h2>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <div class="p-3 lg:p-5 ">
                    <div class="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                      <div class="flex flex-wrap gap-x-10 gap-y-4">
                        <div class="w-full md:w-2/5">
                          <div class="flex ">
                            <div>
                              <h2 class="text-base font-semibold text-gray-700 dark:text-gray-400">
                                {item?.description}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                <span class="text-base text-gray-600 dark:text-gray-400">In Stock</span>
                <p class="mt-2 text-sm text-orange-500 dark:text-orange-200">{item.location}:{item.city} - 
                  <span class="text-gray-600 dark:text-gray-400">
                    {item.deliveryInfo}
                  </span>
                </p>
              </div>
              <div class="mb-6 "></div>
              <div class="flex flex-wrap items-center mb-6">
                <div class="mb-4 mr-4 lg:mb-0">
                  <div class="w-28">
                    <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                      <button class="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                        <span class="m-auto text-2xl font-thin">-</span>
                      </button>
                      <input type="number" class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder="1" />
                      <button class="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                        <span class="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div class="mb-4 lg:mb-0">
                  <button class="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-orange-600 hover:bg-orange-600 hover:border-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 dark:hover:border-orange-500 dark:hover:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" bi bi-heart" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                      </path>
                    </svg>
                  </button>
                </div> */}
                <a href="#" class="w-full px-4 py-3 text-center text-orange-600 bg-orange-100 border border-orange-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-orange-600 hover:text-gray-100 lg:w-1/2 rounded-xl">
                  Add to cart
                </a>
              </div>
              {/* <div class="flex gap-4 mb-6">
                <a href="#" class="w-full px-4 py-3 text-center text-gray-100 bg-orange-600 border border-transparent dark:border-gray-700 hover:border-orange-500 hover:text-orange-700 hover:bg-orange-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                  Buy now</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section >
    // <section className="product-container"  >  
    // <div className="product-containerLeft ">
    //           <div className="product-displayImageContainer">
    //             <div className="max-w-xl overflow-hidden rounded-lg">
    //               <img
    //                 src={item?.imageUrl}
    //                 className="h-full w-full max-w-full object-cover"
    //                 alt="Product Details"
    //               />
    //             </div>
    //           </div>
    //           <div className="product-displaySubImageContaine"> 
    //               <button
    //                 type="button"
    //                 className=" flex-0 aspect-square mb-3 h-20 overflow-hidden  border-2 border-gray-100 text-center product-displaySubImage"
    //               >
    //                 <img
    //                   src={item?.imageUrl}
    //                   className="h-full w-full object-contain"
    //                   alt="Product Details"
    //                 />
    //               </button>
    //               <button
    //                 type="button"
    //                 className="flex-0 aspect-square mb-3 h-20 overflow-hidden   border-2 border-gray-100 text-center product-displaySubImage"
    //               >
    //                 <img
    //                   src={item?.imageUrl}
    //                   className="h-full w-full object-contain"
    //                   alt="Product Details"
    //                 />
    //               </button> 
    //         </div>
    //       </div>
    //       <div className="product-containerRight">
    //         <h1 className="text-2xl font-bold text-gray-900">
    //           {item && item?.name}
    //         </h1>
    //         <div className="mt-10  mr-2 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
    //           <div className="flex items-end">
    //           {item?.onSale === "yes" ? (
    //               <h1 className="text-3xl font-bold space-x-4" style={{color:'#e84218'}}>{`LKR${(
    //                 item?.price -
    //                 item?.price * (item?.priceDrop / 100)
    //               ).toFixed(2)}`}</h1>
    //             ) : null}

    //             <h1
    //               className={`text-3xl ml-4 font-bold text-gray-500 ${
    //                 item?.onSale === "yes" ? "line-through" : ""
    //               }`}
    //             >
    //               LKR{item && item?.price}
    //             </h1>

    //           </div>

    //         </div>
    //         <ul className="mt-8 space-y-2">
    //           <li className="flex items-center text-left text-sm font-medium text-gray-600">
    //             {item && item?.deliveryInfo}
    //           </li>
    //           <li className="flex items-center text-left text-sm font-medium text-gray-600">
    //             {"Cancel anytime"}
    //           </li>
    //         </ul>
    //         <button
    //             type="button"
    //             onClick={() => handleAddToCart(item)}
    //             className="mt-20 mb-`10 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
    //           >
    //             {componentLevelLoader && componentLevelLoader.loading ? (
    //               <ComponentLevelLoader
    //                 text={"Adding to Cart"}
    //                 color={"#ffffff"}
    //                 loading={
    //                   componentLevelLoader && componentLevelLoader.loading
    //                 }
    //               />
    //             ) : (
    //               <>
    //                Add to Cart
    //               </>
    //             )}
    //           </button>
    //         <div className="lg:col-span-3">
    //           <div className="border-b border-gray-400">
    //             <nav className="flex gap-4">
    //               <a
    //                 href="#"
    //                 className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
    //               >
    //                 Description
    //               </a>
    //             </nav>
    //           </div>
    //           <div className="mt-8 flow-root sm:mt-12">
    //             {item && item?.description}
    //           </div>
    //         </div>  
    //   </div>
    //   <Notification/>
    // </section>
  );
}
