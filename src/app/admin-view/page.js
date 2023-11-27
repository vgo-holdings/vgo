"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers, updateStatusOfOrder } from "@/services/order";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";

export default function AdminView() {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllOrdersForAllUsers() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForAllUsers();

    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(
        res.data && res.data.length
          ? res.data.filter((item) => item.user._id !== user._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAllUsers();
  }, [user]);

  console.log(allOrdersForAllUsers);

  async function handleUpdateOrderStatus(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllOrdersForAllUsers();
    } else {
      setComponentLevelLoader({ loading: true, id: "" });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAllUsers.map((item) => (
                    <li
                      key={item._id}
                      className="shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      style={{ backgroundColor: "#F1C4B7" }}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <h1 className="font-bold text-lg mb-3 sm:flex-1">
                          #order: {item._id}
                        </h1>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Name :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.user?.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              User Email :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {item?.user?.email}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total Paid Amount :
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              ${item?.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        {item.orderItems.map((orderItem, index) => (
                          <div
                            key={index}
                            className="flex-shrink-0 flex flex-row space-x-2"
                          >
                            <img
                              alt="Order Item"
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                              src={
                                orderItem &&
                                orderItem.product &&
                                orderItem.product.imageUrl
                              }
                            />
                            <div>
                              <div className="flex flex-row space-x-2">
                                <h1>Item Name : </h1>
                                <h1>{orderItem.product.name}</h1>
                              </div>
                              <div className="flex flex-row space-x-2">
                                <h1>Unit Price : </h1>
                                <h1>
                                  {orderItem.product.price -
                                    (orderItem.product.price *
                                      orderItem.product.priceDrop) /
                                      100}
                                </h1>
                              </div>
                              <div className="flex flex-row space-x-2">
                                <h1>Quantity : </h1>
                                <h1>{orderItem.qty}</h1>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col">
                        <h1 className="text-2xl font-bold text-gray-900">
                          Shipping Address:
                        </h1>
                        <p className="text-sm font-semibold text-gray-900">
                          {item?.shippingAddress.fullName}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item?.shippingAddress.address}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item?.shippingAddress.city}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item?.shippingAddress.country}
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {item?.shippingAddress.postalCode}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-5">
                        <button className="disabled:opacity-50 mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                          {item.isProcessing
                            ? "Order is Processing"
                            : "Order is delivered"}
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(item)}
                          disabled={!item.isProcessing}
                          className="disabled:opacity-50 mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={"Updating Order Status"}
                              color={"#ffffff"}
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            "Update Order Status"
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
