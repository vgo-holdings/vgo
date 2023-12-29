'use client'
import React, { useContext, useEffect, useState } from "react";
import logo from "../../components/Navbar/vgo 1.png";
import Image from "next/image";
import bannerIMage from "../../assets/images/assets/img2.png";
import "../../components/CommonListing/page-style.css"
export default function page() {
    const [showFilters, setShowFilters] = useState(true);

    function filtermenu() {
        console.log("🚀 ~ file: page.js:15 ~ filtermenu ~ setShowFilters:", showFilters)
        setShowFilters(!showFilters);
    }
    console.log("🚀 ~ file: page.js:15 ~ filtermenu ~ setShowFilters:", showFilters)
    // return (
    //     <div className="shop-mainContainer">
    //         <div className="shop-banner">
    //             <p style={{ marginBottom: "auto", marginTop: "auto" }}>
    //                 <span style={{ color: "#e84118" }}>Shopping</span> the way you like it
    //             </p>
    //             <Image
    //                 src={bannerIMage}
    //                 className="shop-bannerImage"
    //                 alt="shop-banner"
    //                 width={500}
    //                 height={500}
    //             />
    //         </div>

    //         <div class="w-full lg:w-[92%] shadow p-5 rounded-lg bg-white">
    //             <div class="relative">
    //                 <div class="absolute flex items-center ml-2 h-full">
    //                     <svg class="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    //                         <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
    //                     </svg>
    //                 </div>

    //                 <input type="text" placeholder="Search by listing, location, bedroom number..." class="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" />
    //             </div>

    //             <div class="flex items-center justify-between mt-4">
    //                 <p class="font-medium">
    //                     Filters
    //                 </p>
    //                 <div>
    //                     <button class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md">
    //                         Reset Filter
    //                     </button>
    //                     <button class="ml-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md" onClick={filtermenu}>
    //                         {
    //                             showFilters ? ("Hide Filter") : ("Show Filter")
    //                         }
    //                     </button>
    //                 </div>
    //             </div>
    //             {
    //                 showFilters &&
    //                 <div>
    //                     <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
    //                         <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
    //                             <option value="">Any Price</option>
    //                             <option value="price1">LKR 0 - LKR 10,000</option>
    //                             <option value="price2">LKR 10,000 - LKR 20,000</option>
    //                             <option value="price3">LKR 20,000 - LKR 50,000</option>
    //                             <option value="price4">LKR 50,000 +</option>
    //                         </select>

    //                         <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
    //                             <option value="">Location</option>
    //                             <option value="Colombo">Colombo</option>
    //                             <option value="Kandy">Kandy</option>
    //                             <option value="Galle">Galle</option>
    //                             <option value="Matara">Matara</option>
    //                             <option value="Anuradhapura">Anuradhapura</option>
    //                             <option value="Polonnaruwa">Polonnaruwa</option>
    //                             <option value="Badulla">Badulla</option>
    //                             <option value="Ratnapura">Ratnapura</option>
    //                             <option value="Kegale">Kegale</option>
    //                             <option value="Kurunegala">Kurunegala</option>
    //                             <option value="Puttalam">Puttalam</option>
    //                             <option value="Trincomalee">Trincomalee</option>
    //                             <option value="Jaffna">Jaffna</option>
    //                             <option value="Kilinochchi">Kilinochchi</option>
    //                             <option value="Mannar">Mannar</option>
    //                             <option value="Mullaitivu">Mullaitivu</option>
    //                             <option value="Vavuniya">Vavuniya</option>
    //                             <option value="Gampaha">Gampaha</option>
    //                             <option value="Kalutara">Kalutara</option>
    //                             <option value="Matale">Matale</option>
    //                             <option value="Nuwara Eliya">Nuwara Eliya</option>
    //                             <option value="Monaragala">Monaragala</option>
    //                             <option value="Hambanthota">Hambanthota</option>
    //                             <option value="Rathnapura">Rathnapura</option>
    //                             <option value="Batticaloa">Batticaloa</option>
    //                         </select>

    //                         <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm">
    //                             <option value="">Category</option>

    //                         </select>
    //                     </div>
    //                 </div>
    //             }

    //         </div>
    //         <section class="py-10 lg:w-[92%] bg-gray-100 mt-5 ">
    //             <div class="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
    //                             {/* <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                 </svg>

    //                                 <button class="text-sm">Add to cart</button>
    //                             </div> */}
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">Adobe Photoshop CC 2022</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>
    //                             <div class="flex gap-1 text-orange-400 mt-1">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    //                                 </svg>
    //                             </div>

    //                             <div class="flex">
    //                                 <div class="w-1/2 px-5 pb-3">
    //                                     <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
    //                                         $299.99
    //                                     </p>
    //                                     <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
    //                                 </div>
    //                                 <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
    //                                     Add To Cart
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>
    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
    //                             <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
    //                                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    //                                 </svg>
    //                                 <span class="ml-1 text-sm text-slate-400">4.9</span>
    //                             </div>
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

    //                             <div class="mt-3 flex items-end justify-between">
    //                                 <p class="text-lg font-bold text-blue-500">$850</p>


    //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                     </svg>

    //                                     <button class="text-sm">Add to cart</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>

    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
    //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                 </svg>

    //                                 <button class="text-sm">Add to cart</button>
    //                             </div>
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

    //                             <div class="mt-3 flex items-end justify-between">
    //                                 <p class="text-lg font-bold text-blue-500">$450</p>
    //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                     </svg>

    //                                     <button class="text-sm">Add to cart</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>

    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
    //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                 </svg>

    //                                 <button class="text-sm">Add to cart</button>
    //                             </div>
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

    //                             <div class="mt-3 flex items-end justify-between">
    //                                 <p class="text-lg font-bold text-blue-500">$450</p>
    //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                     </svg>

    //                                     <button class="text-sm">Add to cart</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>
    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" alt="Hotel Photo" />
    //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                 </svg>

    //                                 <button class="text-sm">Add to cart</button>
    //                             </div>
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

    //                             <div class="mt-3 flex items-end justify-between">
    //                                 <p class="text-lg font-bold text-blue-500">$450</p>
    //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                     </svg>

    //                                     <button class="text-sm">Add to cart</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>
    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80" alt="Hotel Photo" />
    //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                 </svg>

    //                                 <button class="text-sm">Add to cart</button>
    //                             </div>
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

    //                             <div class="mt-3 flex items-end justify-between">
    //                                 <p class="text-lg font-bold text-blue-500">$450</p>

    //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                     </svg>

    //                                     <button class="text-sm">Add to cart</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>
    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="Hotel Photo" />
    //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                 </svg>

    //                                 <button class="text-sm">Add to cart</button>
    //                             </div>
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

    //                             <div class="mt-3 flex items-end justify-between">
    //                                 <p class="text-lg font-bold text-blue-500">$450</p>

    //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                     </svg>

    //                                     <button class="text-sm">Add to cart</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>
    //                 <article class="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
    //                     <a href="#">
    //                         <div class="relative flex items-end overflow-hidden rounded-xl">
    //                             <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80" alt="Hotel Photo" />
    //                             <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                     <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                 </svg>

    //                                 <button class="text-sm">Add to cart</button>
    //                             </div>
    //                         </div>

    //                         <div class="mt-1 p-2">
    //                             <h2 class="text-slate-700">The Hilton Hotel</h2>
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

    //                             <div class="mt-3 flex items-end justify-between">
    //                                 <p class="text-lg font-bold text-blue-500">$450</p>

    //                                 <div class="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
    //                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
    //                                         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    //                                     </svg>

    //                                     <button class="text-sm">Add to cart</button>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </a>
    //                 </article>
    //             </div>
    //         </section>
    //         <section class="flex items-center py-20 bg-gray-100 lg:h-screen dark:bg-gray-800">
    //             <div class="px-4 mx-auto max-w-7xl">
    //                 <div class="grid grid-cols-1 gap-4 lg:gap-6 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
    //                     <div class="relative overflow-hidden bg-white rounded-xl dark:bg-gray-700 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300">
    //                         <div class="relative overflow-hidden p-5">
    //                             <div class="mb-5 overflow-hidden ">
    //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/XqBnTJBL/pink-sweater-front.jpg" alt="" />
    //                             </div>
    //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
    //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
    //                                 </svg>
    //                             </button>
    //                         </div>
    //                         <a>
    //                             <h3 class="px-5 mb-1 text-lg font-bold dark:text-white"> Pink Tshirt With Braided
    //                                 Sweater Pattern </h3>
    //                         </a>
    //                         <div class="px-5 p-2">
    //                             <p class="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>
    //                             <div class="flex gap-1 text-orange-400 mt-1">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star-fill" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    //                                 </svg>
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    //                                     class="bi bi-star" viewBox="0 0 16 16">
    //                                     <path
    //                                         d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
    //                                 </svg>
    //                             </div>
    //                         </div>
    //                         <div class="flex">
    //                             <div class="w-1/2 px-5 pb-3">
    //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
    //                                     $299.99
    //                                 </p>
    //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
    //                             </div>
    //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
    //                                 Add To Cart
    //                             </button>
    //                         </div>
    //                     </div>
                        
    //                     <div class="relative overflow-hidden bg-white shadow rounded-xl dark:bg-gray-700">
    //                         <div class="relative overflow-hidden">
    //                             <div class="mb-5 overflow-hidden">
    //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/sgKB6VR6/ryan-plomp-a-Ctb-RTwu-M-unsplash-1.jpg" alt="" />
    //                             </div>
    //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
    //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
    //                                 </svg>
    //                             </button>
    //                         </div>
    //                         <a>
    //                             <h3 class="px-5 mb-4 text-lg font-bold dark:text-white"> Nike Shoes With Extending Shoe Laces
    //                             </h3>
    //                         </a>
    //                         <div class="flex">
    //                             <div class="w-1/2 px-5 pb-3">
    //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
    //                                     $299.99
    //                                 </p>
    //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
    //                             </div>
    //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
    //                                 Add To Cart
    //                             </button>
    //                         </div>
    //                     </div>
    //                     <div class="relative overflow-hidden bg-white shadow rounded-xl dark:bg-gray-700">
    //                         <div class="relative overflow-hidden">
    //                             <div class="mb-5 overflow-hidden">
    //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/x8LtrkfV/kenny-eliason-HIz-Gn9-FZDFU-unsplash.jpg" alt="" />
    //                             </div>
    //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
    //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
    //                                 </svg>
    //                             </button>
    //                         </div>
    //                         <a>
    //                             <h3 class="px-5 mb-4 text-lg font-bold dark:text-white"> Nikon Kodak Lense With Extra Zoom
    //                             </h3>
    //                         </a>
    //                         <div class="flex">
    //                             <div class="w-1/2 px-5 pb-3">
    //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
    //                                     $299.99
    //                                 </p>
    //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
    //                             </div>
    //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
    //                                 Add To Cart
    //                             </button>
    //                         </div>
    //                     </div>
    //                     <div class="relative overflow-hidden bg-white shadow rounded-xl dark:bg-gray-700">
    //                         <div class="relative overflow-hidden">
    //                             <div class="mb-5 overflow-hidden">
    //                                 <img class="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110" src="https://i.postimg.cc/K8qmN64m/pexels-javon-swaby-2783873.jpg" alt="" />
    //                             </div>
    //                             <button class="absolute top-0 left-0 p-3 bg-orange-500 rounded-l-none hover:bg-orange-600 rounded-b-xl">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="text-white" viewBox="0 0 16 16">
    //                                     <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"></path>
    //                                 </svg>
    //                             </button>
    //                         </div>
    //                         <a>
    //                             <h3 class="px-5 mb-4 text-lg font-bold dark:text-white"> 24 Carat Pure Silver Classic Watch
    //                             </h3>
    //                         </a>
    //                         <div class="flex">
    //                             <div class="w-1/2 px-5 pb-3">
    //                                 <p class="text-lg font-bold text-orange-500 dark:text-orange-300">
    //                                     $299.99
    //                                 </p>
    //                                 <span class="block -mt-1 text-xs font-semibold text-gray-400 line-through">$399.99</span>
    //                             </div>
    //                             <button class="flex-1 text-sm text-white transition-all bg-orange-500 rounded-r-none hover:bg-orange-600 rounded-t-xl">
    //                                 Add To Cart
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </section>
    //     </div>
    // );
    // account pop up 
    return (
        <div class="rounded absolute top-0 left-0 flex items-center justify-center w-full h-full "
            // onClick={closeMsg}
            style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
            x-show="open">
            <div class=" h-auto p-4 mx-2 text-left bg-white rounded-3xl shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
            >
                <div class="flex justify-center mb-4">
                    <button
                        // onClick={closeMsg}
                        class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 fill-myOrange">
                            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                        </svg> */}
                        <Image
                            src={logo}
                            alt="User 1"
                            className="ml-2 h-16 w-16 md:h-16 md:w-16 object-cover transform scale-100"
                        />
                    </button>
                </div>
                <div class="mb-4 text-center">
                    <h2 class="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
                        HI - Krishan
                    </h2>
                    <div class="mt-4 ">
                        <p class="text-lg leading-5 text-gray-500 dark:text-gray-400">
                            Please Select Your <a href="#" class="text-myOrange font-bold">Package!</a>
                            {/* Please select your package! Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a> */}
                        </p>
                        <div className="flex mt-2">
                            <p class="text-mb p-3 w-1/2 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
                            A shopping mall is a single location for several (six) types of your business
                            </p>
                            <p class="text-mb p-3 ml-1 leading-5 text-gray-500 w-1/2 dark:text-gray-400 border rounded-2xl">
                            An Store is just space for your main business only 
                            </p>
                        </div>

                    </div>
                </div>
                <span class="justify-center  gap-3 rounded-md shadow-sm flex text-xs">
                    <button
                        style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                        class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                    // onClick={goToLogin}
                    >
                        Select Shopping Mall
                    </button>
                    <button
                        style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                        class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                    // onClick={goToLogin}
                    >
                        Select Online Shop
                    </button>
                </span>
                <div class="mt-4 flex items-center justify-center">
                <p class="text-xs lg:text-sm leading-5 text-gray-500 dark:text-gray-400">
                    Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a>
                </p>
                </div>
            </div>
        </div >
    );
};