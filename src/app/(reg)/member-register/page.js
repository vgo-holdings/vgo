"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";
import { updateDeposit } from "@/services/bank-deposit";
import { GlobalContext } from "@/context";
import { initializeApp } from "firebase/app";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import {
    freelanceBankDepoRegistrationFormControls,
    freelanceRegistrationFormControls,
    firebaseConfig,
    firebaseStroageURL,
} from "@/utils";

import InputComponent from "@/components/FormElements/InputComponent";

const initialDepositData = {
    name: "Krishan",
    user_id: "",
    refkey: "",
    imageUrl: "",
};

export default function MemberRegister() {
    const router = useRouter();
    const [isRegistered, setIsRegistered] = useState(false);
    const [depositFormData, setDepositFormData] = useState("");
    const [selectedImage, setSelectedImage] = useState();
    const { user } = useContext(GlobalContext);
    console.log("🚀 ~ file: page.js:38 ~ MemberRegister ~ user:", user)

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
                    // Payment was canceled, you can show a cancel message or redirect to a cancel page
                    console.log("Payment canceled.");
                }
            }
        } else {
            router.push("/login")
        }

    },[user]);

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
                    refkey: user._id
                })
            } else {
                setDepositFormData({
                    imageUrl: "",
                    name: user.name,
                    user_id: user._id
                })
            }
            setLoading(false);
        }
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

    return (
        <div className="bg-white relative register-formImage">
            <div className="flex flex-col items-center justify-between pt-0 md:pr-10 md:pl-10 pr-0 pb-0 pl-0 mt-8 mr-auto xl:px-5 lg:flex-row">
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
                                        disabled={!isDepositFormValid() || loading}
                                        onClick={handleDeposit}
                                    >
                                        Become a member"

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