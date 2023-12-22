'use client'
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "@/services/stripe";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import { updateAUser } from "@/services/register";


const page = () => {
  const [loading, setLoading] = useState(false);
  // const {
  //   user,
  // } = useContext(GlobalContext);

  // const router = useRouter();
  // const searchParams = useSearchParams()

  // const initialFormData = {
  //   qty: 1,
  //   totalPrice: 350,
  //   name: "abcd",

  // }

  // const formData = {
  //   id: "654d648e5d84d67154f724fe",
  //   freelancerCount: 1,
  //   shopCount: 5,
  // };

  // console.log(user?._id, "asdasd")

  // async function handleUpdateUser() {
  //   const res = await updateAUser(formData)
  //   console.log(res)
  // }

  // useEffect(() => {
  //   const status = searchParams.get('status')
  //   if (status === 'success') {
  //     handleUpdateUser();
  //     console.log('Payment successful!');

  //   } else if (status === 'cancel') {
  //     // Payment was canceled, you can show a cancel message or redirect to a cancel page
  //     console.log('Payment canceled.');
  //   }
  // }, [router.query]);

  // const publishableKey =
  //   "pk_test_51MVHj2HaRX1qSYJHJReqlUbxDqRRg15KZ7MBmZBi9vcK8AiNMANDRLkBhfCUkPBIcO65szXpMlMQEqlunzSFfxeo00Lr1nKepQ";
  // const stripePromise = loadStripe(publishableKey);

  async function showMsg() {
    setLoading(true);
  }
  async function closeMsg() {
    setLoading(false);
  }
  async function handleCheckout() {
    setLoading(true);
    // const stripe = await stripePromise;

    // // Replace this with your actual cart items logic
    // const cartItems = [{
    //   shippingAddress: {},
    //   paymentMethod: '',
    //   isPaid: false,
    //   paidAt: 2023 - 11 - 10,
    //   isProcessing: true
    // }];

    // const createLineItems = cartItems.map((item) => ({
    //   price_data: {
    //     currency: "usd",
    //     product_data: {
    //       name: "asd",
    //     },
    //     unit_amount: 350,
    //   },
    //   quantity: 1,
    // }));

    // const res = await callStripeSession(createLineItems);
    // localStorage.setItem("stripe", true);
    // localStorage.setItem("checkoutFormData", JSON.stringify(initialFormData));

    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: res.id,
    // });
    console.log("error");
  }

  const handleClick = () => {
    // Your function logic goes here
    console.log("Div clicked! Your function is called.");
    // You can add more code as needed
  };

  return (
    // <div>
    //   <button className="mt-20" onClick={handleCheckout}>Click Me</button>
    // </div>
    <section class="flex items-center h-screen bg-gray-100 bg-no-repeat bg-cover font-poppins dark:bg-gray-800"
      style={{ backgroundImage: "url('https://i.postimg.cc/xd0r7hHb/pexels-quang-nguyen-vinh-3355777.jpg')" }}
    >
      <div class="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-80 "></div>
      <div class="z-10 justify-center flex-1 max-w-6xl py-4 mx-auto text-center lg:py-10 ">
        <i className="fa fa-thumbs-up fa-bounce fa-solid fa-solid fa-xl"></i>
        <div class="" x-data="{ open: false }">
          <button
            class="px-4 py-2 text-white bg-blue-500 rounded select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 hover:bg-blue-700"
            onClick={showMsg}>Open Modal</button>
          {loading &&
            <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-orange-600 bg-opacity-10" onClick={closeMsg}
              // style={{ backgroundColor: 'rgba(0,0,0,.5)' }} 
              x-show="open">
              <div class="h-auto p-4 mx-2 text-left bg-white rounded shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
              >
                <div class="flex justify-center mb-4">
                  <button onClick={closeMsg}
                    class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 fill-orange-600">
                      <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                  </button>
                </div>
                <div class="mb-4 text-center">
                  <h2 class="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
                    HI - Krishan
                  </h2>
                  <div class="mt-4 ">
                    <p class="text-mb leading-5 text-gray-500 dark:text-gray-400">
                    Welcome to <a href="#" class="text-orange-600 font-bold">VGO</a> ! 🌟 Registration complete
                    </p>
                    <p class="text-mb leading-5 text-gray-500 dark:text-gray-400">
                    You're now part of our growing family. Ready to shop? Log in and discover a world of endless possibilities. Happy browsing!"
                    </p>
                  </div>
                </div>
                <span class="justify-center block gap-3 rounded-md shadow-sm md:flex">
                  <button
                    class="inline-flex justify-center w-full px-4 py-2 text-white bg-orange-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:hover:bg-orange-400 focus:ring-orange-400 hover:bg-orange-400">
                    Sign In
                  </button>
                </span>
              </div>
            </div >
          }
        </div >
      </div >
    </section >
  );
};

export default page;
