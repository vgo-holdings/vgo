"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import {
  addNewAddressFormControls,
  loginFormControls,
  updateProfileFormControls,
  updateSellerProfileFormControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { handleVerify } from "@/services/verifyAccount";
import "./page-style.css";
import Image from "next/image";
import { updateImage, updateProfile } from "@/services/user";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  console.log(file, "file");
  const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  if (file.size > maxSize) {
    toast.error("File size exceeds the limit (2MB).", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return;
  }
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
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

export default function Account() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showUpdateProfileForm, setShowUpdateProfileForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(user?.imageURL);
  const [formData, setFormData] = useState({
    _id: user?._id,
    imageURL: user?.imageURL,
    name: user?.name,
    password: "",
    role: user?.role,
    refkey: user?.refkey,
  });
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  console.log(formData, "account FormDatas")

  const calculateTimeLeft = () => {
    const createdAt = new Date(user?.createdAt);
  
    // Calculate expiration date based on user role
    let expireDate;
    if (user?.role === "freelancer") {
      // Freelancer countdown expires after 15 days
      expireDate = new Date(createdAt);
      expireDate.setDate(createdAt.getDate() + 15);
    } else if (user?.role === "member") {
      // Member countdown expires after 365 days
      expireDate = new Date(createdAt);
      expireDate.setDate(createdAt.getDate() + 365);
    } else {
      // No countdown for other roles
      return;
    }
  
    const currentDate = new Date();
    const timeLeft = expireDate.getTime() - currentDate.getTime();
  
    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      setCountdown({ days, hours, minutes, seconds });
    }
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  async function handleVerifyPassword() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await handleVerify(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowUpdateProfileForm(true);
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  async function handleUpdateUser() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await updateProfile(formData);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowUpdateProfileForm(false);
      setFormData({
        _id: user?._id,
        name: user?.name,
        imageURL: user?.imageURL,
        role: user?.role,
        email: user?.email,
        password: ""})
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData({
        _id: user?._id,
        name: user?.name,
        imageURL: user?.imageURL,
        role: user?.role,
        email: user?.email,
        password: ""})
    }
  }

  const router = useRouter();

  async function extractAllAddresses() {
    setPageLevelLoader(true);
    const res = await fetchAllAddresses(user?._id);

    console.log(res);

    if (res.success) {
      setPageLevelLoader(false);

      setAddresses(res.data);
    }
  }

  function handleCopyUserId() {
    const userId = user?._id;
    if (userId) {
      const textArea = document.createElement("textarea");
      textArea.value = userId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);

      // Reset the success message after a short delay
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  async function handleImage(event) {
    const currentFile = event.target.files[0];
    if (currentFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(currentFile);
      const extractImageUrl = await helperForUPloadingImageToFirebase(
        currentFile
      );
      if (extractImageUrl !== "") {
        const res = await updateImage(user._id, extractImageUrl);
        console.log(res, "Image");
      }
      toast.success("File Uploaded.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <>
      <div className="profile-container  ">
        <div
          className="profile-containerLeft"
          style={{
            backgroundColor:
              user?.role === "admin"
                ? "#24b3954d"
                : user?.role === "freelancer"
                ? "#b324244d"
                : user?.role === "member"
                ? "#61b3244d"
                : "#b324244d",
          }}
        >
          <Image
            src={user?.imageURL}
            className="profile-bottomImage"
            alt="Picture of the author"
            width={500}
            height={500}
          />
          <div
            className="propile-propleImageContainer"
            style={{
              backgroundColor:
                user?.role === "admin"
                  ? "#24b3954d"
                  : user?.role === "freelancer"
                  ? "#b324244d"
                  : user?.role === "member"
                  ? "#61b3244d"
                  : "#b324244d",
            }}
          >
            <Image
              src={selectedImage ? selectedImage : user?.imageURL}
              className="profile-propieImage"
              style={{
                backgroundColor:
                  user?.role === "admin"
                    ? "#24b3954d"
                    : user?.role === "freelancer"
                    ? "#b324244d"
                    : user?.role === "member"
                    ? "#61b3244d"
                    : "#b324244d",
              }}
              alt="Picture of the author"
              width={500}
              height={500}
            />
              <input
              accept="image/*"
              max="1000000"
              type="file"
              name="file-image"
              id="file-image"
              className="profile-image-input"
              onChange={handleImage}
              style={{ display: "none" }}
            />
             <label htmlFor="file-image" className="profile-propieImageBtn">
              <i className="fa fa-camera "></i>
            </label>
            <p className="propile-userId">
              Ref id :
              <span onClick={handleCopyUserId} style={{ cursor: "pointer" }}>
                {user?._id}{" "}
                <i
                  style={{ marginLeft: "10px" }}
                  className="fa fa-file text-italic text-lg"
                ></i>
              </span>
              {copySuccess && (
                <span className="text-white-600 ml-2">
                  (Copied to clipboard)
                </span>
              )}
            </p>
          </div>
        </div>
        <div
          className="profile-containerRight"
          style={{
            backgroundColor:
              user?.role === "admin"
                ? "#24b3954d"
                : user?.role === "freelancer"
                ? "#b324244d"
                : user?.role === "member"
                ? "#61b3244d"
                : "#b324244d",
          }}
        >
          <div className="flex flex-col flex-1 bg-white bg-opacity-40 pt-2 rounded-md">
            <h2 className="  md:ml-10 mb-4 font-semibold text-center md:text-left  text-4xl  xm:text-2xl xm:text-center">
              {user?.name}
            </h2>
            <p
              className="  md:ml-10 text-2xl mb-4  xm:text-center"
              style={{ color: "#ffffff",fontStyle: "italic" }}
            >
              {user?.email}
            </p>
            <p
              className="  md:ml-10 mb-4 text-2xl "
              style={{ color: "#ffffff", fontWeight: "800" }}
            >
              User Role: {user?.role}
            </p>
            {user?.class_name &&
            <p
              className="  ml-10 mb-4 text-2xl  xm:text-center"
              style={{ color: "#ffffff", fontWeight: "800" }}
            >
              User Class: {user?.class_name}
            </p>
            }
          </div>
          <button
            onClick={() => router.push("/orders")}
            className="md:mt-5  md:ml-10 mb-4  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            View Your Orders
          </button>
          <button
            onClick={() => {
              setHideButton(!hideButton);
              setShowUpdateProfileForm(false);
              setFormData({
                _id: user?._id,
                imageURL: user?.imageURL,
                name: user?.name,
                email: user?.email,
                password: "",
                role: user?.role,
              });
            }}
            className="md:mt-5  md:ml-10     inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Update Profile
          </button>
          {user?.role === "freelancer" &&
          <div className="flex flex-row space-x-4 ml-10">
            <div className="flex flex-col w-20   ">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Days
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.days < 10
                      ? `0${countdown.days}`
                      : countdown.days}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20  ">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Hours
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.hours < 10
                      ? `0${countdown.hours}`
                      : countdown.hours}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Mins.
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.minutes < 10
                      ? `0${countdown.minutes}`
                      : countdown.minutes}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Secs.
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.seconds < 10
                      ? `0${countdown.seconds}`
                      : countdown.seconds}
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
          {user?.role === "member" &&
          <div className="flex flex-row space-x-4 ml-10">
            <div className="flex flex-col w-20   ">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Days
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.days < 10
                      ? `0${countdown.days}`
                      : countdown.days}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20  ">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Hours
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.hours < 10
                      ? `0${countdown.hours}`
                      : countdown.hours}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Mins.
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.minutes < 10
                      ? `0${countdown.minutes}`
                      : countdown.minutes}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-20">
              <h1
                className="text-md text-center text-white"
                style={{ backgroundColor: "#e84118", color: "white" }}
              >
                Secs.
              </h1>
              <div className="h-16" style={{ backgroundColor: "#F1F1F1" }}>
                <div className="flex items-center justify-center h-full">
                  <div
                    className="text-center text-3xl font-semibold"
                    style={{ color: "#e84118" }}
                  >
                    {countdown.seconds < 10
                      ? `0${countdown.seconds}`
                      : countdown.seconds}
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
      <div className="profile-dataContainer text-black ">
        <div className="bg-white shadow ">
          <div className="p-6 sm:p-12 xm:p-0 space-x-2">
            <div className=" ">
              {hideButton ? (
                <div className="propile-dataEditForm">
                  <h2 className="   font-semibold text-center text-2xl my-3   text-black">
                    Update Profile
                  </h2>
                  {showUpdateProfileForm ? (
                    <div className="flex bg-white rounded-xl flex-col   justify-center p-4 items-center propile-dataEditForm">
                      <div className="w-full   mr-0 mb-0 ml-0">
                        {/* <div className="relative">
                        <p className=" pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                          Select Image
                        </p>
                        <input
                          accept="image/*"
                          max="1000000"
                          type="file"
                          onChange={handleImage}
                          className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                        />
                      </div> */}
                        {user?.role == "customer"
                          ? updateProfileFormControls.map((controlItem, key) => (
                              <InputComponent
                                key={key}
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(event) =>
                                  setFormData({
                                    ...formData,
                                    [controlItem.id]: event.target.value,
                                  })
                                }
                              />
                            ))
                          : updateSellerProfileFormControls.map(
                              (controlItem,key) => (
                                <InputComponent
                                key={key}
                                  type={controlItem.type}
                                  placeholder={controlItem.placeholder}
                                  label={controlItem.label}
                                  value={formData[controlItem.id]}
                                  onChange={(event) =>
                                    setFormData({
                                      ...formData,
                                      [controlItem.id]: event.target.value,
                                    })
                                  }
                                />
                              )
                            )}
                      </div>
                      <button
                        onClick={handleUpdateUser}
                        className="disabled:opacity-50 inline-flex items-center justify-center px-4 py-2 text-lg mt-4
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide rounded-full w-1/4
                     "
                        style={{ backgroundColor: "#e84118" }}
                      >
                        {componentLevelLoader &&
                        componentLevelLoader.loading ? (
                          <ComponentLevelLoader
                            text={"Saving"}
                            color={"#ffffff"}
                            loading={
                              componentLevelLoader &&
                              componentLevelLoader.loading
                            }
                          />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="flex bg-white rounded-xl flex-col  justify-center p-4 items-center">
                      <div className="w-full   mr-0 mb-0 ml-0 space-y-8">
                        {loginFormControls.map((controlItem,key) => (
                          <InputComponent
                          key={key}
                            type={controlItem.type}
                            placeholder={controlItem.placeholder}
                            label={controlItem.label}
                            value={formData[controlItem.id]}
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                [controlItem.id]: event.target.value,
                              })
                            }
                          />
                        ))}
                        <div className="profile-dataBtnRow">
                          <button
                            onClick={handleVerifyPassword}
                            className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            Verify Account
                          </button>
                          <button
                            className="mt-5 inline-block  tracking-wide px-5 py-3  profile-dataCancleBtn"
                            onClick={() => {
                              setHideButton(!hideButton);
                              setShowUpdateProfileForm(false);
                              setFormData({
                                _id: user?._id,
                                imageUrl: user?.imageURL,
                                name: user?.name,
                                email: user?.email,
                                password: "",
                                role: user?.role,
                              });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            <div className="addres-container">
              <h1 className="font-bold text-2xl my-3">Your Addresses :</h1>
              {pageLevelLoader ? (
                <PulseLoader
                  color={"#000000"}
                  loading={pageLevelLoader}
                  size={15}
                  data-testid="loader"
                />
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  {addresses && addresses.length ? (
                    addresses.map((item) => (
                      <div className="border p-6 relative" key={item._id}>
                        <div className="profile-addressBtnRow">
                          <button
                            onClick={() => handleUpdateAddress(item)}
                            className="profle-addressBtn"
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="profle-addressBtn "
                          >
                            {componentLevelLoader &&
                            componentLevelLoader.loading &&
                            componentLevelLoader.id === item._id ? (
                              <ComponentLevelLoader
                                text={"Deleting"}
                                color={"#ffffff"}
                                loading={
                                  componentLevelLoader &&
                                  componentLevelLoader.loading
                                }
                              />
                            ) : (
                              <i className="fa fa-trash"></i>
                            )}
                          </button>
                        </div>
                        <p>Name : {item.fullName}</p>
                        <p>Address : {item.address}</p>
                        <p>City : {item.city}</p>
                        <p>Country : {item.country}</p>
                        <p>PostalCode : {item.postalCode}</p>
                        <p>Contact No: {item.phone}</p>
                      </div>
                    ))
                  ) : (
                    <p>No address found ! Please add a new address below</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="profile-addnewAddressbtn"
              >
                {showAddressForm ? "- Hide Address Form" : "+ Add New Address"}
              </button>
            </div>
            {showAddressForm ? (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center propile-dataEditForm">
                <div className="w-full  mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem,key) => (
                    <InputComponent
                    key={key}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      value={addressFormData[controlItem.id]}
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddOrUpdateAddress}
                  className="mt-5   w-full h-5/6    inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Saving"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <Notification />
      </div>
    </>
  );
}
