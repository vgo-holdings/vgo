"use client";

import { useRouter } from "next/navigation";
import ComponentLevelLoader from "../Loader/componentlevel";
import './style.css'
export default function CommonCart({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) {

  const router = useRouter()

  return (
    <section className="h-screen bg-gray-100 pt-10"> 
          <div className=" cart-container"> 
              <div className="cart-leftContainer relative">
              <h1 className=" font-bold   cart-header"
                style={{zIndex:'5', color: "#2F3640",  fontSize:'2.5rem',textAlign:'left'}}>Shopping <span style={{ color: "#e84118" }}>Cart </span></h1>
                {cartItems && cartItems.length ? (
                  <ul className="cart-cartList">
                    {cartItems.map((cartItem) => (
                      <li
                        className="cart-cartItem"
                        key={cartItem.id}
                        style={{backgroundColor:'rgba(250, 250, 250, 0.555)',backdropFilter:'blur(5px)',borderRadius:'8px'}}
                      >
                        <div className="shrink-0">
                          <img
                            src={
                              cartItem &&
                              cartItem.productID &&
                              cartItem.productID.imageUrl
                            }
                            alt="Product image"
                            className="h-24 w-25 max-w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-4">
                              <p className="text-base font-semibold text-gray-900">
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.name}
                              </p>
                            </div>
                            <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-950 sm:order-1 sm:ml-8 sm:text-right">
                                LKR
                                {cartItem &&
                                  cartItem.productID &&
                                  cartItem.productID.price}
                              </p>
                              <button
                                type="button"
                                className="font-medium text-yellow-700 sm:order-2"
                                onClick={() =>
                                  handleDeleteCartItem(cartItem._id)
                                }
                              >
                                {componentLevelLoader &&
                                componentLevelLoader.loading &&
                                componentLevelLoader.id === cartItem._id ? (
                                  <ComponentLevelLoader
                                    text={"Removing"}
                                    color={"#0000000"}
                                    loading={
                                      componentLevelLoader &&
                                      componentLevelLoader.loading
                                    }
                                  />
                                ) : (
                                  "Remove"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h1 className="font-bold text-lg">Your cart is Empty !</h1>
                )}
              </div>
              <div className=" cart-rightContainer">
                <div className="flex mt-8  mb-2 w-full items-center pt-4 justify-between">
                  <p className="text-2xl text-black ">Sub Total</p>
                  <p className="text-2xl text-black font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="flex mt-3 mb-8 w-full items-center justify-between">
                  <p className="text-2xl text-black">Shipping Cost</p>
                  <p className="text-2xl text-black font-semibold">$0</p>
                </div>
                <hr className="divider"/>
                <div className="flex mt-4 mb-8 w-full items-center justify-between">
                  <p className="text-4xl font-bold text-black">Total</p>
                  <p className="text-4xl text-black font-bold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="mt-8 w-full text-center">
                  <button
                  onClick={()=>router.push('/checkout')}
                    disabled={cartItems && cartItems.length === 0}
                    className="disabled:opacity-50 group inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div> 
    </section>
  );
}
