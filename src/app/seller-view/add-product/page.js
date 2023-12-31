"use client";
import CommonDetails from "@/components/CommonDetails";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponentAdmin from "@/components/FormElements/SelectComponentAdmin";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { addNewProduct, addNewProductbySeller, updateAProduct } from "@/services/product";
import {updatePackDetails } from "@/services/user";
import {
  AvailableSizes,
  adminAddProductformControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resolve } from "styled-jsx/css";
import logo from "../../../components/Navbar/vgo 1.png";
import Image from "next/image";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file, Uid) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${Uid}/product/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => { },
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
  user: "",
  name: "",
  price: "",
  description: "",
  category: "furniture",
  sizes: [],
  deliveryInfo: "",
  onSale: "no",
  bestSelling: "no",
  newArrivals: "yes",
  imageUrl: "",
  imageUrl2: "",
  imageUrl3: "",
  imageUrl4: "",
  imageUrl5: "",
  priceDrop: "",
  location: ""
};

export default function SellerAddNewProduct() {
  const [formData, setFormData] = useState(initialFormData);
  const [preview, setpreview] = useState(false);

  console.log(formData)

  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    isAuthUser,
    user,
    setUser,
  } = useContext(GlobalContext);
  console.log("🚀 ~ file: page.js:94 ~ SellerAddNewProduct ~ user:", user)
  console.log(user)

  const router = useRouter();

  useEffect(() => {
    if (isAuthUser && user) setFormData({ ...formData, user: user._id });
    setFormData({ ...formData, location: user?.district });
  }, [user]);

  useEffect(() => {
    if (currentUpdatedProduct !== null) setFormData(currentUpdatedProduct);
  }, [currentUpdatedProduct]);

  async function handleImage(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0],
      user?._id
    );
    console.log("🚀 ~ file: page.js:108 ~ handleImage ~ extractImageUrl:", extractImageUrl)

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  }

  async function handleImage2(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0],
      user?._id
    );
    console.log("🚀 ~ file: page.js:108 ~ handleImage ~ extractImageUrl:", extractImageUrl)

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl2: extractImageUrl,
      });
    }
  }

  async function handleImage3(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0],
      user?._id
    );
    console.log("🚀 ~ file: page.js:108 ~ handleImage ~ extractImageUrl:", extractImageUrl)

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl3: extractImageUrl,
      });
    }
  }

  async function handleImage4(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0],
      user?._id
    );
    console.log("🚀 ~ file: page.js:108 ~ handleImage ~ extractImageUrl:", extractImageUrl)

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl4: extractImageUrl,
      });
    }
  }

  async function handleImage5(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0],
      user?._id
    );
    console.log("🚀 ~ file: page.js:108 ~ handleImage ~ extractImageUrl:", extractImageUrl)

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        imageUrl5: extractImageUrl,
      });
    }
  }

  function handleTileClick(getCurrentItem) {
    let cpySizes = [...formData.sizes];
    const index = cpySizes.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpySizes.push(getCurrentItem);
    } else {
      cpySizes = cpySizes.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      sizes: cpySizes,
    });
  }

  function changepreview() {
    setpreview(!preview);
  }

  async function handleAddProduct() {
    console.log(formData, "formData")
    const res = await addNewProductbySeller(formData);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);
      setpreview(false);
      // setCurrentUpdatedProduct(null)
      // setTimeout(() => {
      //   router.push("/seller-view/all-products");
      // }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
      setpreview(false);
    }
  }
  const [AlertMsg, setAlertMsg] = useState(true);
  async function selectedAddpackshoppingMallCount() {
    // shoppingMallCount
    const res = await updatePackDetails(user._id, "shoppingMallCount")
    setUser(res?.finalData?.user);
    setAlertMsg(false);
  }

  async function selectedAddpacktotalShops() {
    // totalShops
    const res = await updatePackDetails(user._id, "totalShops")
    setUser(res?.finalData?.user);
    setAlertMsg(false);
  }

  return (

    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      {user?.shoppingMallCount == 0 && user?.totalShops == 0 ?
        (
          <div class="rounded fixed top-0 left-0 flex items-center justify-center w-full h-full z-10"
            // onClick={closeMsg}
            style={{ backgroundColor: 'rgba(0,0,0,.5)' }}
            x-show="open">
            <div class=" h-auto p-4 mx-2 text-left bg-white rounded-3xl shadow-xl dark:bg-gray-800 md:max-w-xl md:p-6 lg:p-8 md:mx-0"
            >
              <div class="flex justify-center mb-4">
                <button
                  // onClick={closeMsg}
                  class=" dark:text-blue-400 dark:hover:text-blue-500 hover:text-blue-700">
                  <Image
                    src={logo}
                    alt="User 1"
                    className="ml-2 h-16 w-16 md:h-16 md:w-16 object-cover transform scale-100"
                  />
                </button>
              </div>
              <div class="mb-4 text-center">
                <h2 class="text-2xl font-bold leading-snug text-gray-900 dark:text-gray-400">
                  HI - {user?.name}
                </h2>
                <div class="mt-4 ">
                  <p class="text-lg leading-5 text-gray-500 dark:text-gray-400">
                    Please Select Your <a href="#" class="text-myOrange font-bold">Package!</a>
                    {/* Please select your package! Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a> */}
                  </p>
                  <div className="flex mt-2">
                    <p class="text-mb p-3 w-1/2 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
                      A shopping mall is a single location for several (six) types of your business
                    </p>
                    <p class="text-mb p-3 w-1/2  ml-1 leading-5 text-gray-500 dark:text-gray-400 border rounded-2xl">
                      An Store is just space for your main business only
                    </p>
                  </div>
                </div>
              </div>
              <span class="justify-center  gap-3 rounded-md shadow-sm flex text-xs">
                <button
                  style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                  class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                  onClick={selectedAddpackshoppingMallCount}
                >
                  Select Shopping Mall
                </button>
                <button
                  style={{ backgroundColor: "#e84118", borderColor: "#e84118" }}
                  class="disabled:opacity-50 disabled:cursor-not-allowed block w-full max-w-xs mx-auto text-white rounded-3xl px-3 py-3 font-semibold"
                  onClick={selectedAddpacktotalShops}
                >
                  Select Online Shop
                </button>
              </span>
              <div class="mt-4 flex items-center justify-center">
                <p class="text-xs lg:text-sm leading-5 text-gray-500 dark:text-gray-400">
                  Note: <a href="#" class="text-myOrange font-bold">You can't change your package after selecting it.</a>
                </p>
              </div>
            </div>
          </div >
        ) : (
          <div className="flex flex-col items-center justify-center p-10 bg-white shadow-2xl rounded-xl relative">
            {preview ? (
              <div style={{ height: '100%', width: '100%' }}>

                <div class="flex gap-4 mb-6">
                  <a href="#"
                    class="w-full px-4 py-3 text-center text-gray-100 bg-orange-600 border border-transparent dark:border-gray-700 hover:border-orange-500 hover:text-orange-700 hover:bg-orange-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                    onClick={changepreview}
                  >
                    Edit Again</a>
                  <a href="#"
                    class="w-full px-4 py-3 text-center text-gray-100 bg-orange-600 border border-transparent dark:border-gray-700 hover:border-orange-500 hover:text-orange-700 hover:bg-orange-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                    onClick={handleAddProduct}
                  >
                    Comfirm product</a>
                </div>
                <CommonDetails item={formData} />
              </div>
            ) :
              <div class="flex flex-wrap mb-24 -mx-4">
                <div class="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                  <div class="sticky top-0 overflow-hidden ">
                    <div class="relative mb-6 lg:mb-10 lg:h-96 flex justify-center">
                      <img className="object-contain w-full lg:h-full" src={formData.imageUrl ? formData.imageUrl : "https://placehold.co/400?text=Add Image 1"} alt=""
                      />
                      <input
                        accept="image/*"
                        max="1000000"
                        type="file"
                        name="file-image"
                        id="file-image"
                        className="hidden"
                        onChange={handleImage}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="file-image" className="bottom-0 absolute w-12 h-12 border-4 border-orange-500 bg-orange-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                        <i className="fa fa-camera "></i>
                      </label>
                    </div>
                    {user?.shoppingMallCount >= 1 ?
                      <div class="flex-wrap flex justify-center -mx-2 md:flex">
                        <div class="w-1/2 p-2 sm:w-1/4 relative flex justify-center">
                          <img class="object-contain w-full lg:h-28" src={formData.imageUrl2 ? formData.imageUrl2 : "https://placehold.co/400?text=Add Image 2"} alt="" />
                          <input
                            accept="image/*"
                            max="1000000"
                            type="file"
                            name="file-image2"
                            id="file-image2"
                            className="hidden"
                            onChange={handleImage2}
                            style={{ display: "none" }}
                          />
                          <label htmlFor="file-image2" className="bottom-0 absolute w-12 h-12 border-4 border-orange-500 bg-orange-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="fa fa-camera "></i>
                          </label>
                        </div>
                        <div class="w-1/2 p-2 sm:w-1/4 relative flex justify-center">
                          <a class="block border border-gray-200 hover:border-orange-400 dark:border-gray-700 dark:hover:border-orange-300" href="#">
                            <img class="object-contain w-full lg:h-28" src={formData.imageUrl3 ? formData.imageUrl3 : "https://placehold.co/400?text=Add Image 3"} alt="" />
                          </a>
                          <input
                            accept="image/*"
                            max="1000000"
                            type="file"
                            name="file-image3"
                            id="file-image3"
                            className="hidden"
                            onChange={handleImage3}
                            style={{ display: "none" }}
                          />
                          <label htmlFor="file-image3" className="bottom-0 absolute w-12 h-12 border-4 border-orange-500 bg-orange-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="fa fa-camera "></i>
                          </label>
                        </div>
                        <div class="w-1/2 p-2 sm:w-1/4 relative flex justify-center">
                          <a class="block border border-gray-200 hover:border-orange-400 dark:border-gray-700 dark:hover:border-orange-300" href="#">
                            <img class="object-contain w-full lg:h-28" src={formData.imageUrl4 ? formData.imageUrl4 : "https://placehold.co/400?text=Add Image 4"} alt="" />
                          </a>
                          <input
                            accept="image/*"
                            max="1000000"
                            type="file"
                            name="file-image4"
                            id="file-image4"
                            className="hidden"
                            onChange={handleImage4}
                            style={{ display: "none" }}
                          />
                          <label htmlFor="file-image4" className="bottom-0 absolute w-12 h-12 border-4 border-orange-500 bg-orange-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="fa fa-camera "></i>
                          </label>
                        </div>
                        <div class="w-1/2 p-2 sm:w-1/4 relative flex justify-center">
                          <a class="block border border-gray-200 hover:border-orange-400 dark:border-gray-700 dark:hover:border-orange-300" href="#">
                            <img class="object-contain w-full lg:h-28" src={formData.imageUrl5 ? formData.imageUrl5 : "https://placehold.co/400?text=Add Image 5"} alt="" />
                          </a>
                          <input
                            accept="image/*"
                            max="1000000"
                            type="file"
                            name="file-image5"
                            id="file-image5"
                            className="hidden"
                            onChange={handleImage5}
                            style={{ display: "none" }}
                          />
                          <label htmlFor="file-image5" className="bottom-0 absolute w-12 h-12 border-4 border-orange-500 bg-orange-500 dark:border-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                            <i className="fa fa-camera "></i>
                          </label>
                        </div>
                      </div> : null
                    }
                  </div>
                </div>
                <div class="w-full px-4 md:w-1/2">
                  <div class="lg:pl-20">
                    <div class="mb-6 ">

                      <div className="flex justify-end">
                        <button
                          // onClick={() =>
                          //   router.push(`https://www.vigour.space/user-profile/${item?.user}`)
                          // }
                          class="px-2.5 py-0.5 text-xs text-black bg-orange-500 dark:bg-orange-500 rounded-xl dark:text-black">
                          Seller Profile
                        </button>

                      </div>
                      <span class="px-2.5 py-0.5 text-xs text-orange-600 bg-orange-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">New
                        Arrival</span>
                      <h2 class="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                        {/* {item?.name} */}
                        <input
                          class="block w-full px-4 py-3 mb-2 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800"
                          type="text" name="" placeholder="Add Product Name"
                          defaultValue={formData.name}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              name: event.target.value,
                              user: user._id,
                              location: user?.district,
                              city: user?.city,
                            })
                          }
                        />
                      </h2>
                      <p class="flex  text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                        <span>
                          <input
                            class="block w-full px-4 py-3 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800"
                            type="number" name="" placeholder="Add Price" defaultValue={formData.price}
                            onChange={(event) => {
                              const inputValue = event.target.value;
                              let priceRange;

                              if (inputValue >= 0 && inputValue < 10000) {
                                priceRange = "price1";
                              } else if (inputValue >= 10000 && inputValue < 20000) {
                                priceRange = "price2";
                              } else if (inputValue >= 20000 && inputValue < 50000) {
                                priceRange = "price3";
                              } else if (inputValue >= 50000) {
                                priceRange = "price4";
                              }

                              setFormData({
                                ...formData,
                                price: inputValue,
                                priceRange: priceRange
                              });
                            }}
                          />
                        </span>
                        <input
                          class="block w-full px-4 py-3 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800"
                          type="number" name="" placeholder="Add Discount value (Price Drop)" defaultValue={formData.priceDrop}
                          onChange={(event) => {
                            if (event.target.value !== 0 || event.target.value !== "0") {
                              setFormData({
                                ...formData,
                                priceDrop: event.target.value,
                                onSale: "yes",
                              });
                            }
                          }}
                        />
                        {/* <span class="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">
                    Add Discount value
                  </span> */}
                        {/* {(item.onSale == "yes") ?
                    < span class="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">LKR{item && item?.price}</span>
                    : null
                  } */}
                      </p>
                    </div>

                    <div class="mb-6">
                      <h2 class="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Description :</h2>
                      <div class="bg-gray-100 dark:bg-gray-700 rounded-xl">
                        <div class="p-3 lg:p-5 ">
                          <textarea
                            placeholder={"Add Description"}
                            rows="5"
                            defaultValue={formData.description}
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                description: event.target.value,
                              })
                            }
                            class="mt-2 bg-gray-200 border-1 border-purple-500 rounded w-full text-gray-700 "
                            style={{ borderRight: '0px', borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
                          />
                        </div>
                      </div>
                      {/* <div class="bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <div class="p-3 lg:p-5 ">
                    <div class="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                      <div class="flex flex-wrap gap-x-10 gap-y-4">
                        <div class="w-full ">
                          <div class="flex ">
                            <div>
                              <p class="mb-3 text-base font-semibold  text-gray-500 dark:text-gray-400">
                                t
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                    </div>
                    <div class="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                      <span class="text-base text-gray-600 dark:text-gray-400">In Stock</span>
                      <p class="mt-2 text-sm text-orange-500 dark:text-orange-200">Your Location:{user?.district}:{user?.city}
                        <span class="text-gray-600 dark:text-gray-400">
                          {/* Add deliveryInfo. */}
                          <input
                            class="block w-full px-4 py-3 text-sm placeholder-gray-500 bg-white border rounded dark:text-gray-400 dark:placeholder-gray-500 dark:border-gray-800 dark:bg-gray-800"
                            type="text" name="" placeholder="Add deliveryInfo."
                            defaultValue={formData.deliveryInfo}
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                deliveryInfo: event.target.value,
                              })
                            }
                          />
                        </span>
                      </p>
                    </div>
                    <select class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                      defaultValue={formData.category}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          category: event.target.value,
                        })
                      }
                    >
                      <option value="">Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing and Fashion">Clothing and Fashion</option>
                      <option value="Home and Furniture">Home and Furniture</option>
                      <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                      <option value="Books, Movies, and Music">Books, Movies, and Music</option>
                      <option value="Sports and Outdoors">Sports and Outdoors</option>
                      <option value="Toys and Games">Toys and Games</option>
                      <option value="Health and Wellness">Health and Wellness</option>
                      <option value="Automotive">Automotive</option>
                      <option value="Jewelry and Watches">Jewelry and Watches</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Food and Beverages">Food and Beverages</option>
                      <option value="Pets">Pets</option>
                      <option value="Art and Crafts">Art and Crafts</option>
                      <option value="Home Improvement and Tools">Home Improvement and Tools</option>
                      <option value="Travel and Luggage">Travel and Luggage</option>
                      <option value="Baby and Maternity">Baby and Maternity</option>
                      <option value="Gifts and Occasions">Gifts and Occasions</option>
                      <option value="Electrical and Lighting">Electrical and Lighting</option>
                      <option value="Garden and Outdoor Living">Garden and Outdoor Living</option>
                    </select>
                    <div class="mb-6 "></div>
                    <div class="flex flex-wrap items-center mb-6">
                      <div class="mb-4 mr-4 lg:mb-0">
                        {/* <div class="w-28">
                    <div class="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                      <button class="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                        <span class="m-auto text-2xl font-thin">-</span>
                      </button>
                      <input type="number" class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder="1" />
                      <button class="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                        <span class="m-auto text-2xl font-thin">+</span>
                      </button>
                    </div>
                  </div> */}
                      </div>

                      {/* <div class="mb-4 lg:mb-0">
                  <button class="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-orange-600 hover:bg-orange-600 hover:border-orange-600 dark:bg-orange-600 dark:hover:bg-orange-500 dark:hover:border-orange-500 dark:hover:text-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class=" bi bi-heart" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                      </path>
                    </svg>
                  </button>
                </div> */}
                      <a href="#"
                        class="w-full px-4 py-3 text-center text-orange-600 bg-orange-100 border border-orange-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-orange-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
                        onClick={changepreview}
                      >
                        Add Product
                      </a>
                    </div>
                    {preview &&
                      <div class="flex gap-4 mb-6">
                        <a href="#"
                          class="w-full px-4 py-3 text-center text-gray-100 bg-orange-600 border border-transparent dark:border-gray-700 hover:border-orange-500 hover:text-orange-700 hover:bg-orange-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                          onClick={changepreview}
                        >
                          Edit Again</a>
                        <a href="#" class="w-full px-4 py-3 text-center text-gray-100 bg-orange-600 border border-transparent dark:border-gray-700 hover:border-orange-500 hover:text-orange-700 hover:bg-orange-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl">
                          Comfirm product</a>
                      </div>
                    }
                  </div>
                </div>
              </div>

            }
          </div>
        )
      }
      <Notification />
    </div>
  );
}
