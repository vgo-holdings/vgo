"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, hrNavOptions, navOptions, sellerNavOptions } from "@/utils";
import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal";
import logo from "./vgo 1.png";
import Image from "next/image";

function NavItems({ isModalView = false, isAdminView, router, isSellerView, isHrView }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : isSellerView
          ? sellerNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : isHrView
          ? hrNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
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

  const isAdminView = pathName.includes("admin-view");
  const isSellerView = pathName.includes("seller-view");
  const isHrView = pathName.includes("hr-view");
  const isMobileView = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isTabletView = typeof window !== 'undefined' && window.innerWidth <= 1038;

  return (
    <>
      <nav
        className="bg-white fixed flex-row justify-between z-20 top-0 left-0 border-b border-gray-200"
        style={{ width: "100%", fontSize: "20px" }}
      >
        <div
          className="w-full flex flex-row items-center justify-between px-2 md:px-10 shadow-md"
          style={{ width: "100vw" }}
        >
          <div
            onClick={() => router.push("/")}
            className="items-center w-21 h-21 cursor-pointer"
          >
            <Image
              src={logo}
              alt="User 1"
              className="ml-2 h-16 w-16 md:h-28 md:w-28 object-cover transform scale-100"
            />
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && !isSellerView && isAuthUser ? (
              <Fragment>
                <button
                  className={
                    "flex flex-row border-orange-600 py-2 text-sm md:text-xl font-medium upprcase tracking-wide text-white p-1 mt-1 md:pl-5 md:pr-5 shadow-xl rounded-md"
                  }
                  onClick={() => router.push("/account")}
                >
                  {user?.imageURL ? (
                    <Image
                      src={user?.imageURL}
                      alt="User 1"
                      height={isMobileView ? 30 : isTabletView ? 35 : 50}
                      width={isMobileView ? 30 : isTabletView ? 35 : 50}
                      style={{
                        objectFit: "fill",
                        borderRadius: "100%",
                        border: "1px solid #e84118",
                      }}
                    />
                  ) : (
                    <i className="fa fa-user-circle"></i>
                  )}
                  <span className="hidden md:inline font-bold text-black p-4">{user.name}</span>
                </button>
                <button
                  className={
                    "mt-1.5 inline-block rounded-full border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-white"
                  }
                  style={{
                    backgroundColor: "#e84118",
                    borderRadius: "8px",
                    borderColor: "#e84118",
                  }}
                  onClick={() => setShowCartModal(true)}
                >
                  <i className="fa fa-shopping-cart"></i><span className="hidden md:inline">Cart</span>
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <button
                  className={
                    "mt-1.5 inline-block  border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-white"
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
                    "mt-1.5 inline-block  border-orange-600 px-3 md:px-5  py-2 text-xl font-medium upprcase tracking-wide text-white"
                  }
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: "8px",
                    borderColor: "#e84118",
                  }}
                >
                  Admin View
                </button>
              )
            ) : user?.role === "hr" ? (
              isSellerView ? (
                <button
                  className={
                    "mt-1.5 inline-block  border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-white"
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
                    "mt-1.5 inline-block  border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-white"
                  }
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: "8px",
                    borderColor: "#e84118",
                  }}
                >
                  Hr View
                </button>
              )
            ) : user?.role === "freelancer" || user?.role === "member" || user?.role === "rookie" ? (
              isSellerView ? (
                <button
                  className={
                    "mt-1.5 inline-block  border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-white"
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
                  onClick={() => router.push("/seller-view")}
                  className={
                    "mt-1.5 inline-block  border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-white"
                  }
                  style={{
                    backgroundColor: "#000000",
                    borderRadius: "8px",
                    borderColor: "#e84118",
                  }}
                >
                  <i className="fa fa-user-secret"></i>
                  <span className="hidden md:inline">Seller View</span>
                </button>
              )
            ): null}
            {isAuthUser ? (
              <button
                onClick={handleLogout}
                className={
                  "mt-1.5 inline-block  border px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide"
                }
                style={{
                  backgroundColor: "#ffffff",
                  color: "#e84118",
                  borderRadius: "8px",
                  borderColor: "#e84118",
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                <span className="hidden md:inline">Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className={
                  "mt-1.5 inline-block  border-orange-600 px-3 md:px-5 py-2 text-xl font-medium upprcase tracking-wide text-white"
                }
                style={{
                  backgroundColor: "#e84118",
                  borderRadius: "8px",
                  borderColor: "#e84118",
                }}
              >
                Sign In
              </button>
            )}
            {!isAuthUser ? (
              <button
                onClick={() => router.push("/register/customer-register")}
                className={
                  "mt-1.5 inline-block   border px-5  py-2 text-xl font-medium upprcase tracking-wide"
                }
                style={{
                  backgroundColor: "#ffffff",
                  color: "#e84118",
                  borderRadius: "8px",
                  borderColor: "#e84118",
                }}
              >
                Sign Up
              </button>
            ) : null}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center  py-2 text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} isSellerView={isSellerView} isHrView={isHrView} />
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
        mainContent={
          <NavItems
            router={router}
            isModalView={true}
            isAdminView={isAdminView}
            isSellerView={isSellerView}
            isHrView={isHrView}
          />
        }
        show={showNavModal}
        setShow={setShowNavModal}
      />
      {showCartModal && <CartModal />}
    </>
  );
}
