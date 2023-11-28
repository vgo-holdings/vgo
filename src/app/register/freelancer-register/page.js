"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
  freelanceBankDepoRegistrationFormControls,
  freelanceRegistrationFormControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession1 } from "@/services/stripe";
import { toast } from "react-toastify";
import { updateAUser } from "@/services/register";
import { updateDeposit } from "@/services/bank-deposit";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import "./page-style.css";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  console.log(file, " gg amputa")
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    toast.error("File size exceeds the limit (2MB).", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  const getFileName = createUniqueFileName(file);
  
  const storageReference = ref(storage, `slip/${getFileName}`);
  console.log(storageReference, " ggfs amputa")
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

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

const initialDepositData = {
  name: "",
  user_id: "",
  refkey: "",
  imageUrl: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [depositFormData, setDepositFormData] = useState(initialDepositData);
  const [selectedImage, setSelectedImage] = useState();
  const [isRegistered, setIsRegistered] = useState(false);
  const [file, setFile] = useState(null);
  const { pageLevelLoader, setPageLevelLoader, isAuthUser, user } =
    useContext(GlobalContext);

  console.log(depositFormData, "after")

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log(user);
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
  }, [user]);

  const packageData = {
    id: "654d648e5d84d67154f724fe",
    role: "freelancer",
    freelancerCount: 1,
    shopCount: 5,
  };

  async function handleUpdateUser() {
    const res = await updateAUser(packageData);
    console.log(res);
  }

  useEffect(() => {
    const status = searchParams.get("status");
    if (status === "success") {
      handleUpdateUser();
      console.log("Payment successful!");
    } else if (status === "cancel") {
      // Payment was canceled, you can show a cancel message or redirect to a cancel page
      console.log("Payment canceled.");
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

  function isDepositFormValid() {
    return depositFormData &&
      depositFormData.name &&
      depositFormData.name.trim() !== "" &&
      depositFormData.user_id &&
      depositFormData.user_id.trim() !== "" &&
      depositFormData.refkey &&
      depositFormData.refkey.trim() !== "" &&
      file 
      ? true
      : false;
  }

  const publishableKey =
    "pk_test_51MVHj2HaRX1qSYJHJReqlUbxDqRRg15KZ7MBmZBi9vcK8AiNMANDRLkBhfCUkPBIcO65szXpMlMQEqlunzSFfxeo00Lr1nKepQ";
  const stripePromise = loadStripe(publishableKey);

  async function handleImage(event) {
    const currentFile = event.target.files[0];
    setFile(currentFile);

    if (currentFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(currentFile);
    }
  }

  async function handleDeposit() {
    try {
      const imageUploadResult = await handleChooseImage();

      const sesyjitsu = depositFormData;
      console.log(sesyjitsu, "sesyjitsu")

      const res = await updateDeposit(depositFormData, imageUploadResult);

      /* if (imageUploadResult !== "") {
        setDepositFormData({
          ...depositFormData,
          imageUrl: imageUploadResult,
        });

        console.log('depositFormData:', depositFormData);

        toast.success("File Uploaded.", {
          position: toast.POSITION.TOP_RIGHT,
        });
        const res = await updateDeposit(depositFormData);
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        console.log('failed. URL is empty.');
      } */
  
      /* if (imageUploadResult === "success") {
        const res = await updateDeposit(depositFormData);
        console.log(depositFormData, "image url generated")
  
        if (res.success) {
          toast.success(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        // Handle failure or other cases
        toast.error("Image upload failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
  
      setFile(null); */
    } catch (error) {
      // Handle errors here
      console.error("Error in handleDeposit:", error);
    }
  }

  async function handleCheckout() {
    const stripe = await stripePromise;

    // Replace this with your actual cart items logic
    const cartItems = [
      {
        shippingAddress: {},
        paymentMethod: "card",
        isPaid: false,
        paidAt: 2023 - 11 - 10,
        isProcessing: true,
      },
    ];

    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "jpy",
        product_data: {
          name: "Starter",
        },
        unit_amount: 15000,
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

  async function handleChooseImage() {
    try {
      if (file) {
        const extractImageUrl = await helperForUPloadingImageToFirebase(file);
        console.log('extractImageUrl:', extractImageUrl);
        return extractImageUrl;
  
        /* if (extractImageUrl !== "") {
          setDepositFormData({
            ...depositFormData,
            imageUrl: extractImageUrl,
          });
  
          console.log('depositFormData:', depositFormData);
  
          toast.success("File Uploaded.", {
            position: toast.POSITION.TOP_RIGHT,
          });
  
          return extractImageUrl;
        } else {
          console.log('Image upload failed. URL is empty.');
          return "failure";
        } */
      } else {
        console.log('No file to upload.');
        return "no file";
      }
    } catch (error) {
      console.error("Error in handleChooseImage:", error);
      return "failure";
    }
  }
  
  

  async function handleUpdateUser() {
    const res = await updateAUser(formData);
    console.log(res, 'asdasd');
  }

  return (
    <div className="bg-white relative register-formImage">
      <div className="flex flex-col items-center justify-between pt-0 md:pr-10 md:pl-10 pr-0 pb-0 pl-0 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full pr-0 pl-0 md:pr-10 md:pl-10 lg:flex-row space-x-4">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white bg-opacity-50 filter backdrop-blur-sm shadow-2xl relative z-10">
              <p className="w-full text-2xl font-medium text-center font-serif text-black">
              Procees with Online Payment
              </p>
              <p className="w-full text-4xl font-medium text-center font-serif text-black">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an freelancer(Online Payment)"}
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
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white bg-opacity-50 filter backdrop-blur-sm shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-2xl font-medium text-center font-serif text-black">
              Procees with Bank deposit
              </p>
              <p className="w-full text-4xl font-medium text-center font-serif text-black">
                {isRegistered
                  ? "Registration Successfull !"
                  : "Sign up for an freelancer"}
              </p>
              <p className="w-full text-4xl font-medium text-center font-serif text-black">
                {isRegistered ? null : "(Bank Deposit)"}
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
                  {freelanceBankDepoRegistrationFormControls.map(
                    (controlItem, key) =>
                      controlItem.componentType === "input" ? (
                        <InputComponent
                          key={key}
                          type={controlItem.type}
                          placeholder={controlItem.placeholder}
                          label={controlItem.label}
                          onChange={(event) => {
                            setDepositFormData({
                              ...depositFormData,
                              [controlItem.id]: event.target.value,
                            });
                          }}
                          value={depositFormData[controlItem.id]}
                        />
                      ) : controlItem.componentType === "select" ? (
                        <SelectComponent
                          options={controlItem.options}
                          label={controlItem.label}
                          onChange={(event) => {
                            setDepositFormData({
                              ...depositFormData,
                              [controlItem.id]: event.target.value,
                            });
                          }}
                          value={depositFormData[controlItem.id]}
                        />
                      ) : null
                  )}
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8    flex flex-col items-center justify-center">
                    <div
                      className="relative  border flex flex-col items-center  shadow-2xl justify-center h-48 w-4/5 max-h-48 max-w-48  "
                      style={{ border: "1px solid #e8411e" }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <img
                          src={selectedImage}
                          className={
                            !selectedImage
                              ? "w-full h-full object-cover m-0"
                              : "w-full h-full object-cover m-0 "
                          }
                          style={{ borderColor: "#e8411e" }}
                        />
                        <div>
                          <input
                            accept="image/*"
                            max="1000000"
                            type="file"
                            name="file-image"
                            id="file-image"
                            className="register-formFileinput"
                            onChange={handleImage}
                          />
                          <label
                            htmlFor="file-image"
                            className="register-formFileinput"
                          >
                            <i className="fa fa-camera"></i>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                   text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                   "
                    disabled={!isDepositFormValid()}
                    onClick={handleDeposit}
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
