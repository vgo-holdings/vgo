"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, hrNavOptions, navOptions, sellerNavOptions } from "@/utils";
import { Fragment, useContext, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import logo from "./vgo 1.png";
import Image from "next/image";
import imagePlaceHolder from "@/assets/images/propic.png";

function NavItemsSide({ isModalView = false, isAdminView, router, isSellerView, isHrView ,testFun ,userData}) {
  return (
    <ul
      className={`px-4 text-left mt-7"
          }`}
    >
      {isAdminView
        ? adminNavOptions.map((item) => (
          <li
            className="pb-2 pt-2  text-lg text-black dark:text-white font-semibold hover:text-myOrange cursor-pointer"
            key={item.id}
            onClick={() => router.push(item.path)}
          >
            {item.label}
          </li>
        ))
        : null}
      {
        isSellerView
          ? sellerNavOptions.map((item) => (
            <li
              className="pb-2 pt-2 text-lg text-black dark:text-white font-semibold hover:text-myOrange cursor-pointer"
              key={item.id}
              onClick={() => item.id == "sellerListing" ? router.push(`/seller-view/${userData?._id}`) : router.push(item.path)}
            >
              {item.label}
            </li>
          ))
          : null}
      {
        isHrView
          ? hrNavOptions.map((item) => (
            <li
              className="pb-2 pt-2  text-lg text-black dark:text-white font-semibold hover:text-myOrange cursor-pointer"
              key={item.id}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </li>
          ))
          : null}
      
      {!isHrView && !isSellerView && !isAdminView ?
        navOptions.map((item) => (
          <li
            className="pb-2 pt-2 text-lg text-black dark:text-white font-semibold hover:text-myOrange cursor-pointer"
            key={item.id}
            // onClick={() => router.push(item.path)}
            onClick={() => {
              testFun();
              router.push(item.path);
            }}
          >
            {item.label}
          </li>
        )) : null
      }
    </ul>

  );
}

function NavItems({ isModalView = false, isAdminView, router, isSellerView, isHrView ,userData}) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"
        }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${isModalView ? "border-none" : "border border-gray-100"
          }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
            <li
              className="text-lg text-black font-semibold hover:text-myOrange cursor-pointer"
              key={item.id}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </li>
          ))
          : null}
        {isSellerView
          ? sellerNavOptions.map((item) => (
            <li
              className="text-lg text-black font-semibold hover:text-myOrange cursor-pointer"
              key={item.id}
              onClick={() => item.id == "sellerListing" ? router.push(`/seller-view/${userData?._id}`) : router.push(item.path)}
            >
              {item.label}
            </li>
          ))
          : null}
        {
          isHrView
            ? hrNavOptions.map((item) => (
              <li
                className="text-lg text-black font-semibold hover:text-myOrange cursor-pointer"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
            : null
        }
        {!isHrView && !isSellerView && !isAdminView ?
          navOptions.map((item) => (
            <li
              className="text-lg text-black font-semibold hover:text-myOrange cursor-pointer"
              key={item.id}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </li>
          )) : null
        }
      </ul>
    </div>
  );
}

export default function Navbar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setIsAuthUser,
    setUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);

  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (
      pathName !== "/seller-view/add-product" &&
      currentUpdatedProduct !== null
    )
      setCurrentUpdatedProduct(null);
  }, [pathName]);

  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  }

  const [showNav, setShowNav] = useState(false);

  function onNavBar() {
    setShowNav(true)
  }

  function testFun() {
    setShowNav(false)
  }

  const isAdminView = pathName.includes("admin-view");
  const isSellerView = pathName.includes("seller-view");
  const isHrView = pathName.includes("hr-view");
  const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isTabletView = typeof window !== 'undefined' && window.innerWidth <= 1038;

  return (
    <>
      <section className="shadow-lg font-poppins dark:bg-white">

        <div className="max-w-6xl px-4 mx-auto" x-data="{open:false}">

          <div className="relative flex items-center justify-between py-4">

            <a href="/" className="text-3xl font-semibold leading-none dark:text-gray-400">
              <Image
                src={logo}
                alt="User 1"
                className="ml-2 h-16 w-16 md:h-16 md:w-16 object-cover transform scale-100"
              />
            </a>

            <NavItems router={router} isAdminView={isAdminView} isSellerView={isSellerView} isHrView={isHrView} userData={user} />

            <div className=" flex items-center justify-around ">
              {!isAdminView && !isSellerView && isAuthUser ? (
                <div className=" flex items-center justify-around ">

                  <div className="flex -space-x-2 rtl:space-x-reverse items-center cursor-pointer" onClick={() => router.push("/account")}>
                    <img className="w-12 h-12 lg:w-16 lg:h-16 border-2 border-myOrange rounded-full dark:border-myOrange" src={user?.imageURL === undefined ? imagePlaceHolder : user?.imageURL} alt="" />
                    <a onClick={() => router.push("/account")} className="px-3 font-bold rounded-full flex items-center justify-center w-auto h-8 text-sm lg:h-10 lg:text-lg   text-white bg-myOrange border-2 border-white  hover:bg-gray-600" href="#">{user?.name}</a>
                  </div>

                  <button
                    className={
                      " border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-myOrange"
                    }
                    style={{
                      // backgroundColor: "#e84118",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                    onClick={() => setShowCartModal(true)}
                  >
                    <i className="fa fa-shopping-cart"></i>
                  </button>

                  <div className="lg:hidden">

                    <button
                      onClick={onNavBar}
                      className="flex items-center px-3 py-2 text-myOrange border border-myOrange rounded dark:text-myOrange navbar-burger hover:text-orange-200 hover:orange-200 lg:hidden"

                    >

                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"

                        className="bi bi-list" viewBox="0 0 16 16">

                        <path fillRule="evenodd"

                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />

                      </svg>

                    </button>

                  </div>
                </div>
              ) :
                <>

                  <div className="lg:hidden">

                    <button
                      onClick={onNavBar}
                      className="flex items-center px-3 py-2 text-myOrange border border-myOrange rounded dark:text-myOrange navbar-burger hover:text-orange-200 hover:orange-200 lg:hidden"

                    >

                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"

                        className="bi bi-list" viewBox="0 0 16 16">

                        <path fillRule="evenodd"

                          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />

                      </svg>

                    </button>

                  </div>
                </>
              }


              {/* check this im here */}
              {user?.role === "admin" ? (
                isAdminView ? (
                  <button
                    className={
                      "inline-block px-4 py-3 mr-2 text-xs font-semibold leading-none text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                    onClick={() => router.push("/")}
                  >
                    Client View
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/admin-view")}
                    className={
                      "inline-block px-4 py-3 mr-2 text-xs font-semibold leading-none text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                  >
                    <i className="fa fa-user-secret"></i>
                    <span className="hidden md:inline">Admin View</span>
                  </button>
                )
              ) : user?.role === "hr" ? (
                isSellerView ? (
                  <button
                    className={
                      "inline-block px-4 py-3 mr-2 text-xs font-semibold leading-none text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                    onClick={() => router.push("/")}
                  >
                    Client View
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/hr-view")}
                    className={
                      "inline-block px-4 py-3 mr-2 text-xs font-semibold leading-none text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                  >
                    <i className="fa fa-user-secret"></i>
                    <span className="hidden md:inline">Hr View</span>
                  </button>
                )
              ) : user?.role === "freelancer" || user?.role === "member" || user?.role === "rookie" ? (
                isSellerView ? (
                  <button
                    className={
                      "hidden lg:block px-4 py-3 mr-2 text-xs font-semibold leading-none text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      // backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                    onClick={() => router.push("/")}
                  >
                    Client View
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/seller-view")}
                    className={
                      "hidden lg:block px-4 py-3 mr-2 text-xs font-semibold leading-none text-center text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      // backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                  >
                    <i className="fa fa-user-secret"></i>
                    <span className="hidden md:inline">Seller View</span>
                  </button>
                )
              ) : null}
              {isAuthUser ? (
                <a onClick={handleLogout}

                  className="hidden lg:inline-block px-1 py-2 lg:px-4 lg:py-3  mr-2 text-xs font-semibold leading-none text-orange-200 bg-myOrange border border-orange-300 rounded  hover:bg-orange-700">Sign

                  Out

                </a>
              ) :
                <>
                  <div className="hidden lg:block">

                    <a href="/login"

                      className="inline-block px-4 py-3 mr-2 text-xs font-semibold leading-none text-myOrange border border-myOrange rounded dark:hover:border-orange-300 dark:hover:text-orange-700 dark:text-myOrange dark:border-myOrange hover:text-orange-700 hover:border-orange-300">Log

                      In</a>

                    <a href="/register/customer-register"

                      className="inline-block px-4 py-3 mr-2 text-xs font-semibold leading-none text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700">Sign

                      Up

                    </a>

                  </div>
                </>
              }

              {/* check this end */}
            </div>

          </div>

          {/* <!-- Mobile Sidebar --> */}
          {showNav &&
            <div onClick={testFun}
              className="fixed inset-0 w-full bg-gray-900 opacity-25 dark:bg-gray-400 lg:hidden"

            >

            </div>
          }
          {showNav &&
            <div className="absolute inset-0 z-10 h-screen p-3 text-gray-400 duration-500 transform bg-blue-50 dark:bg-gray-800 w-80 lg:hidden lg:transform-none lg:relative"

            >

              <div className="flex justify-between lg:">

                <a href="/" className="text-3xl font-semibold leading-none dark:text-gray-400">
                  <Image
                    src={logo}
                    alt="User 1"
                    className="ml-2 h-16 w-16 md:h-16 md:w-16 object-cover transform scale-100"
                  />
                </a>

                <button onClick={testFun}
                  className="p-2 text-gray-700 rounded-md dark:text-gray-400 hover:text-blue-300 lg:hidden "

                >

                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"

                    className="bi bi-x-circle" viewBox="0 0 16 16">

                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />

                    <path

                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />

                  </svg>

                </button>

              </div >

              <NavItemsSide router={router} isAdminView={isAdminView} isSellerView={isSellerView} isHrView={isHrView} testFun={testFun} userData={user}/>

              {user?.role === "freelancer" || user?.role === "member" || user?.role === "rookie" ? (
                isSellerView ? (
                  <button
                    className={
                      "inline-block w-full px-4 py-3 mr-2 text-xs font-semibold leading-none text-center text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      // backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                    onClick={() => router.push("/")}
                  >
                    Client View
                  </button>
                ) :
                  <button
                    onClick={() => router.push("/seller-view")}
                    className={
                      "inline-block w-full px-4 py-3 mr-2 text-xs font-semibold leading-none text-center text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700"
                    }
                    style={{
                      // backgroundColor: "#000000",
                      borderRadius: "8px",
                      borderColor: "#e84118",
                    }}
                  >
                    <i className="fa fa-user-secret"></i>
                    <span className="pl-3 md:inline text-white">Seller View</span>
                  </button>
              ) :
                null
              }
              {isAuthUser ? (
                <div className="block mt-5 lg:hidden">

                  <a onClick={handleLogout}

                    className="inline-block w-full px-4 py-3 mr-2 text-xs font-semibold leading-none text-center text-white bg-myOrange border border-orange-300 rounded  hover:bg-orange-700">Sign

                    Out

                  </a>

                </div>
              ) : <div className="block mt-5 lg:hidden">

                <a href="/login"

                  className="inline-block w-full px-4 py-3 mb-4 mr-2 text-xs font-semibold leading-none text-center text-myOrange border border-myOrange rounded dark:hover:border-orange-300 dark:hover:text-orange-700 dark:text-myOrange dark:border-myOrange hover:text-orange-700 hover:border-orange-300">Log

                  In</a>

                <a href="/register/customer-register"

                  className="inline-block w-full px-4 py-3 mr-2 text-xs font-semibold leading-none text-center text-orange-200 bg-myOrange border border-orange-300 rounded  hover:bg-orange-700">Sign

                  Up

                </a>

              </div>}

            </div >
          }
        </div >

      </section >
      
    </>
  );
}
