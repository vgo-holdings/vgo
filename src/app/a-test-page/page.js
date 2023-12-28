'use client'
import React, { useContext, useEffect, useState } from "react";
import logo from "../../components/Navbar/vgo 1.png";
import Image from "next/image";

export default function page() {
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
                            <p class="text-mb p-3 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
                                Shopping Mall description
                            </p>
                            <p class="text-mb p-3 ml-1 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
                                Online Shop description
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