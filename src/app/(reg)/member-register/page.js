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
import { useContext, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import Loading from "@/app/loading";
import { userName } from "@/services/user";

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
    const [loading, setLoading] = useState(false);
    const { user } = useContext(GlobalContext);

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
            if (user.role == "member") {
                setDepositFormData({
                    imageUrl: "",
                    name: user.name,
                    refkey: user._id
                })
            } else {
                setDepositFormData({
                    imageUrl: "",
                    name: user.name,
                    user_id: user._id
                })
            }
        }
    }, [user]);


    useEffect(() => {
        if (user?.name) {
            if (user.role == "member") {
                setDepositFormData({
                    imageUrl: "",
                    name: user.name,
                    refkey: user._id
                })
            } else {
                const status = searchParams.get("status");
                console.log("🚀 ~ file: page.js:160 ~ useEffect ~ status:", status)
                if (status) {
                    setDepositFormData({
                        name: user.name,
                        user_id: user._id,
                        refkey: status
                    })
                    console.log(status);
                } else if (status === "cancel") {
                    console.log("Payment canceled.");
                }
            }
        } else {
            router.push("/login")
        }

    }, [user]);

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
            setLoading(true);
            const imageUploadResult = await handleChooseImage();
            const res = await updateDeposit(depositFormData, imageUploadResult);


        } catch (error) {
            toast.error("Error", {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error("Error in handleDeposit:", error);
        } finally {
            if (user.role == "member") {
                setDepositFormData({
                    imageUrl: "",
                    name: user.name,
                    user_id: "",
                    refkey: user._id
                })
            } else {
                setDepositFormData({
                    imageUrl: "",
                    name: user.name,
                    user_id: user._id,
                    refkey: "",
                })
            }
            setSelectedImage("");
            setLoading(false);
        }
    }

    async function handleCheckout() {
        console.log("payment gate way");
    }

    async function handleChooseImage() {
        try {
            if (file) {
                const extractImageUrl = await helperForUPloadingImageToFirebase(file);
                console.log('extractImageUrl:', extractImageUrl);
                toast.success("Slip Uploaded.", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return extractImageUrl;
            } else {
                toast.error("Error in handleChooseImage", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.log('No file to upload.');
                return "no file";
            }
        } catch (error) {
            console.error("Error in handleChooseImage:", error);
            return "failure";
        }
    }

    async function testName(name2) {
        const res = await userName(name2)
        console.log("🚀 ~ file: page.js:131 ~ testName ~ res:", res)
        if (res.success) {
            return res.data.name
        } else {
            return "Invalid user";
        }


    }

    function getName(name) {
        if (name?.length === 24) {
            const name1 = testName(name);
            return name1;
        } else {
            return "Invalid user";
        }
    }

    return (
        <div className="bg-gray-100 relative ">
            {
                loading ? <div className="items-center h-screen justify-center flex">
                    <Loading />
                </div> :
                    <div className="flex flex-col items-center justify-between pt-0 md:pr-10 md:pl-10 pr-0 pb-0 pl-0 mt-8 mr-auto xl:px-5 lg:flex-row my-10">
                        <div className="flex flex-col justify-center items-center w-full pr-0 pl-0 md:pr-10 md:pl-10 lg:flex-row space-x-4">
                            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                                <div className="flex flex-col items-center justify-start pt-10 pr-7 pb-10 pl-7 bg-white bg-opacity-50 filter backdrop-blur-sm shadow-2xl rounded-xl relative z-0">
                                    <p className="w-full text-2xl font-medium text-center font-serif text-black">
                                        Proceed with Bank deposit
                                    </p>
                                    <p className="w-full text-4xl font-medium text-center font-serif text-black">
                                        {isRegistered
                                            ? "Registration Successfull !"
                                            : "Sign up for an Member"}
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
                                                        <div>
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
                                                                disabled={controlItem.disabled || false}
                                                                value={depositFormData[controlItem.id]}
                                                            />

                                                            {user?.role == "member" ?
                                                                (controlItem.id == "user_id" ?
                                                                    <Suspense fallback={<Loading />}>
                                                                        <p className="text-black text-center text-sm lg:text-base">
                                                                            {getName(depositFormData[controlItem.id])}
                                                                        </p>
                                                                    </Suspense> : null)
                                                                : (controlItem.id == "refkey" ?
                                                                    <Suspense fallback={<Loading />}>
                                                                        <p className="text-black text-center text-sm lg:text-base">
                                                                            {getName(depositFormData[controlItem.id])}
                                                                        </p>
                                                                    </Suspense> : null)
                                                            }

                                                        </div>
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
                                                        <label htmlFor="file-image"
                                                            className="bottom-0 absolute right-5 transform translate-y-1/4 w-12 h-12 border-4 border-orange-600 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer"
                                                        >
                                                            <i className="fa fa-camera "></i>
                                                        </label>
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
                                                Become a member
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <Notification />
        </div>
    );
}
