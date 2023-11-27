"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { freelanceRegistrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession1 } from "@/services/stripe";
import { updateAUser } from "@/services/register";

const initialFormData = {
  imageURL: "",
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  facebookURL: "",
  youtubeURL: "",
  talents: [""],
  totalShops: 0,
  shoppingMallCount: 0,
  shopCount: 0,
  productCount: 0,
  password: "",
  role: "customer",
  refkey: "",
  freelancerCount: 0,
  memberCount: 0,
  disable: false,
  profit: 0,
  holdProfit: 0,
};

export default function Register() {
  /* const [formData, setFormData] = useState(initialFormData); */
  const [isRegistered, setIsRegistered] = useState(false);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser, user } =
    useContext(GlobalContext);

  const router = useRouter();
  const searchParams = useSearchParams()

  /* useEffect(() => {
    console.log(user)
    if (user) {
      setFormData({
        imageURL: "",
        name: user.name,
        email: user.email,
        phone: user.phone,
        whatsapp: user.whatsapp,
        facebookURL: "",
        youtubeURL: "",
        talents: [""],
        totalShops: 0,
        shoppingMallCount: 0,
        shopCount: 0,
        productCount: 0,
        password: "",
        role: "customer",
        refkey: "",
        freelancerCount: 0,
        memberCount: 0,
        disable: false,
        profit: 0,
        holdProfit: 0,
      });
    }
  }, [user]); */

  const formData = {
    id: "654d648e5d84d67154f724fe",
    role: "freelancer",
    freelancerCount: 1,
    shopCount:5,
  };

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
  });

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== ""
      ? true
      : false;
  }

  const publishableKey =
    "pk_test_51MVHj2HaRX1qSYJHJReqlUbxDqRRg15KZ7MBmZBi9vcK8AiNMANDRLkBhfCUkPBIcO65szXpMlMQEqlunzSFfxeo00Lr1nKepQ";
  const stripePromise = loadStripe(publishableKey);

  async function handleCheckout() {
    const stripe = await stripePromise;

    // Replace this with your actual cart items logic
    const cartItems = [{
      shippingAddress: {},
      paymentMethod: 'card',
      isPaid: false,
      paidAt: 2023-11-10,
      isProcessing: true
    }];

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Starter",
        },
        unit_amount: 5000,
      },
      quantity: 1,
    }));

    const res = await callStripeSession1(createLineItems);
    localStorage.setItem("stripe-package", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(initialFormData));

    const { error } = await stripe.redirectToCheckout({
      sessionId: res.id,
    });
    console.log(error);
  }

  async function handleUpdateUser() {
    const res = await updateAUser(formData)
    console.log(res)
  }

  return (
    <div className="bg-white relative">
      <div className="flex flex-col items-center justify-between pt-0 md:pr-10 md:pl-10 pr-0 pb-0 pl-0 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-0 pl-0 md:pr-10 md:pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an Starter Seller"}
              </p>
              {isRegistered ? (
                <button
                  className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                "
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {freelanceRegistrationFormControls.map((controlItem, key) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                      key={key}
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                        value={formData[controlItem.id]}
                      />
                    ) : null
                  )}
                  <button
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    disabled={!isFormValid()}
                    onClick={handleCheckout}
                  >
                    {!pageLevelLoader ? (
                      <ComponentLevelLoader
                        text={"Registering freelancer"}
                        color={"#ffffff"}
                        loading={pageLevelLoader}
                      />
                    ) : (
                      "Become a freelancer"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </div>
  );
}
