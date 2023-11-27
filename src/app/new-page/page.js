'use client'
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "@/services/stripe";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation';
import { GlobalContext } from "@/context";
import React, { useContext, useEffect, useState } from "react";
import { updateAUser } from "@/services/register";


const page = () => {

  const {
    user,
  } = useContext(GlobalContext);

const router = useRouter();
const searchParams = useSearchParams()

const initialFormData = {
    qty: 1,
    totalPrice: 350,
    name: "abcd",

  }

  const formData = {
    id: "654d648e5d84d67154f724fe",
    freelancerCount: 1,
    shopCount: 5,
  };

console.log(user?._id,"asdasd")

async function handleUpdateUser() {
  const res = await updateAUser(formData)
 console.log(res)
}

useEffect(() => {
  const status = searchParams.get('status')
  if (status === 'success') {
    handleUpdateUser();
    console.log('Payment successful!');

  } else if (status === 'cancel') {
    // Payment was canceled, you can show a cancel message or redirect to a cancel page
    console.log('Payment canceled.');
  }
}, [router.query]);

const publishableKey =
    "pk_test_51MVHj2HaRX1qSYJHJReqlUbxDqRRg15KZ7MBmZBi9vcK8AiNMANDRLkBhfCUkPBIcO65szXpMlMQEqlunzSFfxeo00Lr1nKepQ";
  const stripePromise = loadStripe(publishableKey);

  async function handleCheckout() {
    const stripe = await stripePromise;

    // Replace this with your actual cart items logic
    const cartItems = [{
      shippingAddress: {},
      paymentMethod: '',
      isPaid: false,
      paidAt: 2023-11-10,
      isProcessing: true
    }];

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: "asd",
        },
        unit_amount: 350,
      },
      quantity: 1,
    }));

    const res = await callStripeSession(createLineItems);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(initialFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });
    console.log(error);
  }

  return (
    <div>
      <button className="mt-20" onClick={handleCheckout}>Click Me</button>
    </div>
  );
};

export default page;
