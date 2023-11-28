"use client";

import { GlobalContext } from "@/context";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import Notification from "../Notification";
import './style.css';
export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

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
    <section className="product-container"  >  
    <div className="product-containerLeft ">
              <div className="product-displayImageContainer">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item?.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="product-displaySubImageContaine"> 
                  <button
                    type="button"
                    className=" flex-0 aspect-square mb-3 h-20 overflow-hidden  border-2 border-gray-100 text-center product-displaySubImage"
                  >
                    <img
                      src={item?.imageUrl}
                      className="h-full w-full object-contain"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden   border-2 border-gray-100 text-center product-displaySubImage"
                  >
                    <img
                      src={item?.imageUrl}
                      className="h-full w-full object-contain"
                      alt="Product Details"
                    />
                  </button> 
            </div>
          </div>
          <div className="product-containerRight">
            <h1 className="text-2xl font-bold text-gray-900">
              {item && item?.name}
            </h1>
            <div className="mt-10  mr-2 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
              {item?.onSale === "yes" ? (
                  <h1 className="text-3xl font-bold space-x-4" style={{color:'#e84218'}}>{`LKR${(
                    item?.price -
                    item?.price * (item?.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
                
                <h1
                  className={`text-3xl ml-4 font-bold text-gray-500 ${
                    item?.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  LKR{item && item?.price}
                </h1>
                
              </div>
             
            </div>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {item && item?.deliveryInfo}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {"Cancel anytime"}
              </li>
            </ul>
            <button
                type="button"
                onClick={() => handleAddToCart(item)}
                className="mt-20 mb-`10 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white"
              >
                {componentLevelLoader && componentLevelLoader.loading ? (
                  <ComponentLevelLoader
                    text={"Adding to Cart"}
                    color={"#ffffff"}
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  <>
                   Add to Cart
                  </>
                )}
              </button>
            <div className="lg:col-span-3">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <a
                    href="#"
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </a>
                </nav>
              </div>
              <div className="mt-8 flow-root sm:mt-12">
                {item && item?.description}
              </div>
            </div>  
      </div>
      <Notification/>
    </section>
  );
}
