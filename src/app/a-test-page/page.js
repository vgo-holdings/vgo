'use client'
// import React, { useContext, useEffect, useState } from "react";
// import logo from "../../components/Navbar/vgo 1.png";
// import Image from "next/image";
// import bannerIMage from "../../assets/images/assets/img2.png";
// // import "../../components/CommonListing/page-className.css"
// export default function page() {
//     const [showFilters, setShowFilters] = useState(true);

//     function filtermenu() {
//         console.log("🚀 ~ file: page.js:15 ~ filtermenu ~ setShowFilters:", showFilters)
//         setShowFilters(!showFilters);
//     }
//     console.log("🚀 ~ file: page.js:15 ~ filtermenu ~ setShowFilters:", showFilters)
//     // return (
//     //     <div className="shop-mainContainer">
//     //         <div className="shop-banner">
//     //             <p className={{ marginBottom: "auto", marginTop: "auto" }}>
//     //                 <span className={{ color: "#e84118" }}>Shopping</span> the way you like it
//     //             </p>
//     //             <Image
//     //                 src={bannerIMage}
//     //                 className="shop-bannerImage"
//     //                 alt="shop-banner"
//     //                 width={500}
//     //                 height={500}
//     //             />
//     //         </div>

//     //         <div class="w-full lg:w-[92%] shadow p-5 rounded-lg bg-white">
//     //             <div class="relative">
//     //                 <div class="absolute flex items-center ml-2 h-full">
//     //                     <svg class="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//     //                         <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
//     //                     </svg>
//     //                 </div>

//     //                 <input type="text" placeholder="Search by listing, location, bedroom number..." class="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
//     //             </div>

//     //             <div class="flex items-center justify-between mt-4">
//     //                 <p class="font-medium">
//     //                     Filters
//     //                 </p>
//     //                 <div>
//     //                     <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
//     //                         Reset Filter
//     //                     </button>
//     //                     <button class="ml-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" onClick={filtermenu}>
//     //                         {
//     //                             showFilters ? ("Hide Filter") : ("Show Filter")
//     //                         }
//     //                     </button>
//     //                 </div>
//     //             </div>
//     //             {
//     //                 showFilters &&
//     //                 <div>
//     //                     <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
//     //                         <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
//     //                             <option value="">Any Price</option>
//     //                             <option value="price1">LKR 0 - LKR 10,000</option>
//     //                             <option value="price2">LKR 10,000 - LKR 20,000</option>
//     //                             <option value="price3">LKR 20,000 - LKR 50,000</option>
//     //                             <option value="price4">LKR 50,000 +</option>
//     //                         </select>

//     //                         <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
//     //                             <option value="">Location</option>
//     //                             <option value="Colombo">Colombo</option>
//     //                             <option value="Kandy">Kandy</option>
//     //                             <option value="Galle">Galle</option>
//     //                             <option value="Matara">Matara</option>
//     //                             <option value="Anuradhapura">Anuradhapura</option>
//     //                             <option value="Polonnaruwa">Polonnaruwa</option>
//     //                             <option value="Badulla">Badulla</option>
//     //                             <option value="Ratnapura">Ratnapura</option>
//     //                             <option value="Kegale">Kegale</option>
//     //                             <option value="Kurunegala">Kurunegala</option>
//     //                             <option value="Puttalam">Puttalam</option>
//     //                             <option value="Trincomalee">Trincomalee</option>
//     //                             <option value="Jaffna">Jaffna</option>
//     //                             <option value="Kilinochchi">Kilinochchi</option>
//     //                             <option value="Mannar">Mannar</option>
//     //                             <option value="Mullaitivu">Mullaitivu</option>
//     //                             <option value="Vavuniya">Vavuniya</option>
//     //                             <option value="Gampaha">Gampaha</option>
//     //                             <option value="Kalutara">Kalutara</option>
//     //                             <option value="Matale">Matale</option>
//     //                             <option value="Nuwara Eliya">Nuwara Eliya</option>
//     //                             <option value="Monaragala">Monaragala</option>
//     //                             <option value="Hambanthota">Hambanthota</option>
//     //                             <option value="Rathnapura">Rathnapura</option>
//     //                             <option value="Batticaloa">Batticaloa</option>
//     //                         </select>

//     //                         <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
//     //                             <option value="">Category</option>

//     //                         </select>
//     //                     </div>
//     //                 </div>
//     //             }

//     //         </div>
//     //         <section class="py-10 lg:w-[92%] bg-gray-100 mt-5 ">
//     //             <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
//     //                             {/* <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                 </svg>

//     //                                 <button class="text-sm">Add to cart</button>
//     //                             </div> */}
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">Adobe Photoshop CC 2022</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>
//     //                             <div class="flex gap-1 text-orange-400 mt-1">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
//     //                                 </svg>
//     //                             </div>

//     //                             <div class="flex">
//     //                                 <div class="w-1/2 px-5 pb-3">
//     //                                     <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
//     //                                         $299.99
//     //                                     </p>
//     //                                     <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
//     //                                 </div>
//     //                                 <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
//     //                                     Add To Cart
//     //                                 </button>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>
//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
//     //                             <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
//     //                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//     //                                 </svg>
//     //                                 <span class="ml-1 text-sm text-slate-400">4.9</span>
//     //                             </div>
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

//     //                             <div class="mt-3 flex items-end justify-between">
//     //                                 <p class="text-lg font-bold text-blue-500">$850</p>


//     //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                     </svg>

//     //                                     <button class="text-sm">Add to cart</button>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>

//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
//     //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                 </svg>

//     //                                 <button class="text-sm">Add to cart</button>
//     //                             </div>
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

//     //                             <div class="mt-3 flex items-end justify-between">
//     //                                 <p class="text-lg font-bold text-blue-500">$450</p>
//     //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                     </svg>

//     //                                     <button class="text-sm">Add to cart</button>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>

//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
//     //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                 </svg>

//     //                                 <button class="text-sm">Add to cart</button>
//     //                             </div>
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

//     //                             <div class="mt-3 flex items-end justify-between">
//     //                                 <p class="text-lg font-bold text-blue-500">$450</p>
//     //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                     </svg>

//     //                                     <button class="text-sm">Add to cart</button>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>
//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" alt="Hotel Photo" />
//     //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                 </svg>

//     //                                 <button class="text-sm">Add to cart</button>
//     //                             </div>
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

//     //                             <div class="mt-3 flex items-end justify-between">
//     //                                 <p class="text-lg font-bold text-blue-500">$450</p>
//     //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                     </svg>

//     //                                     <button class="text-sm">Add to cart</button>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>
//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80" alt="Hotel Photo" />
//     //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                 </svg>

//     //                                 <button class="text-sm">Add to cart</button>
//     //                             </div>
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

//     //                             <div class="mt-3 flex items-end justify-between">
//     //                                 <p class="text-lg font-bold text-blue-500">$450</p>

//     //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                     </svg>

//     //                                     <button class="text-sm">Add to cart</button>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>
//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="Hotel Photo" />
//     //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                 </svg>

//     //                                 <button class="text-sm">Add to cart</button>
//     //                             </div>
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

//     //                             <div class="mt-3 flex items-end justify-between">
//     //                                 <p class="text-lg font-bold text-blue-500">$450</p>

//     //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                     </svg>

//     //                                     <button class="text-sm">Add to cart</button>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>
//     //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
//     //                     <a href="#">
//     //                         <div class="relative flex items-end overflow-hidden rounded-xl">
//     //                             <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80" alt="Hotel Photo" />
//     //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                 </svg>

//     //                                 <button class="text-sm">Add to cart</button>
//     //                             </div>
//     //                         </div>

//     //                         <div class="mt-1 p-2">
//     //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

//     //                             <div class="mt-3 flex items-end justify-between">
//     //                                 <p class="text-lg font-bold text-blue-500">$450</p>

//     //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
//     //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
//     //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
//     //                                     </svg>

//     //                                     <button class="text-sm">Add to cart</button>
//     //                                 </div>
//     //                             </div>
//     //                         </div>
//     //                     </a>
//     //                 </article>
//     //             </div>
//     //         </section>
//     //         <section class="flex items-center py-20 bg-gray-100 lg:h-screen dark:bg-gray-800">
//     //             <div class="px-4 mx-auto max-w-7xl">
//     //                 <div class="grid grid-cols-1 gap-4 lg:gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
//     //                     <div class="relative overflow-hidden bg-white rounded-xl dark:bg-gray-700 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
//     //                         <div class="relative overflow-hidden p-5">
//     //                             <div class="mb-5 overflow-hidden ">
//     //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/XqBnTJBL/pink-sweater-front.jpg" alt="" />
//     //                             </div>
//     //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
//     //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
//     //                                 </svg>
//     //                             </button>
//     //                         </div>
//     //                         <a>
//     //                             <h3 class="px-5 mb-1 text-lg font-bold dark:text-white"> Pink Tshirt With Braided
//     //                                 Sweater Pattern </h3>
//     //                         </a>
//     //                         <div class="px-5 p-2">
//     //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>
//     //                             <div class="flex gap-1 text-orange-400 mt-1">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
//     //                                 </svg>
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
//     //                                     class="bi bi-star" viewBox="0 0 16 16">
//     //                                     <path
//     //                                         d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
//     //                                 </svg>
//     //                             </div>
//     //                         </div>
//     //                         <div class="flex">
//     //                             <div class="w-1/2 px-5 pb-3">
//     //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
//     //                                     $299.99
//     //                                 </p>
//     //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
//     //                             </div>
//     //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
//     //                                 Add To Cart
//     //                             </button>
//     //                         </div>
//     //                     </div>

//     //                     <div class="relative overflow-hidden bg-white shadow rounded-xl dark:bg-gray-700">
//     //                         <div class="relative overflow-hidden">
//     //                             <div class="mb-5 overflow-hidden">
//     //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/sgKB6VR6/ryan-plomp-a-Ctb-RTwu-M-unsplash-1.jpg" alt="" />
//     //                             </div>
//     //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
//     //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
//     //                                 </svg>
//     //                             </button>
//     //                         </div>
//     //                         <a>
//     //                             <h3 class="px-5 mb-4 text-lg font-bold dark:text-white"> Nike Shoes With Extending Shoe Laces
//     //                             </h3>
//     //                         </a>
//     //                         <div class="flex">
//     //                             <div class="w-1/2 px-5 pb-3">
//     //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
//     //                                     $299.99
//     //                                 </p>
//     //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
//     //                             </div>
//     //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
//     //                                 Add To Cart
//     //                             </button>
//     //                         </div>
//     //                     </div>
//     //                     <div class="relative overflow-hidden bg-white shadow rounded-xl dark:bg-gray-700">
//     //                         <div class="relative overflow-hidden">
//     //                             <div class="mb-5 overflow-hidden">
//     //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/x8LtrkfV/kenny-eliason-HIz-Gn9-FZDFU-unsplash.jpg" alt="" />
//     //                             </div>
//     //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
//     //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
//     //                                 </svg>
//     //                             </button>
//     //                         </div>
//     //                         <a>
//     //                             <h3 class="px-5 mb-4 text-lg font-bold dark:text-white"> Nikon Kodak Lense With Extra Zoom
//     //                             </h3>
//     //                         </a>
//     //                         <div class="flex">
//     //                             <div class="w-1/2 px-5 pb-3">
//     //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
//     //                                     $299.99
//     //                                 </p>
//     //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
//     //                             </div>
//     //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
//     //                                 Add To Cart
//     //                             </button>
//     //                         </div>
//     //                     </div>
//     //                     <div class="relative overflow-hidden bg-white shadow rounded-xl dark:bg-gray-700">
//     //                         <div class="relative overflow-hidden">
//     //                             <div class="mb-5 overflow-hidden">
//     //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/K8qmN64m/pexels-javon-swaby-2783873.jpg" alt="" />
//     //                             </div>
//     //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
//     //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
//     //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
//     //                                 </svg>
//     //                             </button>
//     //                         </div>
//     //                         <a>
//     //                             <h3 class="px-5 mb-4 text-lg font-bold dark:text-white"> 24 Carat Pure Silver Classic Watch
//     //                             </h3>
//     //                         </a>
//     //                         <div class="flex">
//     //                             <div class="w-1/2 px-5 pb-3">
//     //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
//     //                                     $299.99
//     //                                 </p>
//     //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
//     //                             </div>
//     //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
//     //                                 Add To Cart
//     //                             </button>
//     //                         </div>
//     //                     </div>
//     //                 </div>
//     //             </div>
//     //         </section>
//     //     </div>
//     // );
//     // account pop up 
//     // return (
//     //     <div class="rounded absolute top-0 left-0 flex items-center justify-center w-full h-full "
//     //         // onClick={closeMsg}
//     //         className={{ backgroundColor: 'rgba(0,0,0,.5)' }}
//     //         x-show="open">
//     //         <div class=" h-auto p-4 mx-2 text-left bg-white rounded-3xl shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
//     //         >
//     //             <div class="flex justify-center mb-4">
//     //                 <button
//     //                     // onClick={closeMsg}
//     //                     class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
//     //                     {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 fill-myOrange">
//     //                         <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
//     //                     </svg> */}
//     //                     <Image
//     //                         src={logo}
//     //                         alt="User 1"
//     //                         className="ml-2 h-16 w-16 md:h-16 md:w-16 object-cover transform scale-100"
//     //                     />
//     //                 </button>
//     //             </div>
//     //             <div class="mb-4 text-center">
//     //                 <h2 class="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
//     //                     HI - Krishan
//     //                 </h2>
//     //                 <div class="mt-4 ">
//     //                     <p class="text-lg leading-5 text-gray-500 dark:text-gray-400">
//     //                         Please Select Your <a href="#" class="text-myOrange font-bold">Package!</a>
//     //                         {/* Please select your package! Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a> */}
//     //                     </p>
//     //                     <div className="flex mt-2">
//     //                         <p class="text-mb p-3 w-1/2 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
//     //                         A shopping mall is a single location for several (six) types of your business
//     //                         </p>
//     //                         <p class="text-mb p-3 ml-1 leading-5 text-gray-500 w-1/2 dark:text-gray-400 border rounded-2xl">
//     //                         An Store is just space for your main business only 
//     //                         </p>
//     //                     </div>

//     //                 </div>
//     //             </div>
//     //             <span class="justify-center  gap-3 rounded-md shadow-sm flex text-xs">
//     //                 <button
//     //                     className={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
//     //                     class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
//     //                 // onClick={goToLogin}
//     //                 >
//     //                     Select Shopping Mall
//     //                 </button>
//     //                 <button
//     //                     className={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
//     //                     class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
//     //                 // onClick={goToLogin}
//     //                 >
//     //                     Select Online Shop
//     //                 </button>
//     //             </span>
//     //             <div class="mt-4 flex items-center justify-center">
//     //             <p class="text-xs lg:text-sm leading-5 text-gray-500 dark:text-gray-400">
//     //                 Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a>
//     //             </p>
//     //             </div>
//     //         </div>
//     //     </div >
//     // );

//     return (
//         <div className="w-96 h-96 relative bg-white">
//             <div className="h-36 left-[138px] top-[676px] absolute justify-end items-start gap-12 inline-flex">
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Electronics</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[35px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Properties</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Furniture</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Appliances</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Vehicles</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Household</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Electronics</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[35px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Properties</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Furniture</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Appliances</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Vehicles</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//                 <div className="w-32 h-36 relative">
//                     <div className="w-32 h-6 left-0 top-[114px] absolute text-center text-zinc-700 text-base font-medium font-['Poppins'] tracking-widest">Household</div>
//                     <div className="w-24 h-24 left-[11px] top-0 absolute bg-orange-600 bg-opacity-10 rounded-full" />
//                     <img className="w-14 h-14 left-[36px] top-[25px] absolute" src="https://via.placeholder.com/55x55" />
//                 </div>
//             </div>

//             <div className="w-96 h-96 left-[563px] top-[55px] absolute">
//                 <img className="w-96 h-96 left-0 top-[38px] absolute" src="https://via.placeholder.com/655x436" />
//             </div>
//             <div className="w-96 h-40 left-[114px] top-[99px] absolute"><span className="text-zinc-700 text-6xl font-bold font-['DM Sans']">Shop </span><span className="text-orange-600 text-6xl font-bold font-['DM Sans']">Smart</span><span className="text-zinc-700 text-6xl font-bold font-['DM Sans']">,<br />Shop</span><span className="text-orange-600 text-6xl font-bold font-['DM Sans']"> Easy</span></div>
//             <div className="w-96 h-32 left-0 top-[529px] absolute bg-orange-600" />
//             <div className="w-96 h-24 left-[114px] top-[279px] absolute text-zinc-500 text-base font-normal font-['Poppins']">Sri Lanka’s largest e-commerce platform which offers great online shopping experience!</div>
//             <div className="w-44 h-12 left-[272px] top-[418px] absolute"><span className="text-zinc-700 text-xl font-bold font-['Poppins']">10,000+<br /></span><span className="text-zinc-700 text-xs font-medium font-['Poppins']">Trusted sellers</span></div>
//             <img className="w-10 h-10 left-[114px] top-[422px] absolute rounded-full border-2 border-white" src="https://via.placeholder.com/39x41" />
//             <img className="w-9 h-10 left-[142px] top-[422px] absolute rounded-full border-2 border-white" src="https://via.placeholder.com/38x41" />
//             <img className="w-10 h-10 left-[169px] top-[422px] absolute rounded-full border-2 border-white" src="https://via.placeholder.com/39x41" />
//             <img className="w-9 h-10 left-[197px] top-[422px] absolute rounded-full border-2 border-white" src="https://via.placeholder.com/38x41" />
//             <img className="w-10 h-10 left-[224px] top-[422px] absolute rounded-full border-2 border-white" src="https://via.placeholder.com/39x41" />
//             <div className="w-28 h-9 left-[114px] top-[355px] absolute bg-orange-600 rounded-md" />
//             <div className="w-28 h-9 left-[250px] top-[355px] absolute bg-zinc-700 bg-opacity-0 rounded-md border border-zinc-700" />
//             <div className="w-24 h-5 left-[129px] top-[363px] absolute text-center text-white text-sm font-normal font-['Poppins']">Shop Now</div>
//             <div className="w-24 h-5 left-[264px] top-[363px] absolute text-center text-zinc-700 text-sm font-normal font-['Poppins']">Learn How</div>
//             <div className="w-96 h-20 left-[146px] top-[549px] absolute">
//                 <div className="w-28 h-20 left-0 top-[4px] absolute">
//                     <div className="w-28 h-12 left-0 top-0 absolute text-white text-4xl font-semibold font-['Poppins']">250+</div>
//                     <div className="w-24 h-7 left-0 top-[45px] absolute text-white text-2xl font-medium font-['Poppins']">Brands</div>
//                 </div>
//                 <div className="w-40 h-20 left-[539px] top-[4px] absolute">
//                     <div className="w-28 h-12 left-0 top-0 absolute text-white text-4xl font-semibold font-['Poppins']">20+</div>
//                     <div className="w-40 h-7 left-0 top-[45px] absolute text-white text-2xl font-medium font-['Poppins']">Categories</div>
//                 </div>
//                 <div className="w-64 h-20 left-[818px] top-[4px] absolute">
//                     <div className="w-64 h-12 left-0 top-0 absolute text-white text-4xl font-semibold font-['Poppins']">10,000+</div>
//                     <div className="w-60 h-7 left-0 top-[45px] absolute text-white text-2xl font-medium font-['Poppins']">Trusted Sellers</div>
//                 </div>
//                 <div className="w-44 h-20 left-[243px] top-[4px] absolute">
//                     <div className="w-44 h-12 left-0 top-0 absolute text-white text-4xl font-semibold font-['Poppins']">1000+</div>
//                     <div className="w-32 h-7 left-0 top-[45px] absolute text-white text-2xl font-medium font-['Poppins']">Products</div>
//                 </div>
//                 <div className="w-20 h-px left-[159px] top-0 absolute origin-top-left rotate-90 border-2 border-white"></div>
//                 <div className="w-20 h-px left-[447px] top-0 absolute origin-top-left rotate-90 border-2 border-white"></div>
//                 <div className="w-20 h-px left-[747px] top-0 absolute origin-top-left rotate-90 border-2 border-white"></div>
//             </div>
//             <div className="w-64 h-14 left-[74px] top-[1559px] absolute">
//                 <div className="w-64 h-14 left-0 top-0 absolute text-zinc-700 text-3xl font-semibold font-['Poppins']">Best Selling</div>
//                 <div className="w-24 h-px left-0 top-[47px] absolute border-2 border-orange-600"></div>
//             </div>
//             <div className="w-64 h-14 left-[66px] top-[2142px] absolute">
//                 <div className="w-64 h-14 left-0 top-0 absolute text-zinc-700 text-3xl font-semibold font-['Poppins']">New Arrivals</div>
//                 <div className="w-24 h-px left-0 top-[47px] absolute border-2 border-orange-600"></div>
//             </div>
//             <div className="w-96 h-96 left-[74px] top-[1630px] absolute">
//                 <div className="w-72 h-96 left-[969px] top-[3px] absolute bg-zinc-100 rounded-lg shadow" />
//                 <img className="w-64 h-64 left-[989px] top-[29px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                 <div className="w-20 h-8 left-[976px] top-[10px] absolute bg-orange-600 rounded" />
//                 <div className="w-16 h-6 left-[984px] top-[14px] absolute text-center text-white text-lg font-semibold font-['Poppins']">20% Off</div>
//                 <div className="w-64 h-7 left-[989px] top-[351px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">83,500.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">110,000</span></div>
//                 <div className="w-64 h-9 left-[981px] top-[318px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">Xiaomi Redmi Note 11</div>
//                 <div className="w-24 h-4 left-[989px] top-[386px] absolute">
//                     <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                 </div>
//                 <div className="w-72 h-96 left-0 top-[3px] absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[23px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[4px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[8px] absolute text-center text-white text-lg font-semibold font-['Poppins']">20% Off</div>
//                     <div className="w-64 h-9 left-[12px] top-[312px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">Wireless headphones D012</div>
//                     <div className="w-64 h-7 left-[20px] top-[345px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">12,500.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">20,000</span></div>
//                     <div className="w-24 h-4 left-[20px] top-[380px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[273px] top-[444px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                     <div className="w-36 h-6 left-[77px] top-[414px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                 </div>
//                 <div className="w-72 h-96 left-[323px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">10% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">14,500.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">19,500</span></div>
//                     <div className="w-64 h-9 left-[12px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">RayBan Sunglass Dark </div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//                 <div className="w-72 h-96 left-[646px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">35% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">135,500.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">195,000</span></div>
//                     <div className="w-64 h-9 left-[12px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">LG 32” HD Television</div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//                 <div className="w-64 h-9 left-[989px] top-[414px] absolute">
//                     <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                     <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                 </div>
//                 <div className="w-72 h-96 left-[1292px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">25% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">6,000.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">8,500</span></div>
//                     <div className="w-64 h-9 left-[12px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">Smart Watch KD99 Ultra</div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//                 <div className="w-72 h-96 left-[1615px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">35% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">23,600.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">35,000</span></div>
//                     <div className="w-64 h-9 left-[12px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">Samsung Galaxy A04</div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-96 h-96 left-[74px] top-[2220px] absolute">
//                 <div className="w-72 h-96 left-[969px] top-[3px] absolute bg-zinc-100 rounded-lg shadow" />
//                 <img className="w-64 h-64 left-[989px] top-[29px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                 <div className="w-20 h-8 left-[976px] top-[10px] absolute bg-orange-600 rounded" />
//                 <div className="w-16 h-6 left-[984px] top-[14px] absolute text-center text-white text-lg font-semibold font-['Poppins']">10% Off</div>
//                 <div className="w-64 h-7 left-[989px] top-[351px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">83,500.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">110,000</span></div>
//                 <div className="w-64 h-9 left-[981px] top-[318px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">2 in 1 Aux Audio Charge</div>
//                 <div className="w-24 h-4 left-[989px] top-[386px] absolute">
//                     <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                     <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                 </div>
//                 <div className="w-72 h-96 left-0 top-[3px] absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[23px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[4px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[8px] absolute text-center text-white text-lg font-semibold font-['Poppins']">10% Off</div>
//                     <div className="w-64 h-9 left-[12px] top-[312px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">iPhone 14 Pro Max</div>
//                     <div className="w-64 h-7 left-[20px] top-[345px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">364,900.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">400,000</span></div>
//                     <div className="w-24 h-4 left-[20px] top-[380px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[273px] top-[444px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                     <div className="w-36 h-6 left-[77px] top-[414px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                 </div>
//                 <div className="w-72 h-96 left-[323px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">10% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">14,500.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">19,500</span></div>
//                     <div className="w-64 h-9 left-[12px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">I7 TWS Wireless Earbuds</div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//                 <div className="w-72 h-96 left-[646px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">10% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">480.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">520</span></div>
//                     <div className="w-64 h-9 left-[12px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">Micro USB Charging Cable</div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//                 <div className="w-64 h-9 left-[989px] top-[414px] absolute">
//                     <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                     <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                 </div>
//                 <div className="w-72 h-96 left-[1292px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">10% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">950.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">1,150</span></div>
//                     <div className="w-72 h-9 left-[6px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">Apple Lightning OTG Adapter</div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//                 <div className="w-72 h-96 left-[1615px] top-0 absolute">
//                     <div className="w-72 h-96 left-0 top-0 absolute bg-zinc-100 rounded-lg shadow" />
//                     <img className="w-64 h-64 left-[20px] top-[26px] absolute rounded-lg" src="https://via.placeholder.com/253x270" />
//                     <div className="w-20 h-8 left-[7px] top-[7px] absolute bg-orange-600 rounded" />
//                     <div className="w-16 h-6 left-[15px] top-[11px] absolute text-center text-white text-lg font-semibold font-['Poppins']">10% Off</div>
//                     <div className="w-64 h-7 left-[20px] top-[348px] absolute"><span className="text-orange-600 text-lg font-semibold font-['Poppins']">LKR</span><span className="text-zinc-700 text-lg font-semibold font-['Poppins']"> </span><span className="text-zinc-700 text-lg font-normal font-['Poppins']">400.00   </span><span className="text-zinc-500 text-base font-normal font-['Poppins'] line-through">440</span></div>
//                     <div className="w-64 h-9 left-[12px] top-[315px] absolute text-center text-zinc-700 text-lg font-semibold font-['Poppins']">Car Universal Phone Holder</div>
//                     <div className="w-24 h-4 left-[20px] top-[383px] absolute">
//                         <div className="w-4 h-4 px-px py-0.5 left-0 top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[19px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[38px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[57px] top-0 absolute justify-center items-center inline-flex" />
//                         <div className="w-4 h-4 px-px py-0.5 left-[76px] top-0 absolute justify-center items-center inline-flex" />
//                     </div>
//                     <div className="w-64 h-9 left-[20px] top-[411px] absolute">
//                         <div className="w-64 h-9 left-[253px] top-[36px] absolute origin-top-left -rotate-180 bg-orange-600 rounded" />
//                         <div className="w-36 h-6 left-[57px] top-[6px] absolute text-center text-white text-base font-semibold font-['Poppins']">Buy Now</div>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-96 h-14 left-[74px] top-[2733px] absolute"><span className="text-zinc-700 text-5xl font-bold font-['DM Sans']">Want To </span><span className="text-orange-600 text-5xl font-bold font-['DM Sans']">Join Us</span></div>
//             <div className="w-64 h-14 left-[512px] top-[2843px] absolute"><span className="text-zinc-700 text-4xl font-bold font-['DM Sans']">Pricing </span><span className="text-zinc-700 text-4xl font-normal font-['DM Sans']">Plans</span></div>
//             <div className="w-80 h-96 left-[670px] top-[2930px] absolute">
//                 <div className="w-80 h-96 left-0 top-[40px] absolute bg-zinc-300 bg-opacity-40 rounded-lg shadow" />
//                 <div className="w-80 h-32 left-[1px] top-[40px] absolute bg-orange-600 rounded-tl-lg rounded-tr-lg" />
//                 <div className="w-20 h-20 left-[135px] top-0 absolute bg-zinc-700 rounded-full" />
//                 <div className="w-72 h-14 left-[27px] top-[79px] absolute text-center text-white text-4xl font-bold font-['DM Sans']">Standerd</div>
//                 <div className="w-72 h-14 left-[27px] top-[124px] absolute text-center text-white text-2xl font-bold font-['DM Sans']">LKR 10,000</div>
//             </div>
//             <div className="w-80 h-96 left-[275px] top-[2930px] absolute">
//                 <div className="w-80 h-96 left-0 top-[39px] absolute bg-zinc-300 bg-opacity-40 rounded-lg shadow" />
//                 <div className="w-80 h-32 left-[1px] top-[39px] absolute bg-orange-600 rounded-tl-lg rounded-tr-lg" />
//                 <div className="w-20 h-20 left-[135px] top-0 absolute bg-zinc-700 rounded-full" />
//                 <div className="w-64 h-14 left-[45px] top-[79px] absolute text-center text-white text-4xl font-bold font-['DM Sans']">Starter</div>
//                 <div className="w-64 h-14 left-[45px] top-[124px] absolute text-center text-white text-2xl font-bold font-['DM Sans']">LKR 1000</div>
//                 <div className="w-12 h-12 p-1.5 left-[150px] top-[15px] absolute justify-center items-center inline-flex" />
//             </div>
//             <div className="w-12 h-12 px-1.5 py-2 left-[820px] top-[2945px] absolute justify-center items-center inline-flex" />
//             <div className="w-64 h-36 left-[349px] top-[3136px] absolute">
//                 <div className="w-64 h-7 left-0 top-0 absolute text-zinc-700 text-lg font-normal font-['Poppins']">3 Photos and 5 Videos</div>
//                 <div className="w-64 h-7 left-0 top-[38px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege One</div>
//                 <div className="w-64 h-7 left-0 top-[76px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege Two</div>
//                 <div className="w-64 h-7 left-0 top-[114px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege Three</div>
//             </div>
//             <div className="w-64 h-56 left-[738px] top-[3136px] absolute">
//                 <div className="w-64 h-7 left-0 top-0 absolute text-zinc-700 text-lg font-normal font-['Poppins']">40 Photos and 20 Videos</div>
//                 <div className="w-64 h-7 left-0 top-[38px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege One</div>
//                 <div className="w-64 h-7 left-0 top-[76px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege Two</div>
//                 <div className="w-64 h-7 left-0 top-[114px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege Three</div>
//                 <div className="w-64 h-7 left-0 top-[152px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege Four</div>
//                 <div className="w-64 h-7 left-0 top-[190px] absolute text-zinc-700 text-lg font-normal font-['Poppins']">Privilege Five</div>
//             </div>
//             <img className="w-5 h-5 left-[317px] top-[3141px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[317px] top-[3179px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[317px] top-[3217px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[317px] top-[3255px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[708px] top-[3255px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[708px] top-[3293px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[708px] top-[3331px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[708px] top-[3217px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[708px] top-[3179px] absolute" src="https://via.placeholder.com/20x20" />
//             <img className="w-5 h-5 left-[708px] top-[3141px] absolute" src="https://via.placeholder.com/20x20" />
//             <div className="w-96 h-14 left-[143px] top-[3636px] absolute">
//                 <div className="w-32 h-11 left-[1.81px] top-0 absolute text-center text-orange-600 text-2xl font-medium font-['Poppins'] tracking-widest">VGO</div>
//                 <div className="w-44 h-7 left-[331px] top-[13px] absolute text-center text-orange-600 text-xl font-medium font-['Poppins']">Quick Links</div>
//                 <div className="w-44 h-7 left-[579px] top-[13px] absolute text-center text-orange-600 text-xl font-medium font-['Poppins']">Our Partners</div>
//                 <div className="w-44 h-7 left-[827px] top-[13px] absolute text-center text-orange-600 text-xl font-medium font-['Poppins']">Contact Us</div>
//                 <div className="w-32 h-6 left-0 top-[34.80px] absolute text-center text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">HOLDINGS</div>
//             </div>
//             <div className="w-80 h-24 left-[55px] top-[3713px] absolute text-center text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</div>
//             <div className="w-36 h-6 left-[505px] top-[3689px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Quick Link One</div>
//             <div className="w-36 h-6 left-[746px] top-[3689px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Partner One</div>
//             <div className="w-36 h-6 left-[505px] top-[3723px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Quick Link Two</div>
//             <div className="w-36 h-6 left-[746px] top-[3723px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Partner Two</div>
//             <div className="w-36 h-6 left-[505px] top-[3756px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Quick Link Three</div>
//             <div className="w-36 h-6 left-[746px] top-[3756px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Partner Three</div>
//             <div className="w-36 h-6 left-[505px] top-[3789px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Quick Link Four</div>
//             <div className="w-36 h-6 left-[746px] top-[3789px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Partner Four</div>
//             <div className="w-36 h-6 left-[505px] top-[3822px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Quick Link Five</div>
//             <div className="w-36 h-6 left-[746px] top-[3822px] absolute text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Partner Five</div>
//             <div className="w-96 h-6 left-[382px] top-[3935px] absolute text-center text-zinc-500 text-xs font-medium font-['Poppins'] tracking-wider">Developed & Maintained by VGO Holdings Pvt. Ltd.</div>
//             <img className="w-7 h-7 left-[1003px] top-[3689px] absolute" src="https://via.placeholder.com/30x30" />
//             <img className="w-7 h-7 left-[1052px] top-[3689px] absolute" src="https://via.placeholder.com/30x30" />
//             <img className="w-7 h-7 left-[1101px] top-[3689px] absolute" src="https://via.placeholder.com/30x30" />
//             <img className="w-7 h-7 left-[1150px] top-[3689px] absolute" src="https://via.placeholder.com/30x30" />
//             <div className="w-36 h-6 left-[1082px] top-[22px] absolute">
//                 <div className="w-16 h-6 left-0 top-0 absolute bg-orange-600 rounded-3xl" />
//                 <div className="w-16 h-6 left-[79px] top-0 absolute rounded-3xl border border-orange-600" />
//                 <div className="w-14 h-4 left-[6px] top-[4px] absolute text-center text-white text-xs font-normal font-['Poppins']">Sign in</div>
//                 <div className="w-14 h-4 left-[85px] top-[4px] absolute text-center text-orange-600 text-xs font-normal font-['Poppins']">Sign up</div>
//             </div>
//             <div className="h-96 left-[44px] top-[883px] absolute justify-end items-start gap-24 inline-flex">
//                 <div className="w-96 h-96 relative">
//                     <div className="w-64 h-16 left-[920px] top-[398px] absolute bg-orange-600" />
//                     <img className="w-64 h-96 left-[920px] top-0 absolute" src="https://via.placeholder.com/272x385" />
//                     <div className="w-96 h-96 left-0 top-0 absolute">
//                         <img className="w-96 h-96 left-0 top-0 absolute" src="https://via.placeholder.com/898x466" />
//                         <div className="w-96 h-96 left-0 top-0 absolute bg-stone-900 bg-opacity-50" />
//                     </div>
//                     <div className="w-96 h-24 left-[212px] top-[88px] absolute text-center text-white text-4xl font-bold font-['Inter']">Discounts up to 60%<br />For Furniture</div>
//                     <div className="w-32 h-5 left-[942px] top-[422px] absolute text-white text-base font-semibold font-['Inter']">Find More Offers</div>
//                     <div className="w-6 h-6 px-0.5 py-1.5 left-[1149px] top-[418px] absolute justify-center items-center inline-flex" />
//                     <div className="w-14 h-14 px-1.5 py-4 left-[421px] top-[225px] absolute justify-center items-center inline-flex" />
//                 </div>
//                 <div className="w-96 h-96 relative">
//                     <div className="w-64 h-16 left-[920px] top-[398px] absolute bg-orange-600" />
//                     <img className="w-64 h-96 left-[920px] top-0 absolute" src="https://via.placeholder.com/272x385" />
//                     <div className="w-96 h-96 left-0 top-0 absolute">
//                         <img className="w-96 h-96 left-0 top-0 absolute" src="https://via.placeholder.com/898x466" />
//                         <div className="w-96 h-96 left-0 top-0 absolute bg-stone-900 bg-opacity-50" />
//                     </div>
//                     <div className="w-96 h-24 left-[212px] top-[88px] absolute text-center text-white text-4xl font-bold font-['Inter']">Discounts up to 60%<br />For Furniture</div>
//                     <div className="w-32 h-5 left-[942px] top-[422px] absolute text-white text-base font-semibold font-['Inter']">Find More Offers</div>
//                     <div className="w-6 h-6 px-0.5 py-1.5 left-[1149px] top-[418px] absolute justify-center items-center inline-flex" />
//                     <div className="w-14 h-14 px-1.5 py-4 left-[421px] top-[225px] absolute justify-center items-center inline-flex" />
//                 </div>
//                 <div className="w-96 h-96 relative">
//                     <div className="w-64 h-16 left-[920px] top-[398px] absolute bg-orange-600" />
//                     <img className="w-64 h-96 left-[920px] top-0 absolute" src="https://via.placeholder.com/272x385" />
//                     <div className="w-96 h-96 left-0 top-0 absolute">
//                         <img className="w-96 h-96 left-0 top-0 absolute" src="https://via.placeholder.com/898x466" />
//                         <div className="w-96 h-96 left-0 top-0 absolute bg-stone-900 bg-opacity-50" />
//                     </div>
//                     <div className="w-96 h-24 left-[212px] top-[88px] absolute text-center text-white text-4xl font-bold font-['Inter']">Discounts up to 60%<br />For Furniture</div>
//                     <div className="w-32 h-5 left-[942px] top-[422px] absolute text-white text-base font-semibold font-['Inter']">Find More Offers</div>
//                     <div className="w-6 h-6 px-0.5 py-1.5 left-[1149px] top-[418px] absolute justify-center items-center inline-flex" />
//                     <div className="w-14 h-14 px-1.5 py-4 left-[421px] top-[225px] absolute justify-center items-center inline-flex" />
//                 </div>
//             </div>
//         </div>
//     );
// };

import React from "react";
// import { ArrowArrowRightLg } from "./ArrowArrowRightLg";
// import { ArrowRightLg } from "./ArrowRightLg";
// import { Compass } from "./Compass";
// import { IconComponentNode } from "./IconComponentNode";
// import { InterfaceStar } from "./InterfaceStar";
// import { Star } from "./Star";
// import { Suitcase } from "./Suitcase";


export default function page() {

    async function handleLogin() {
        await new Promise(resolve => setTimeout(resolve, 3000))
        console.log("Hi")
    }


    return (
        <div class="bg-gray-100 xl:h-screen dark:bg-gray-800">
            <button
                style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-lg px-3 py-3 font-semibold"
                // disabled={!isValidForm() || loading}
                onClick={handleLogin}
            >
                SIGN IN
            </button>
            <div class="body-content" x-data="{ open: true }">

                <div class="mx-auto transition-all content-wrapper" id="dash"
                >

                    <section class="px-4 pt-6">
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                            <div class="p-4 bg-white rounded-lg shadow hover:shadow-xl dark:bg-gray-900">
                                <div class="flex flex-row items-center">
                                    <div class="flex-1 text-left md:text-left">
                                        <h2 class="mb-2 text-lg font-bold text-gray-600 uppercase dark:text-gray-400">
                                            Total orders</h2>
                                        <p class="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">110 </p>
                                        <p class="text-sm font-medium text-gray-400 dark:text-gray-400">Lorem ipsum dor amet
                                        </p>
                                    </div>
                                    <div class="flex-shrink">
                                        <a href="#" class="flex items-center px-8 py-4 text-gray-400 dark:text-gray-400 ">
                                            <span class="inline-block mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    class="w-10 h-10 dark:group-hover:text-gray-300 bi bi-basket"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-white rounded-lg shadow hover:shadow-xl dark:bg-gray-900">
                                <div class="flex flex-row items-center">
                                    <div class="flex-1 text-left md:text-left">
                                        <h2 class="mb-2 text-lg font-bold text-gray-600 uppercase dark:text-gray-400">
                                            Total Revenue</h2>
                                        <p class="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">569 </p>
                                        <p class="text-sm font-medium text-gray-400 dark:text-gray-400">Lorem ipsum dor amet
                                        </p>
                                    </div>
                                    <div class="flex-shrink">
                                        <a href="#" class="flex items-center px-8 py-4 text-gray-400 dark:text-gray-400 ">
                                            <span class="inline-block mr-3 dark:group-hover:text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    class="w-10 h-10" fill="currentColor"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-white rounded-lg shadow hover:shadow-xl dark:bg-gray-900">
                                <div class="flex flex-row items-center">
                                    <div class="flex-1 text-left md:text-left">
                                        <h2 class="mb-2 text-lg font-bold text-gray-600 uppercase dark:text-gray-400">
                                            Total Payment</h2>
                                        <p class="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">4567 </p>
                                        <p class="text-sm font-medium text-gray-400 dark:text-gray-400">Lorem ipsum dor amet
                                        </p>
                                    </div>
                                    <div class="flex-shrink">
                                        <a href="#" class="flex items-center px-8 py-4 text-gray-400 dark:text-gray-400 ">
                                            <span class="inline-block mr-3 dark:group-hover:text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-10 h-10 bi bi-cash" viewBox="0 0 16 16">
                                                    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                                    <path
                                                        d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-white rounded-lg shadow hover:shadow-xl dark:bg-gray-900">
                                <div class="flex flex-row items-center">
                                    <div class="flex-1 text-left md:text-left">
                                        <h2 class="mb-2 text-lg font-bold text-gray-600 uppercase dark:text-gray-400">
                                            Total Customers</h2>
                                        <p class="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">2310 </p>
                                        <p class="text-sm font-medium text-gray-400 dark:text-gray-400">Lorem ipsum dor amet
                                        </p>
                                    </div>
                                    <div class="flex-shrink">
                                        <a href="#" class="flex items-center px-8 py-4 text-gray-400 dark:text-gray-400 ">
                                            <span class="inline-block mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-10 h-10 bi bi-people" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="px-4 py-6">
                        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 ">
                            <div class="p-4 bg-white rounded-md shadow md:p-6 dark:bg-gray-900 ">
                                <h2 class="pb-4 text-xl font-bold border-b dark:border-gray-700 dark:text-gray-400">Task
                                    overview</h2>
                                <div class="px-4 py-3 text-xs font-medium">
                                    <div class="flex px-4 mb-3 text-gray-500 dark:text-gray-400">
                                        <h2 class="mr-auto">Task Name</h2>
                                        <h2>Action</h2>
                                    </div>
                                    <div class="flex justify-between p-4 mb-4 bg-gray-100 rounded dark:bg-gray-800">
                                        <div class="flex ">
                                            <span
                                                class="inline-flex items-center justify-center w-8 h-8 mr-2 text-orange-600 rounded dark:text-gray-400 dark:bg-gray-700 bg-orange-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                                </svg>
                                            </span>
                                            <div class="text-xs">
                                                <p class="font-medium dark:text-gray-400">Team members</p>
                                                <p class="text-gray-500 dark:text-gray-400">Meeting</p>
                                            </div>
                                        </div>
                                        <div class="flex">
                                            <button class="mr-2 text-orange-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>
                                            <button class="text-red-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd"
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>
                                    <div class="flex justify-between p-4 mb-4 bg-gray-100 rounded dark:bg-gray-800">
                                        <div class="flex">
                                            <span
                                                class="inline-flex items-center justify-center w-8 h-8 mr-2 text-orange-600 rounded dark:text-gray-400 dark:bg-gray-700 bg-orange-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    class="w-5 h-5 dark:group-hover:text-gray-300 bi bi-basket"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z">
                                                    </path>
                                                </svg>
                                            </span>
                                            <div class="text-xs">
                                                <p class="font-medium dark:text-gray-400"> Products</p>
                                                <p class="text-gray-500 dark:text-gray-400">household</p>
                                            </div>
                                        </div>
                                        <div class="flex">
                                            <button class="mr-2 text-orange-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>
                                            <button class="text-red-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd"
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex justify-between p-4 mb-4 bg-gray-100 rounded dark:bg-gray-800">
                                        <div class="flex">
                                            <span
                                                class="inline-flex items-center justify-center w-8 h-8 mr-2 text-orange-600 rounded dark:text-gray-400 dark:bg-gray-700 bg-orange-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-5 h-5 group-" viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z">
                                                    </path>
                                                    <path
                                                        d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z">
                                                    </path>
                                                </svg>
                                            </span>
                                            <div class="text-xs">
                                                <p class="font-medium dark:text-gray-400">Time</p>
                                                <p class="text-gray-500 dark:text-gray-400">3 hours</p>
                                            </div>
                                        </div>
                                        <div class="flex">
                                            <button class="mr-2 text-orange-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>
                                            <button class="text-red-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd"
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex justify-between p-4 mb-4 bg-gray-100 rounded dark:bg-gray-800">
                                        <div class="flex">
                                            <span
                                                class="inline-flex items-center justify-center w-8 h-8 mr-2 text-orange-600 rounded dark:text-gray-400 dark:bg-gray-700 bg-orange-50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="w-5 h-5 group-" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z">
                                                    </path>
                                                    <path
                                                        d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z">
                                                    </path>
                                                </svg>
                                            </span>
                                            <div class="text-xs">
                                                <p class="font-medium dark:text-gray-400">Documents</p>
                                                <p class="text-gray-500 dark:text-gray-400">pdf</p>
                                            </div>
                                        </div>
                                        <div class="flex">
                                            <button class="mr-2 text-orange-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fill-rule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </button>
                                            <button class="text-red-600 dark:text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fill-rule="evenodd"
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-white rounded-md shadow md:p-6 dark:bg-gray-900">
                                <h2 class="pb-2 mb-2 text-xl font-bold border-b dark:border-gray-700 dark:text-gray-400">
                                    Comments</h2>
                                <div class="flex flex-wrap mb-6">
                                    <div class="px-4 ">
                                        <img class="object-cover w-20 h-20 p-2 rounded-full"
                                            src="https://i.postimg.cc/RhQYkKYk/pexels-italo-melo-2379005.jpg" />
                                    </div>
                                    <div class="flex-grow px-4">
                                        <a href="#" class="text-black ">
                                            <span class="mr-2 text-lg font-medium dark:text-gray-400">Johnsena</span>
                                            <span class="font-normal text-gray-600 dark:text-gray-400">John@gmail.com</span>
                                        </a>
                                        <div class="flex items-center my-1 text-xs text-gray-600 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="w-3 h-3 mr-2" viewBox="0 0 16 16">
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z">
                                                </path>
                                                <path
                                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z">
                                                </path>
                                            </svg>
                                            <span>2 hours ago</span>
                                        </div>
                                        <div class="py-4 text-gray-600 dark:text-gray-400">
                                            Lorem ipsum dor amet
                                        </div>
                                        <div class="flex pt-2 text-sm border-t dark:border-gray-700">
                                            <a href="#"
                                                class="flex items-center px-4 py-2 text-black no-underline dark:text-gray-400 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                                </svg>
                                                <span class="ml-2">Like</span>
                                            </a>
                                            <a href="#"
                                                class="flex items-center px-4 py-2 text-black no-underline dark:text-gray-400 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                                </svg>
                                                <span class="ml-2">Reply</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-wrap ">
                                    <div class="px-4 ">
                                        <img class="object-cover w-20 h-20 p-2 rounded-full"
                                            src="https://i.postimg.cc/RhQYkKYk/pexels-italo-melo-2379005.jpg" />
                                    </div>
                                    <div class="flex-grow px-4">
                                        <a href="#" class="text-black ">
                                            <span class="mr-2 text-lg font-medium dark:text-gray-400">Johnsena</span>
                                            <span class="font-normal text-gray-600 dark:text-gray-400">John@gmail.com</span>
                                        </a>
                                        <div class="flex items-center my-1 text-xs text-gray-600 dark:text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="w-3 h-3 mr-2" viewBox="0 0 16 16">
                                                <path
                                                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z">
                                                </path>
                                                <path
                                                    d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z">
                                                </path>
                                            </svg>
                                            <span>2 hours ago</span>
                                        </div>
                                        <div class="py-4 text-gray-600 dark:text-gray-400">
                                            Lorem ipsum dor amet
                                        </div>
                                        <div class="flex pt-2 text-sm border-t dark:border-gray-700">
                                            <a href="#"
                                                class="flex items-center px-4 py-2 text-black no-underline dark:text-gray-400 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                                </svg>
                                                <span class="ml-2">Like</span>
                                            </a>
                                            <a href="#"
                                                class="flex items-center px-4 py-2 text-black no-underline dark:text-gray-400 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                                    <path
                                                        d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                                </svg>
                                                <span class="ml-2">Reply</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-4 bg-white rounded-md shadow md:p-6 dark:bg-gray-900">
                                <h2 class="pb-2 mb-2 text-xl font-bold border-b dark:border-gray-700 dark:text-gray-400">
                                    Notice</h2>
                                <div class="flex flex-wrap justify-between mb-4">
                                    <div>
                                        <p class="font-bold dark:text-gray-400">
                                            Lorem ipsum dor amet set ispicusas
                                        </p>
                                        <p class="text-sm text-gray-400"> Today 10:01pm </p>
                                    </div>
                                    <p class="text-sm text-gray-400">1h ago</p>
                                </div>
                                <div class="flex flex-wrap justify-between mb-4">
                                    <div>
                                        <p class="font-bold dark:text-gray-400">
                                            Lorem ipsum dor amet set ispicusas
                                        </p>
                                        <p class="text-sm text-gray-400"> Today 7:31pm </p>
                                    </div>
                                    <p class="text-sm text-gray-400">20m ago</p>
                                </div>
                                <div class="flex flex-wrap justify-between mb-4">
                                    <div>
                                        <p class="font-bold dark:text-gray-400">
                                            Lorem ipsum dor amet set ispicusas
                                        </p>
                                        <p class="text-sm text-gray-400"> Today 7:31pm </p>
                                    </div>
                                    <p class="text-sm text-gray-400">1h ago</p>
                                </div>
                                <div class="flex flex-wrap justify-between mb-4">
                                    <div>
                                        <p class="font-bold dark:text-gray-400">
                                            Lorem ipsum dor amet set ispicusas
                                        </p>
                                        <p class="text-sm text-gray-400"> Today 7:31pm </p>
                                    </div>
                                    <p class="text-sm text-gray-400">2h ago</p>
                                </div>
                                <div class="flex flex-wrap justify-between mb-4">
                                    <div>
                                        <p class="font-bold dark:text-gray-400">
                                            Lorem ipsum dor amet set ispicusas
                                        </p>
                                        <p class="text-sm text-gray-400"> Today 7:31am </p>
                                    </div>
                                    <p class="text-sm text-gray-400">5h ago</p>
                                </div>
                                <div class="flex flex-wrap justify-between mb-4">
                                    <div>
                                        <p class="font-bold dark:text-gray-400">
                                            Lorem ipsum dor amet set ispicusas
                                        </p>
                                        <p class="text-sm text-gray-400"> Today 7:2pm </p>
                                    </div>
                                    <p class="text-sm text-gray-400">4h ago</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>);
};
